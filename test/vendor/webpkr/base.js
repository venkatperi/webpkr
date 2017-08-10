context( projectDir )

entry( { main: './src/index.js' } )

output( () => {
  filename( '[name]-bundle.js' )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )

define( {
  PRODUCTION: JSON.stringify( true ),
  VERSION: JSON.stringify( "5fa3b9" ),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify( "object" )
} )
