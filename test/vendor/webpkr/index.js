[
  'base',
  'html',
  'vendor',
  'node',
  'js',
  'fonts',
  'stats',
  'devtool',
  'dev_server',
].map( x => `./webpkr.${x}` )
  .forEach( require );
