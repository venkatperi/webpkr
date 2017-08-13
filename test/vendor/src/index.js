const $ = require( 'jquery' );

$.ready( () => {
  console.log( 'jquery ready' );
  $( '#test' ).text( 'explicit vendor chunk' )
} );

