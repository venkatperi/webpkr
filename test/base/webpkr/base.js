context( projectDir )

entry( './src/index.js' )
entry( './css/style-b.css' )
// entry(1)

output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )

doFirst( () => {
  entry( './css/style-a.css' )
} )
