/* eslint-disable global-require,import/no-dynamic-require */
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
const V = require( '../lib/util/validate' );

describe( 'validate', () => {
  describe( 'function', () => {
    it( 'function', () => assert( V.isFunction( () => {
    } ) ) );
    it( 'not number', () => assert( !V.isFunction( 1 ) ) );
  } );

  describe( 'containedNotNil', () => {
    it( 'contains', () => assert( V.contains( [1, 2, 3], 1 ) ) );
    it( 'works', () => assert( V.containsNotNil( [1, 2, 3], 1 ) ) );
    it( 'not for nil', () => assert( V.containsNotNil( [1, 2, 3], null ) ) );
    it( 'not for missing item', () => assert( V.containsNotNil( [1, 2, 3], 4 ) ) );
  } );

  describe( 'isObject', () => {
    it( 'object', () => assert( V.isObject( {} ) ) );
    it( 'not array', () => assert( !V.isObject( [1] ) ) );
    it( 'not string', () => assert( !V.isObject( 'abc' ) ) );
  } );

  describe( 'nonEmptyString', () => {
    it( 'non empty string', () => assert( V.nonEmptyString( ' ' ) ) );
    it( 'empty string', () => assert( !V.nonEmptyString( '' ) ) );
    it( 'number', () => assert( !V.nonEmptyString( 123 ) ) );
    it( 'function', () => assert( !V.nonEmptyString( () => {
    } ) ) );
  } );

  describe( 'nonEmptyArrayOfUniqueStringValues', () => {
    it( 'x', () => assert( V.nonEmptyArrayOfUniqueStringValues( ['a', 'b'] ) ) );
    it( 'fails if non unique', () => assert( !V.nonEmptyArrayOfUniqueStringValues( ['a', 'b', 'a'] ) ) );
    it( 'fails if array is empty', () => assert( !V.nonEmptyArrayOfUniqueStringValues( [] ) ) );
    it( 'fails if it has empty string', () => assert( !V.nonEmptyArrayOfUniqueStringValues( ['a', '', 'b'] ) ) );
  } );

  describe( 'function', () => {
    it( 'works', () => assert( V.isFunction( () => {
    } ) ) );
    it( 'fails for non function', () => assert( !V.isFunction( 123 ) ) );
  } );

  describe( 'everyProp', () => {
    it( 'verifies every property value', () =>
      assert( V.everyProp( V.nonEmptyString, { a: '1', b: '2' } ) ) );
    it( 'verifies every property value', () =>
      assert( !V.everyProp( V.nonEmptyString, { a: '', b: '2' } ) ) );
    it( 'verifies every property value', () =>
      assert( !V.everyProp(
        V.any( [V.nonEmptyString, V.isFunction] ),
        { a: ' ', b: '2', c: 123 } ) ) );
  } );

  describe( 'any', () => {
    it( 'at least one test passes', () =>
      assert( V.any( [V.nonEmptyString, V.isFunction] )( ' ' ) ) );
    it( 'at least one test passes', () =>
      assert( V.any( [V.nonEmptyString,
        V.isFunction] )( () => {
      } ) ) );
    it( 'fails if none pass', () =>
      assert( !V.any( [V.nonEmptyString,
        V.isFunction] )( 123 ) ) );
  } );

  describe( 'condition', () => {
    it( 'fails for number', () => assert( !V.condition( 123 ) ) );
  } );

  describe( 'entry', () => {
    it( 'works', () => assert( V.entry( ' ' ) ) );
    it( 'fails for number', () => assert( !V.entry( 123 ) ) );
  } );
} );
