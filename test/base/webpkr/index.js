[
  'base',
  'js',
  'fonts',
  'css',
  'stats',
  'devtool',
  'dev_server'
].map( ( x ) => `./${x}` )
  .forEach( require )
