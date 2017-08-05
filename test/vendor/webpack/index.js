[
  'base',
  'vendor',
  'node',
  'js',
  'fonts',
  'stats',
  'devtool',
  'dev_server',
].map( x => `./${x}` )
  .forEach( require );
