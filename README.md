# webpkr
The missing JavaScript DSL for configuring `webpack`.

Instead of writing this:

```javascript
{
  context: '/proj/repos/webpkr/test/simple',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: '/proj/repos/webpkr/test/simple/dist'
  }
}
```

`webpkr` lets you write JavaScript code:

```javascript
context( projectDir )
entry( './src/index.js')
output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )
```

## Getting Started

 Install with `npm`:

```bash
$ npm install -D webpkr webpack
```

Create `src/index.js` and add:

```javascript
console.log('Hello, world');
```

By default, `webpkr` looks for config scripts in the `webpack/` subdirectory. Create a `webpack` subdirectory in your project's root and add file `index.js` in it:
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
Create a `webpack.config.js` in your project's root and add:

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

## The `webpkr` DSL
`webpkr` scripts are _configuration scripts_. As the script executes, it configures a tree of configuration nodes. During the evaluation phase, tree nodes are evaluated to generate a `webpack` configuration object.

### Script Structure
A configuration script is made of up of multiple statements and script blocks. A script block inserts a new node in the the _configuration tree_ and takes optional parameters. If the final parameter is a closure, it is treated as a _configuration closure_ which configures the newly created node. Any optional parameters are available to the node during the subsequent evaluation phase.

Top level script blocks map to top level keys of the `webpack` configuration object. Where there is a potential clash of names (e.g. with `module` or `path`), the script block name is appended with a `$` symbol.

A configuration script is also JavaScript code, and can contain any valid JavaScript, such as method definitions, `require` statements, classes etc.


## Examples
### Explicit vendor bundle

File `webpack/index.js`. Use with `webpack.config.js` as described above.

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

### Multiple Environments

Instead of duplicating configuration for multiple environments (e.g. development/production), `webpkr`
lets you specify configuration items for specific environments in the same configuration.

File `webpack/index.js`. Use with `webpack.config.js` as described above.

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

### Splitting Configuration into Multiple Files

`webpkr` configurations can be split into multiple files. Simply `require` the parts like any other nodejs module. e.g.:

File `webpack/index.js`.
```javascript
[
  'base',
  'js',
  'fonts',
  'stats',
  'devtool',
  'dev_server'
].map( ( x ) => `./${x}` )
  .forEach( require )
```

`base.js`
```javascript
context( projectDir )

entry( './src/index.js' )

output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )

stats( 'errors-only' )

cache( true )

resolve( { extensions: ['*', '.js', '.jsx'] } )
```

`js.js`
```javascript
const path = require( 'path' )

module$( () => {
  rule( () => {
    test( /\.js$/ )
    use( 'babel-loader' )
    include( path.resolve( srcDirs.js ) )
    exclude( /node_modules/ )
  } )
} )
```
