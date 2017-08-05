const path = require( 'path' )

amd('test')
context( projectDir )

entry( './src/index.js' )

output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )


module$( () => {
  rule( () => {
    test( /\.js$/ )
    use( 'babel-loader' )
    include( path.resolve( srcDirs.js ) )
    exclude( /node_modules/ )
  } )
} )
