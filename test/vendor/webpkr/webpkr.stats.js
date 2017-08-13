const Stats = require( 'stats-webpack-plugin' );

development( () =>
  plugin( new Stats( 'stats.json', {
    chunkModules: true,
  } ) ),
)
