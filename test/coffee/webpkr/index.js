require('coffee-script').register();

[
  'base',
  'js',
  'css',
  'fonts',
  'stats',
  'devtool',
  'dev_server'
].map( ( x ) => `./${x}` )
  .forEach( require )
