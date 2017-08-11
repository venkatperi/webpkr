/* eslint-disable global-require,import/no-dynamic-require */

const _ = require( 'lodash' )
const validateSchema = require( 'webpack/lib/validateSchema' );
const webpkr = require( '..' );
const V = require( '../lib/util/validate' );
const assert = require( 'assert' );
const path = require( 'path' );


const configs = {

  basic: () => {
    context( projectDir )
    entry( './src/index.js' )
    output( () => {
      filename( 'bundle.js' )
      path$( 'dist' )
    } )
  },

  globals: () => {
    assert( typeof projectDir === 'string' );
    assert( typeof buildDir === 'string' );

    ['development', 'production', 'staging', 'testing'].forEach( ( e ) => {
      assert( typeof global[e] === 'function', e )
    } )

    //assert( !cliArgs(), 'cli args should not be defined by default' )
  },

  cliArgs: () => {
    assert( V.isObject( global.cliArgs() ), 'cli args should be an object' )
  }
}

describe( 'webpkr', () => {
  let config = null;

  function get () {
    const res = config ? config() : null;
    config = null;
    return res;
  }

  afterEach( get )

  describe( 'build', () => {

    _.forOwn( {
      closure: configs.basic,
      file: path.join( __dirname, 'simple/webpkr' )
    }, ( v, k ) => describe( k, () => {

      beforeEach( () => {
        config = webpkr( v );
      } )

      afterEach( () => {
        if ( k === 'file' )
          delete require.cache[require.resolve( v )]
      } )

      it( 'returns a function which accepts one argument', () => {
        assert( V.isFunction( config ) );
        assert( config.length === 1 );
      } )

      it( 'config function returns an object', () => assert( V.isObject( get() ) ) )

      it( 'webpack validates config', () => assert( validateSchema( get() ) ) )
    } ) );
  } );

  describe( 'globals', () => {
    beforeEach( () => {
      config = webpkr( configs.globals );
    } )

    it( 'has globals', () => {
    } )
  } );

  describe.skip( 'cli arguments', () => {
    beforeEach( () => {
      config = webpkr( configs.cliArgs );
    } )

    it( 'is an object', () => {
      config( { a: 1 } )
    } )
  } )

} );
