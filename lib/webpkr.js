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
const R = require( 'ramda' );

const hook = require( './util/hookRequire' );
const { delegatingProp, deleteGlobalProps } = require( './global_prop' );
const WebpackBuilder = require( './webpack_builder' );
const config = require( './config' );
const plugins = require( './plugins' );

function nop() {
}

const shouldNotEvaluate = R.curry( ( arr, n ) =>
  R.any( ( p ) => !p.shouldEvaluate( n ), arr ) )

/**
 * Webpkr
 *
 * @param {Object} [opts] - options
 * @param {string} [opts.config] - config module
 * @param {string} [opts.projectDir] - dir containing project root
 * @param {string} [opts.buildFile=projectDir/build] - dir where output is written
 * @param {string[]} [opts.publicPath=/] - `webpack` public path
 * @param {Object} [opts.srcDirs] - source directories
 * @param {PluginBase[]} [opts.plugins] - custom plugins
 *
 */
class Webpkr extends EventEmitter {

  constructor( opts = {} ) {
    super();
    debug( 'Webpkr: %o', opts );
    this._registered = false;
    this._phase = 'initialization';
    this._currentFilename = null;
    this._cliArgs = null;
    this._plugins = [];
    this._noHookRequire = false;

    this._projectDir = opts.projectDir || process.cwd();
    this._configFile = opts.config || config.get( 'defaults.configFile' );
    this._buildDir = opts.buildDir || config.get( 'defaults.buildDir' );
    this._environments = opts.environments;
    this._publicPath = opts.publicPath || config.get( 'defaults.publicPath' );
    this._srcDirs = opts.srcDirs || JSON.parse( config.get( 'defaults.srcDirs' ) );

    this._addDefaultPlugins();
    (opts.plugins || []).forEach( ( p ) => this.addPlugin( p ) );
  }

  /**
   * Get the absolute path to the build dir. Resolves from
   * `projectDir` by default.
   *
   * @returns {string} buildDir - dir containing output
   */
  get buildDir() {
    return path.resolve( this.projectDir, this._buildDir );
  }

  /**
   * Sets the dir where the output will be written.
   *
   * @param {string} dir - the build directory
   */
  set buildDir( dir ) {
    this._updateProperty( 'buildDir', dir );
  }

  /**
   * Get the cli args set by webpack cli
   *
   * @returns {string[]} [cliArgs] - the command line args passed by `webpack`
   */
  get cliArgs() {
    return this._cliArgs;
  }

  /**
   * Gets the name of the webpkr module being processed.
   *
   * @returns {null|string}
   */
  get currentFilename() {
    return this._currentFilename;
  }

  /**
   * Sets the name of the webpkr module being processed.
   *
   * @param {null|string} value - the file name
   */
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

  /**
   * Gets the list of registered plugins.
   *
   * @returns {PluginBase[]} plugins
   */
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

  /**
   * load required plugins
   *
   * @private
   */
  _addDefaultPlugins() {
    const opts = {
      config: config
    }
    this.addPlugin( new plugins.EnvPlugin( _.extend( {}, opts, { environments: this._environments } ) ) );
    this.addPlugin( new plugins.ExtPlugin( opts ) );
    this.addPlugin( new plugins.ProvidePlugin( opts ) );
    this.addPlugin( new plugins.DefinePlugin( opts ) );
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

  /**
   * Builds webpack configuration object for current settings.

   * @param {String|Function} src - webpkr config
   * @param {Object} [opts] - options
   * @returns {Function} webpack configuration
   */
  _build( src, opts ) {
    const unreg = this._register();

    try {

      let configTree = null;
      if ( typeof src === 'object' ) {
        opts = src;
        src = null;
      }

      if ( !opts ) {
        opts = {}
      }

      src = src || this._configFile;
      debug( '_build: %s, %o', typeof src === 'function' ? 'function' : src, opts )

      switch ( typeof src ) {
        case 'string'  :
          configTree = this.compileFile( src || this._configFile );
          break;

        case 'function':
          configTree = this.compile( src );
          break;

        default:
          throw new TypeError( 'build: bad source' );
      }

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

        unreg();

        return config;
      }
    }
    catch ( err ) {
      unreg();
      throw err;
    }
  }

  _compile( closure ) {
    const builder = new WebpackBuilder();
    builder.on( 'postInstantiate', ( ...args ) => this.emit( 'nodeInstantiate', ...args ) );
    builder.on( 'nodeCompleted', ( ...args ) => this.emit( 'nodeCompleted', ...args ) );

    // noinspection JSUnresolvedFunction
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
    if ( this._registered ) return nop;

    debug( 'register' );
    if ( !this._noHookRequire )
      hook.hookRequire();

    ['ext', 'projectDir',
      'buildDir', 'publicPath', 'srcDirs',
      'currentFilename',
    ].forEach( p =>
      delegatingProp( p, this ) );

    global.cliArgs = () => this._cliArgs;

    this.plugins.forEach( ( p ) => p.registerObjects() )
    this._registered = true;
    return R.once( () => this._unregister() );
  }

  _unregister() {
    if ( !this._registered ) return;
    debug( 'unregister' );
    if ( !this._noHookRequire )
      hook.unhookRequire();
    this.plugins.forEach( ( p ) => p.unregisterObjects() )
    delete global.cliArgs;
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
    const unreg = this._register( ...args );
    try {
      return fn();
    } finally {
      unreg();
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

   * @param {String|Function} src - webpkr config
   * @param {Object} [opts] - options
   * @returns {Function} webpack configuration
   */
  build( src, opts ) {
    return this._build( src, opts );
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
   * @returns {*}
   */
  compileFile( f ) {
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

