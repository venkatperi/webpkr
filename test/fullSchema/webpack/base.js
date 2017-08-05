context( projectDir )

entry( './src/index.js' )

output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )
