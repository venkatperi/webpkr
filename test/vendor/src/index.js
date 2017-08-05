const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;

const { window } = (new JSDOM( '' )).window;
global.window = window;
global.document = window.document;
const $ = require( 'jquery' );

$( () => {
  console.log( 'jquery ready' );
} );
