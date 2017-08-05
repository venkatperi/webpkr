# webpkr
The missing JavaScript DSL for `webpack` configurations.

## Getting Started
 Install with npm
```bash
$ npm install -D webpkr webpack

```
Create `src/index.js` and add this:
```javascript
console.log('Hello, world');
```

Create a `webpack` subdirectory in your project's root and add file `index.js` in it:
```bash
$ mkdir webpack
$ touch webpack/index.js
```

Add the following DSL script to `webpack/index.js`:

```javascript
context( projectDir )
entry( './src/index.js')
output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )
```

Create a `webpack.config.js` in your project's root and add these lines to it:

```javascript
const webpkr = require('webpkr');
module.exports = webpkr({projectDir: __dirname});
```

Run webpack:

```bash
$ ./node_modules/.bin/webpack
```

The DSL script generates the following webpack configuration:

```JavaScript
{
  context: '/proj/repos/webpkr/test/simple',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: '/proj/repos/webpkr/test/simple/dist'
  }
}
```

The bundled output is available in `dist/bundle.js`.

### Example: Explicit vendor bundle

```javascript
const path = require( 'path' )
const webpack = require('webpack')

// the project root
context( projectDir )

// We have two entry points
entry( {
  main: './src/index.js',,
  vendor: ['jquery', 'lodash', 'jsdom']
} )

// spit out main-bundle.js and vendor-bundle.js
output( () => {
  filename( '[name]-bundle.js' )
  path$( 'dist' )
} )

// tell webpack how to find jquery
resolve( () => {
  alias( { jquery: 'jquery/src/jquery' } )
} )

plugin( webpack.ProvidePlugin, {
  $: 'jquery',
  jQuery: 'jquery'
} )

// pull out vendor items into a separate bundle
plugin( webpack.optimize.CommonsChunkPlugin, {
  name: 'vendor',
  minChunks: Infinity
} )

```

### Example: Multiple environments
```javascript
const Stats = require( 'stats-webpack-plugin' );

context( projectDir )

entry( './src/index.js' )

output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )

// Included only when NODE_ENV=development
development( () => {
  devtool( 'cheap-module-source-map' )
  plugin( new Stats( 'stats.json', {
    chunkModules: true
  } ) )
} )

// Included only when NODE_ENV=production
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
  } ) )
} )

```
