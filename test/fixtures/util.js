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

const assert = require( 'assert' );
const arrayp = require( 'arrayp' );
const fs = require( 'fs' );

const exists = file => new Promise(
  resolve => fs.exists( file,
    res => resolve( res ) ) );

const assertf = {
  yes: msg => val => assert( val, msg ),
  no: msg => val => assert( !val, msg ),
  equal: ( exp, msg ) => actual => assert.equal( actual, exp, msg ),
};

const assertExists = f => arrayp.chain( [
  exists( f ),
  assertf.yes( 'file should exist' ),
] );

const assertNotExist = f => arrayp.chain( [
  exists( f ),
  assertf.no( 'file should NOT exist' ),
] );

module.exports = {
  exists,
  assertf,
  assertExists,
  assertNotExist,
};
