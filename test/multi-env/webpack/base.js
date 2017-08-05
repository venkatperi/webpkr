context( projectDir )

entry( './src/index.js' )

output( () => {
  filename( '[name]-bundle.js' )
  production( () => filename( '[name]-prod-bundle.js' ) )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )
