// Copyright 2017, Venkat Peri.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

const _ = require( 'lodash' );
const path = require( 'path' );
const debug = require( 'debug' )( 'webpkr:webpkr' );
const { EventEmitter } = require( 'events' );
const hook = require( 'istanbul-lib-hook' );
const R = require( 'ramda' );

const { delegatingProp, deleteGlobalProps } = require( './global_prop' );
const WebpackBuilder = require( './webpack_builder' );
const config = require( './config' );
const plugins = require( './plugins' );

const shouldNotEvaluate = R.curry( ( arr, n ) =>
  R.any( ( p ) => !p.shouldEvaluate( n ), arr ) )

/**
 * Webpkr class
 */
class Webpkr extends EventEmitter {
  constructor( opts = {} ) {
    super();
    debug( 'Webpkr: %o', opts );
    this._projectDir = opts.projectDir || process.cwd();
    this._configFile = opts.config || config.get( 'defaults.configFile' );
    this._buildDir = opts.buildDir || config.get( 'defaults.buildDir' );
    this._environments = opts.environments;
    this._publicPath = opts.publicPath || config.get( 'defaults.publicPath' );
    this._srcDirs = opts.srcDirs || JSON.parse( config.get( 'defaults.srcDirs' ) );
    (opts.plugins || []).forEach( ( p ) => this.addPlugin( p ) );

    this._registered = false;
    this._phase = 'initialization';
    this._currentFilename = null;
    this._cliArgs = null;
    this._plugins = [];
    this._addDefaultPlugins();
  }

  /**
   * Get the absolute path to the build dir. Resolves from
   * `projectDir` by default.
   */
  get buildDir() {
    return path.resolve( this.projectDir, this._buildDir );
  }

  set buildDir( v ) {
    this._updateProperty( 'buildDir', v );
  }

  /**
   * Get the cli args set by webpack cli
   */
  get cliArgs() {
    return this._cliArgs;
  }

  get currentFilename() {
    return this._currentFilename;
  }

  set currentFilename( value ) {
    this._currentFilename = value;
  }

  /**
   * Get the runtime environments
   */
  get environments() {
    return this._environments;
  }

  /**
   * Gets the current phase of the build.
   *
   * @returns {string}
   */
  get phase() {
    return this._phase;
  }

  /**
   * Sets the current phase of the build
   * @param value {string}
   */
  set phase( value ) {
    this._phase = value;
  }

  get plugins() {
    return this._plugins;
  }

  /**
   * Get the absolute path to the project's base directory.
   *
   * @returns {String}
   */
  get projectDir() {
    return this._projectDir;
  }

  /**
   * Sets the project's base dir.
   *
   * @param v {String} the base dir
   */
  set projectDir( v ) {
    this._updateProperty( 'projectDir', v );
  }

  /**
   * The public path
   * @returns {String}
   */
  get publicPath() {
    return this._publicPath;
  }

  /**
   * Get the source dirs
   */
  get srcDirs() {
    return this._srcDirs;
  }

  static _hookRequire() {
    hook.hookRequire( Webpkr._requireMatcher, Webpkr._requireTransform );
  }

  static _requireMatcher( file ) {
    if ( !global.projectDir )
      return false;
    return file.startsWith( path.join( global.projectDir, 'webpkr' ) );
  }

  static _requireTransform( code, filename ) {
    debug( '_requireTransform: %s', filename );
    let c = [];
    c.push( 'var __prevfilename__ = currentFilename;' );
    c.push( 'global.currentFilename = __filename;' );
    c.push( code );
    c.push( 'global.currentFilename = __prevfilename__' );
    return c.join( '\n' );
  }

  static _unhookRequire() {
    hook.unloadRequireCache( Webpkr._requireMatcher );
  }

  _addDefaultPlugins() {
    const opts = {
      config: config
    }
    this.addPlugin( new plugins.EnvPlugin( _.extend( {}, opts, { environments: this._environments } ) ) );
    this.addPlugin( new plugins.ExtPlugin( opts ) );
    this.addPlugin( new plugins.ProvidePlugin( opts ) );
    this.addPlugin( new plugins.PriorityPlugin( opts ) );
    this.addPlugin( new plugins.PrintTreePlugin( opts ) );
    this.addPlugin( new plugins.PrintConfigPlugin( opts ) );
  }

  _afterEvaluate( value ) {
    let res = value;
    this.plugins.forEach( ( p ) => res = p.afterEvaluate( res ) )
    this.emit( 'afterEvaluate', res );
    return res;
  }

  _afterNodeEvaluate( node, value ) {
    this.emit( 'afterNodeEvaluate', node, value );
    let res = value;
    this.plugins.forEach( ( p ) => res = p.afterNodeEvaluate( node, res ) )
    node.value = res;
    return res;
  }

  _beforeNodeEvaluate( node ) {
    this.emit( 'beforeNodeEvaluate', node );
    this.plugins.forEach( ( p ) => p.beforeNodeEvaluate( node ) )
  }

  _compile( closure ) {
    const builder = new WebpackBuilder();
    builder.on( 'postInstantiate', ( ...args ) => this.emit( 'nodeInstantiate', ...args ) );
    builder.on( 'nodeCompleted', ( ...args ) => this.emit( 'nodeCompleted', ...args ) );

    let res = this._wrap( () =>
      builder.build( () =>
        webpackConfig( closure ) ) );
    this.emit( 'afterCompile', res );
    const errors = res.errors;
    if ( errors.length ) {
      let msg = ['The following errors were detected during compile:'];
      msg = msg.concat( errors.map( ( x ) => x.message ) )
      throw new Error( msg.join( '\n' ) );
    }
    return res;
  }

  _register() {
    if ( this._registered ) return false;
    debug( 'register' );
    Webpkr._hookRequire();

    ['ext', 'projectDir',
      'buildDir', 'publicPath', 'srcDirs',
      'currentFilename', 'cliArgs'
    ].forEach( p =>
      delegatingProp( p, this ) );

    this.plugins.forEach( ( p ) => p.registerObjects() )
    this._registered = true;
    return true;
  }

  _unregister() {
    if ( !this._registered ) return;
    debug( 'unregister' );
    Webpkr._unhookRequire();
    this.plugins.forEach( ( p ) => p.unregisterObjects() )
    deleteGlobalProps();
    this._registered = false;
  }

  _updateProperty( name, value ) {
    if ( this[name] !== value ) {
      const old = this[name];
      this[name] = value;
      this.emit( 'propertyChanged', name, value, old );
    }
  }

  _wrap( fn, ...args ) {
    let needToUnregister = false;

    try {
      needToUnregister = this._register( ...args );
      return fn();
    } catch ( err ) {
      debug( err );
      throw err;
    } finally {
      if ( needToUnregister ) {
        this._unregister();
      }
    }
  }

  /**
   * Add the supplied plugin the builder's list of plugins
   *
   * @param plugin {PluginBase} the plugin to add
   */
  addPlugin( plugin ) {
    this._plugins.push( plugin );
    plugin.onPluginAdded( this );
  }

  /**
   * Builds webpack configuration object for current settings.

   * @param f
   * @param opts
   * @returns {object} webpack configuration
   */
  buildFile( f, opts = {} ) {
    const file = f || this._configFile;
    const nodeEnv = process.env.NODE_ENV;
    debug( 'buildFile %s %o, %s', file, opts, nodeEnv );

    let needToUnregister = this._register();
    const configTree = this.compileFile( file, opts );

    const that = this;
    const noEval = shouldNotEvaluate( this.plugins );
    return ( cliArgs ) => {
      this._cliArgs = cliArgs;
      let config = configTree.walk( {
        beforeChildren( node ) {
          that._beforeNodeEvaluate( node );
        },
        afterChildren( node ) {
          if ( noEval( node ) )
            return null;
          let res = node.evaluate();
          return that._afterNodeEvaluate( node, res );
        },
      } );
      config = this._afterEvaluate( config );
      if ( needToUnregister )
        this._unregister();
      return config;
    }
  }

  /**
   * Compile DSL with all settings for evaluation.
   *
   * @param closure
   * @returns {object} compiled / parse tree
   */
  compile( closure ) {
    debug( 'compile' );
    return this._compile( closure );
  }

  /**
   * Compile file
   *
   * @param f
   * @param opts
   * @returns {*}
   */
  compileFile( f, opts ) {
    if ( !f || typeof f !== 'string' ) {
      throw new TypeError( 'file must be a string' );
    }

    const file = path.resolve( this._projectDir, f );
    let dir = path.dirname( file );
    dir = path.basename( dir ) === 'webpack' ?
      path.dirname( dir ) : dir;

    debug( `compileFile ${file}, dir: ${dir}` );
    return this._compile( () => {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      require( file );
    }, {
      projectDir: dir,
    } );
  }

  removePlugin( plugin ) {
    const idx = this._plugins.indexOf( plugin );
    if ( idx < 0 ) return;
    this._plugins.splice( idx, 1 );
  }
}

module.exports = Webpkr;

