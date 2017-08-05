context( projectDir )

entry( { main: './src/index.js' } )

output( () => {
  filename( '[name]-bundle.js' )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )
