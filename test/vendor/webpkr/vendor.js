const webpack = require( 'webpack' )
entry( { vendor: ['jquery', 'lodash', 'jsdom'] } )

resolve( () => {
  alias( { jquery: 'jquery/src/jquery' } )
} )

provide( {
  $: 'jquery',
  jQuery: 'jquery'
} )

plugin( new webpack.optimize.CommonsChunkPlugin( {
  name: 'vendor',
  minChunks: Infinity
} ) )

