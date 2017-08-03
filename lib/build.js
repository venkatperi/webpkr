'use "strict'

const debug = require( 'debug' )( 'webpkr:build' )
const { compileFile } = require( './compile' )
const globals = require( './globals' )

function buildFile( file = './webpack', opts = {} ) {
  let nodeEnv = process.env.NODE_ENV;
  debug( "buildFile %s %o, %s", file, opts, nodeEnv )

  let needToUnregister = false
  try {
    needToUnregister = globals.register();

    let configTree = compileFile( file, opts )
    debug( configTree.toAsciiTree() )

    return configTree.walk( {
      afterChildren( n ) {
        if ( !n.env || n.env === nodeEnv )
          return n.evaluate();
      }
    } );
  } finally {
    if ( needToUnregister )
      globals.unregister();
  }
}

module.exports = {
  buildFile
}
