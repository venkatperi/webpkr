const Stats = require( 'stats-webpack-plugin' );

context( projectDir )

entry( './src/index.js' )

output( () => {
  filename( '[name]-bundle.js' )
  path$( 'dist' )
} )

development( () => {
  devtool( 'cheap-module-source-map' )
  plugin( new Stats( 'stats.json', {
    chunkModules: true
  } ) )
} )

production( () => {
  plugin( new webpack.optimize.UglifyJsPlugin( {
    mangle: true,
    compress: {
      screw_ie8: true,
      warnings: false,
    },
  } ) )

  plugin( new webpack.optimize.AggressiveMergingPlugin() )

  plugin( new webpack.optimize.MinChunkSizePlugin( {
    minChunkSize: 2048,
  } ) ),
} )

