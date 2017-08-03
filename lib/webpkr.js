'use "strict'

const _ = require( 'lodash' );
const path = require( 'path' );
const { delegatingProp, deleteGlobalProps } = require( './global_prop' );
const debug = require( 'debug' )( 'webpkr:webpkr' );
const { EventEmitter } = require( 'events' );
const WebpackBuilder = require( './webpack_builder' );
const config = require( './config' );

class Webpkr extends EventEmitter {

  constructor() {
    super();
    this._registered = false;
    this._phase = 'initialization';
    this._projectDir = process.cwd();
    this._buildDir = config.get( 'defaults.buildDir' );
    this._environments = config.get( 'defaults.environments' );
    this._publicPath = config.get( 'defaults.publicPath' );
    this._srcDirs = JSON.parse( config.get( 'defaults.srcDirs' ) );
    this._ext = {};
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
   * Get the source dirs 
   */
  get srcDirs() {
    return this._srcDirs;
  }

  /**
   * Get the current env 
   */
  get currentEnv() {
    return this._currentEnv;
  }

  /**
   * Get the absolute path to the project's base directory. 
   */
  get projectDir() {
    return this._projectDir;
  }

  set projectDir( v ) {
    this._updateProperty( 'projectDir', v );
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
   * Builds webpack configuration object for current settings.
   * 
   * @returns {object} webpack configuration 
   */
  buildFile( file, opts = {} ) {
    file = file || config.get( 'defaults.configFile' );
    let nodeEnv = process.env.NODE_ENV;
    debug( "buildFile %s %o, %s", file, opts, nodeEnv )

    return this._wrap( () => {
      let configTree = this.compileFile( file, opts )
      debug( configTree.toAsciiTree() )

      return configTree.walk( {
        afterChildren( n ) {
          if ( !n.env || n.env === nodeEnv )
            return n.evaluate();
        }
      } );
    } );
  }

  /**
   * Compile DSL with all settings for evaluation. 
   * 
   * @returns {object} compiled / parse tree 
   */
  compile( closure ) {
    debug( 'compile' )
    return this._compile( closure );
  }

  compileFile( file, opts = {} ) {
    if ( !file || typeof file !== 'string' )
      throw new TypeError( "file must be a string" );

    file = path.resolve( process.cwd(), file );
    let dir = path.dirname( file )
    dir = path.basename( dir ) === 'webpack' ?
      path.dirname( dir ) : dir

    debug( `compileFile ${file}, dir: ${dir}` )
    return this._compile( () => {
      require( file );
    }, {
      projectDir: dir
    } )
  }

  _wrap( fn, ...args ) {
    let needToUnregister = false
    try {
      needToUnregister = this._register( ...args );
      return fn()
    } finally {
      if ( needToUnregister )
        this._unregister();
    }
  }

  _compile( closure, opts = {} ) {
    return this._wrap( () => new WebpackBuilder()
      .build( () => webpackConfig( closure ) ) )
  }

  _registerEnvTypes() {
    environments.forEach( ( env ) =>
      global[ env ] = ( closure ) => {
        let prev = currentEnv;
        currentEnv = env;
        closure()
        currentEnv = prev;
      } )

    global.someEnvironments = ( envs, closure ) => {
      envs.forEach( ( e ) => closure( e ) )
    }

    global.notEnvironments = ( envs, closure ) => {
      _.difference( environments, envs )
        .forEach( ( e ) => closure( e ) )
    }
  }

  _register( opts = {} ) {
    if ( this._registered ) return false;
    debug( 'register' );

    [ 'ext', 'environments', 'projectDir',
      'buildDir', 'publicPath', 'srcDirs',
      'currentEnv',
    ].forEach( ( p ) =>
      delegatingProp( p, this ) )

    this._registerEnvTypes();
    this._registered = true;
    return true;
  }

  _unregister() {
    if ( !this._registered ) return;
    debug( 'unregister' );
    environments.forEach( ( e ) => delete global[ e ] )
    delete global.notEnvironments;
    delete global.someEnvironments;
    delete global.ext;
    deleteGlobalProps();
    this._registered = false;
  }

  _updateProperty( name, value ) {
    if ( this[ name ] !== value ) {
      old = this[ name ];
      this[ name ] = value;
      this.emit( 'propertyChanged', name, value, old );
    }
  }
}

module.exports = Webpkr;
