const _ = require( 'lodash' );
const build = require( './lib/build' );
const compile = require( './lib/compile' );

function webpak() {
  return build.buildFile();
}

_.extend( webpak, build, compile );

module.exports = webpak;
