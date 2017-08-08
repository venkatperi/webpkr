/* eslint-disable global-require,import/no-dynamic-require */
const webpack = require( 'webpack' );
const _ = require( 'lodash' );
const assert = require( 'assert' );
const childProcess = require( 'child_process' );
const path = require( 'path' );
const fs = require( 'fs' );
const rimraf = require( 'rimraf' );


const name = 'multi-env';
describe( name, () => {
  const dir = path.join( __dirname, `${name}/dist` );

  beforeEach( done => rimraf( dir, done ) );

  it( 'no env', ( done ) => {

    const config = require( `${__dirname}/${name}/webpack.config` );
    webpack( config(), ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( dir, 'main-bundle.js' ) ) );
      assert( !fs.existsSync( path.join( dir, 'main-prod-bundle.js' ) ) );
      return done();
    } );
  } );

  it( 'production', ( done ) => {
    const dir2 = path.join( __dirname, `${name}` );
    childProcess.exec( path.join( dir2, 'node_modules/.bin/webpack' ), {
      cwd: dir2,
      env: _.extend( {}, process.env, { NODE_ENV: 'production' } )
    }, ( err ) => {
      if ( err ) {
        return done( err );
      }
      assert( fs.existsSync( path.join( dir, 'main-prod-bundle.js' ) ) );
      assert( !fs.existsSync( path.join( dir, 'main-bundle.js' ) ) );
      return done();
    } );
  } );
} );

