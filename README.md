# webpkr
[![npm](https://badge.fury.io/js/webpkr.svg)](https://badge.fury.io/js/webpkr)
![Build Status](https://travis-ci.org/venkatperi/webpkr.svg?branch=master)

Webpkr is a build system for `webpack` configurations. See [docs](https://venkatperi.github.io/webpkr-doc/).

#### Declarative Build Scripts
* Write declarative _build scripts_.
* Stop _mutating_ monolithic objects.
* Plain ol' JavaScript.

```javascript
 // base.js
context( projectDir )
entry( './src/index.js')
output( () => {
  filename( 'bundle.js' )
  path$( 'dist' ) } )
```


#### Single Build Truth
- All code in the same build script.
- No need to clone configurations.

```javascript
 // devtool.js
 // only for NODE_ENV=development
development( () => {
  devtool( 'cheap-module-source-map' ) } )
```

#### Logical Partitioning
- Partition code logically for reuse.

```javascript
 // css.js
plugin( new ExtractTextPlugin( ) )
module$( () => {
  rule( () => {
    test( /\.css$/ )
    use( ExtractTextPlugin.extract( {
      use: 'css-loader', } ) ) } ) } )

```


#### Just `require`
- Order of assembly is largely unimportant.
- Webpkr builds correct configuration object.

```javascript
 //index.js
require('./base')
require('./devtool')
require('./css')  //that's it
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

By default, `webpkr` looks for config scripts in the `./webpkr` module. Create a `webpack` subdirectory in your project's root and add file `index.js` in it:
```bash
$ mkdir webpkr
$ touch webpkr/index.js
```

Add the following DSL script to `webpkr/index.js`:

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

See [docs](https://venkatperi.github.io/webpkr-doc/).
