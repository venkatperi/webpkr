/* eslint-disable import/no-dynamic-require,global-require */
// eslint-disable-next-line global-require

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

const pify = require( 'pify' );
const _ = require( 'lodash' );
const webpack = pify( require( 'webpack' ) );
const path = require( 'path' );
const arrayp = require( 'arrayp' );
const clear = require( './clear' );
const { assertExists, assertNotExist } = require( './util' );

const webpackp = config => webpack(
  typeof config === 'function' ? config() : config );


function test( name, artifacts ) {
  describe( name, function () {
    const projectDir = path.join( __dirname, `../${name}` );
    const buildDir = path.join( projectDir, 'dist' );
    const targetFiles = artifacts.map( x => path.join( buildDir, x ) );
    const allNotExist = targetFiles.map( x => () => assertNotExist( x ) );
    const allExist = targetFiles.map( x => () => assertExists( x ) );

    beforeEach( () => clear( { cwd: projectDir } ) );

    it( 'builds', () => {
      const config = require( `${projectDir}/webpack.config` );
      arrayp.chain( _.flatten( [
        allNotExist,
        () => webpackp( config ),
        allExist,
      ] ) );
    } );
  } );
}

module.exports = test;
