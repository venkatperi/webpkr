/* eslint-disable global-require,import/no-dynamic-require */
const webpack = require( 'webpack' );
const assert = require( 'assert' );
const path = require( 'path' );
const fs = require( 'fs' );
const rimraf = require( 'rimraf' );

const name = 'vendor';
describe( name, () => {
  const dir = path.join( __dirname, `${name}/dist` );

  beforeEach( done => rimraf( dir, done ) );

  it( 'builds to dist/bundle.js', ( done ) => {
    assert( !fs.existsSync( path.join( dir, 'main-bundle.js' ) ) );

    const config = require( `${__dirname}/${name}/webpack.config` );
    webpack( config(), ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( dir, 'main-bundle.js' ) ) );
      assert( fs.existsSync( path.join( dir, 'vendor-bundle.js' ) ) );
      return done();
    } );
  } );
} );
