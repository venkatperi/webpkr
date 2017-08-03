const _ = require( 'lodash' );
const Webpkr = require( './lib/webpkr' );

function webpkr() {
  let w = new Webpkr();
  return w.buildFile();
}

webpkr.Webpkr = Webpkr;

module.exports = webpkr;
