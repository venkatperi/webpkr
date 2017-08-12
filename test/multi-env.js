/* eslint-disable global-require,import/no-dynamic-require */
const webpack = require( 'webpack' );
const _ = require( 'lodash' );
const assert = require( 'assert' );
const childProcess = require( 'child_process' );
const path = require( 'path' );
const fs = require( 'fs' );
const rimraf = require( 'rimraf' );
const clear = require( './fixtures/clear' );


const name = 'multi-env';
describe( name, () => {
  const projectDir = path.join( __dirname, `${name}` );
  const buildDir = path.join( projectDir, `dist` );
  beforeEach( () => clear( { cwd: projectDir } ) )

  it( 'no env', ( done ) => {

    const config = require( `${__dirname}/${name}/webpack.config` );
    webpack( config(), ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( buildDir, 'main-bundle.js' ) ) );
      assert( !fs.existsSync( path.join( buildDir, 'main-prod-bundle.js' ) ) );
      return done();
    } );
  } );

  it( 'production', ( done ) => {
    childProcess.exec( path.join( projectDir, 'node_modules/.bin/webpack' ), {
      cwd: projectDir,
      env: _.extend( {}, process.env, { NODE_ENV: 'production' } )
    }, ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( buildDir, 'main-prod-bundle.js' ) ) );
      assert( !fs.existsSync( path.join( buildDir, 'main-bundle.js' ) ) );
      return done();
    } );
  } );
} );

