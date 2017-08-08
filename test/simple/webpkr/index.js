context( projectDir )
entry( './src/index.js') 
output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )
