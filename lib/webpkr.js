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
const { delegatingProp, deleteGlobalProps } = require( './global_prop' );
const debug = require( 'debug' )( 'webpkr:webpkr' );
const { EventEmitter } = require( 'events' );
const WebpackBuilder = require( './webpack_builder' );
const config = require( './config' );

/**
 * Webpkr class
 */
class Webpkr extends EventEmitter {
  constructor( opts = {} ) {
    super();
    debug( 'Webpkr: %o', opts );
    this._registered = false;
    this._phase = 'initialization';
    this._projectDir = opts.projectDir || process.cwd();
    this._buildDir = config.get( 'defaults.buildDir' );
    this._environments = config.get( 'defaults.environments' );
    this._publicPath = config.get( 'defaults.publicPath' );
    this._srcDirs = JSON.parse( config.get( 'defaults.srcDirs' ) );
    this._ext = {};
    this._currentEnv = null;
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
   * The current env
   * @returns {String|null}
   */
  get currentEnv() {
    return this._currentEnv;
  }

  /**
   * Get the runtime environments
   */
  get environments() {
    return this._environments;
  }

  /**
   * Get the extension object
   */
  get ext() {
    return this._ext;
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

  _compile( closure ) {
    return this._wrap( () => new WebpackBuilder()
      .build( () => webpackConfig( closure ) ) );
  }

  _register() {
    if ( this._registered ) return false;
    debug( 'register' );

    ['ext', 'environments', 'projectDir',
      'buildDir', 'publicPath', 'srcDirs',
      'currentEnv',
    ].forEach( p =>
      delegatingProp( p, this ) );

    this._registerEnvTypes();
    this._registered = true;
    return true;
  }

  _registerEnvTypes() {
    this._environments.forEach( ( env ) => {
      global[env] = ( closure ) => {
        const prev = this._currentEnv;
        this._currentEnv = env;
        closure();
        this._currentEnv = prev;
      };
    } );

    global.someEnvironments = ( envs, closure ) => {
      envs.forEach( e => closure( e ) );
    };

    global.notEnvironments = ( envs, closure ) => {
      _.difference( this.environments, envs )
        .forEach( e => closure( e ) );
    };
  }

  _unregister() {
    if ( !this._registered ) return;
    debug( 'unregister' );
    this.environments.forEach( e => delete global[e] );
    delete global.notEnvironments;
    delete global.someEnvironments;
    delete global.ext;
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
   *
   */
  /**
   * Builds webpack configuration object for current settings.

   * @param f
   * @param opts
   * @returns {object} webpack configuration
   */
  buildFile( f, opts = {} ) {
    const file = f || config.get( 'defaults.configFile' );
    const nodeEnv = process.env.NODE_ENV;
    debug( 'buildFile %s %o, %s', file, opts, nodeEnv );

    return this._wrap( () => {
      const configTree = this.compileFile( file, opts );
      debug( configTree.toAsciiTree() );

      return configTree.walk( {
        afterChildren( n ) {
          return !n.env || n.env === nodeEnv ? n.evaluate() : null;
        },
      } );
    } );
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
}

module.exports = Webpkr;

