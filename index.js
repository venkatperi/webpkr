const _ = require( 'lodash' );
const Webpkr = require( './lib/webpkr' );

function webpkr( opts ) {
  let w = new Webpkr( opts );
  return w.buildFile();
}

webpkr.Webpkr = Webpkr;

module.exports = webpkr;
