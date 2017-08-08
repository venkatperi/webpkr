/* eslint-disable global-require,import/no-dynamic-require */
const webpack = require( 'webpack' );
const assert = require( 'assert' );
const path = require( 'path' );
const fs = require( 'fs' );
const rimraf = require( 'rimraf' );

describe( 'simple', () => {
  const dir = path.join( __dirname, 'simple/dist' );

  beforeEach( done => rimraf( dir, done ) );

  it( 'builds to dist/bundle.js', ( done ) => {
    const config = require( `${__dirname}/simple/webpack.config` );
    webpack( config(), ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( dir, 'bundle.js' ) ) );
      return done();
    } );
  } );
} );
