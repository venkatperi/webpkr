/* eslint-disable global-require,import/no-dynamic-require */

const assert = require( 'assert' );
const validate = require( '../lib/validate' )

describe( 'validate', () => {

  describe( 'nonEmptyString', () => {
    it( 'non empty string', () => assert( validate.nonEmptyString( ' ' ) ) )
    it( 'empty string', () => assert( !validate.nonEmptyString( '' ) ) )
    it( 'number', () => assert( !validate.nonEmptyString( 123 ) ) )
    it( 'function', () => assert( !validate.nonEmptyString( () => {
    } ) ) )
  } );

  describe( 'nonEmptyArrayOfUniqueStringValues', () => {
    it( 'x', () => assert( validate.nonEmptyArrayOfUniqueStringValues( ['a', 'b'] ) ) )
    it( 'fails if non unique', () => assert( !validate.nonEmptyArrayOfUniqueStringValues( ['a', 'b', 'a'] ) ) )
    it( 'fails if array is empty', () => assert( !validate.nonEmptyArrayOfUniqueStringValues( [] ) ) )
    it( 'fails if it has empty string', () => assert( !validate.nonEmptyArrayOfUniqueStringValues( ['a', '', 'b'] ) ) )
  } );

  describe( 'function', () => {
    it( 'works', () => assert( validate.functionInstance( () => {
    } ) ) )
    it( 'fails for non function', () => assert( !validate.functionInstance( 123 ) ) )
  } );

  describe( 'everyProperty', () => {
    it( 'verifies every property value', () =>
      assert( validate.everyProperty( validate.nonEmptyString, { a: '1', b: '2' } ) ) )
    it( 'verifies every property value', () =>
      assert( !validate.everyProperty( validate.nonEmptyString, { a: '', b: '2' } ) ) )
    it( 'verifies every property value', () =>
      assert( !validate.everyProperty(
        validate.oneOf([validate.nonEmptyString,validate.functionInstance]),
        { a: ' ', b: '2', c: 123 } ) ) )
  } );

  describe( 'oneOf', () => {
    it( 'at least one test passes', () =>
      assert( validate.oneOf( [validate.nonEmptyString, validate.functionInstance], ' ' ) ) )
    it( 'at least one test passes', () =>
      assert( validate.oneOf( [validate.nonEmptyString, validate.functionInstance], () => {} ) ) )
    it( 'fails if none pass', () =>
      assert( !validate.oneOf( [validate.nonEmptyString, validate.functionInstance], 123 ) ) )
  } );

  describe( 'condition', () => {
    it( 'fails for number', () => assert( !validate.condition( 123 ) ) )
  } );

  describe( 'entry', () => {
    it( 'works', () => assert( validate.entry( ' ' ) ) )
    it( 'fails for number', () => assert( !validate.entry( 123 ) ) )
  } );

} );
