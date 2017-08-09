const path = require( 'path' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const Stats = require( 'stats-webpack-plugin' );

amd( 'test' )
bail( false )
cache( true )
context( projectDir )
dependency( 'dep-a' )
dependency( 'dep-b' )
devServer( {
  inline: true,
  contentBase: 'src',
  port: 3001
} )
devtool( 'cheap-module-source-map' )
entry( './src/index.js' )
entry( './src/index-b.js' )
//entry( { main: './src/index' } )
external( { react: 'react' } )

external( {
  lodash: {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // indicates global variable
  }
} )

external( {
  subtract: {
    root: ["math", "subtract"]
  }
} )

loader( {
  some_value: 1  //expose custom value to loader
} )

module$( () => {

  rule( () => {
    test( /\.css$/ )
    use( ExtractTextPlugin.extract( {
      fallback: 'style-loader',
      use: 'css-loader',
    } ) )
    include( srcDirs.css )
  } )

  rule( () => {
    test( /\.js$/ )
    use( 'babel-loader' )
    include( path.resolve( srcDirs.js ) )
    exclude( /node_modules/ )
  } )

} )

module$( () => {
  rule( () => {
    test( /\.(ttf|eot|woff|woff2)$/ )
    use( 'url-loader' )
  } )
} )

name( 'some name' )

node( {
  module: 'empty',
  net: 'empty',
  child_process: 'empty',
  tls: 'empty',
  fs: 'empty'
} )

output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )

performance( () => {
  maxEntrypointSize( 400000 )
  maxAssetSize( 100000 )
  hints( 'warning' )
  assetFilter( f => f.endsWith( '.js' ), () => {
  } )
} )

plugin(
  new ExtractTextPlugin( {
    filename: "style.css",
    allChunks: true
  } )
)

profile( true )

recordsInputPath( path.join( __dirname, 'records.json' ) )
recordsOutputPath( path.join( __dirname, 'newRecords.json' ) )
recordsPath( path.join( __dirname, 'records.json' ) )

resolve( () => {
  alias( {
    Utilities: path.resolve( __dirname, 'src/utilities/' ),
    Templates: path.resolve( __dirname, 'src/templates/' )
  } )
  extensions( ['*', '.js', '.jsx'] )
} )


development( () =>
  plugin( new Stats( 'stats.json', {
    chunkModules: true
  } ) )
)

