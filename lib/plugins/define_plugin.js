// Copyright 2017, Venkat Peri.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

const debug = require( 'debug' )( 'webpkr:env_plugin' )
const PluginBase = require( '../plugin_base' );
const webpack = require( 'webpack' )
const _ = require( 'lodash' )
const { type } = require( '../util' );

class DefinePlugin extends PluginBase {
  constructor( opts = {} ) {
    super( 'define' )
    this._data = {}
  }

  afterEvaluate( config ) {
    if ( Object.keys( this._data ).length )
      config.plugins.push( new webpack.DefinePlugin( this._data ) )
    return config;
  }

  registerObjects() {
    global.define = ( name, value ) => {
      if ( type( name ) === 'object' )
        this._data = _.extend( {}, this._data, name )
      else
        this._data[name] = value
    }
  }

  unregisterObjects() {
    delete global.define;
  }
}

module.exports = DefinePlugin;
