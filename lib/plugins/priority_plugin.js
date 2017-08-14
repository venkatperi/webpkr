/* eslint-disable no-restricted-properties */
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

const debug = require( 'debug' )( 'webpkr:priority_plugin' );
const PluginBase = require( '../plugin_base' );

class PriorityPlugin extends PluginBase {
// eslint-disable-next-line no-unused-vars
  constructor( opts = {} ) {
    super( 'priority' );

    this._priorities = {
      doFirst: -Math.Pow( 2, 20 ),
      doLast: Math.Pow( 2, 20 ),
    };

    this._currentPriority = null;
    this._nesting = 0;

    this.on( 'added', () => {
      this.builder.on( 'nodeInstantiate', ( b, name, node ) => {
        if ( node._priority ) throw new Error( 'node._priority already exists!' );
        if ( this._currentPriority ) {
          debug( String( node ) );
        }
        node._priority = this._currentPriority;
      } );
    } );
  }

  beforeNodeEvaluate( node ) {
    if ( node.isLeaf ) return;
    node.children.forEach( ( c, i ) => {
      c.__order = i;
    } );

    node.children.sort( ( a, b ) => {
      const p1 = this._priorities[a._priority] || 0;
      const p2 = this._priorities[b._priority] || 0;
      if ( p1 < p2 ) return -1;
      if ( p1 > p2 ) return 1;

      // if priority is the same, preserve order
      return a.__order - b.__order;
    } );
  }

  registerObjects() {
    Object.keys( this._priorities ).forEach( ( p ) => {
      global[p] = ( closure ) => {
        const prev = this._currentPriority;
        this._currentPriority += p / Math.pow( 2, this._nesting );
        this._nesting += 1;
        closure();
        this._nesting -= 1;
        this._currentPriority = prev;
      };
    } );
  }

  unregisterObjects() {
    Object.keys( this._priorities ).forEach( p => delete global[p] );
  }
}

module.exports = PriorityPlugin;
