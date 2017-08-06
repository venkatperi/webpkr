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

const { type, scalar } = require( './util' );
const _ = require( 'lodash' )

const allOf = _.curry( ( tests, x ) => _.every( tests, ( t ) => t( x ) ) )

const oneOf = _.curry( ( tests, x ) => _.some( tests, ( t ) => t( x ) ) )

const isArray = Array.isArray

const isObject = ( x ) => type( x ) === 'object'

const everyProperty = _.curry( ( test, x ) => type(x) === 'object' && _.every( x, test ) )

const regExpInstance = ( x ) => type( x ) === 'regexp'

const nonEmptyString = ( x ) => typeof x === 'string' && x.length >= 1

const functionInstance = ( x ) => type( x ) === 'function'

const nonEmptyArray = ( arr ) => Array.isArray( arr ) && arr.length > 0

const arrayOfNonEmptyStrings = ( arr ) => Array.isArray( arr ) && _.every( arr, nonEmptyString )

const arrayOfUniqueItems = ( arr ) => Array.isArray( arr ) && _.uniq( arr ).length === arr.length

const nonEmptyArrayOfUniqueStringValues = allOf( [nonEmptyArray, arrayOfNonEmptyStrings, arrayOfUniqueItems] )

const conditions = ( val ) => Array.isArray( val ) && _.every( val, condition );

const conditionObject = ( x ) => {

  const checks = {
    'and': conditions,
    'or': conditions,
    'not': conditions,
    'test': condition,
    'include': condition,
    'exclude': condition
  }

  let testProp = ( x ) => _.every( x, ( v, k ) => checks[k] && checks[k]( v ) )

  return allOf( [isObject, testProp], x )
}

function condition( x ) {
  return oneOf( [
    regExpInstance,
    nonEmptyString,
    functionInstance,
    conditionObject], x )
}

const entry = oneOf( [
  nonEmptyString,
  nonEmptyArrayOfUniqueStringValues,
  functionInstance,
  //everyProperty( oneOf( [nonEmptyString, nonEmptyArrayOfUniqueStringValues] ) )
] )

module.exports = {
  nonEmptyString,
  nonEmptyArrayOfUniqueStringValues,
  condition,
  conditions,
  entry,
  oneOf,
  allOf,
  everyProperty,
  functionInstance
}

