/* global fixture, assert, $ */

describe( 'explicit vendor bundle', () => {
  describe( 'imports jquery', () => {
    assert( typeof $ !== 'undefined' );
  } );

  describe( 'div', () => {
    before( () => {
      fixture.setBase( 'dist' )
    } );

    beforeEach( () => {
      this.result = fixture.load( 'index.html' );
    } );

    afterEach( () => {
      fixture.cleanup()
    } );

    it( 'plays with the html fixture', () => {
      $( fixture.el ).find( '#test' ).text().should.equal( 'abc' );
    } );
  } );
} );
