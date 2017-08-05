# webpkr
The missing JavaScript DSL for `webpack` configurations.

## Getting Started
 Install with npm
```bash
npm install -D webpkr
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
and the bundled output is available in `dist/bundle.js`.
