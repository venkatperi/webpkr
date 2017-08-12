/* eslint-disable global-require,import/no-dynamic-require */
const webpack = require( 'webpack' );
const assert = require( 'assert' );
const path = require( 'path' );
const fs = require( 'fs' );
const rimraf = require( 'rimraf' );
const clear = require( './fixtures/clear' );

const name = 'vendor';
describe( name, () => {
  const projectDir = path.join( __dirname, `${name}` );
  const buildDir = path.join( projectDir, `dist` );
  beforeEach( () => clear( { cwd: projectDir } ) )

  it( 'builds to dist/bundle.js', ( done ) => {
    assert( !fs.existsSync( path.join( buildDir, 'main-bundle.js' ) ) );

    const config = require( `${__dirname}/${name}/webpack.config` );
    webpack( config(), ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( buildDir, 'main-bundle.js' ) ) );
      assert( fs.existsSync( path.join( buildDir, 'vendor-bundle.js' ) ) );
      return done();
    } );
  } );
} );
