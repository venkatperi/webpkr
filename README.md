# webpkr
The missing JavaScript DSL for `webpack` configurations.

## Example
### A Simple Config
This `webpkr` JavaScript DSL script:
```javascript
context( projectDir )
entry( './src/index.js')
output( () => {
  filename( 'bundle.js' )
  path$( 'dist' )
} )
```
generates the following `webpack` configuration:

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
when used with this `webpack.config.js`:
```javascript
const webpkr = require('webpkr');

module.exports = webpkr({projectDir: __dirname});
```
