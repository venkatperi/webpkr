# webpkr
The missing JavaScript DSL for configuring `webpack`.
See [docs](https://venkatperi.github.io/webpkr-doc/).

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
