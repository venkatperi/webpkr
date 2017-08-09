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

const { EventEmitter } = require( 'events' );

class PluginBase extends EventEmitter {
  constructor( name ) {
    super();
    this._name = name;
    this._builder = null;
  }

  get builder() {
    return this._builder;
  }

  get name() {
    return this._name;
  }

  /**
   * Called after all nodes evaluated
   *
   * @param value
   * @returns {*}
   */
  afterEvaluate( value ) {
    return value;
  }

  /**
   * Called by the builder to let this plugin inspect the result of evaluating the supplied node.
   * The plugin can modify the value and return the new value.
   * @param node {ConfigNode}
   * @param value {*}
   * @returns {*} the original value, or modified.
   */
  afterNodeEvaluate( node, value ) {
    return value;
  }

  /**
   * Called by {Webpkr} when this plugin is added to its list of plugins.
   *
   * @param builder {Webpkr} the builder
   */
  onPluginAdded( builder ) {
    this._builder = builder;
    this.emit( 'added' );
  }

  /***
   * Returns true if the specified node should be considered during evaluation
   *
   * @param node {ConfigNode} node to test
   * @returns {boolean} true if the node should be evaluated, false otherwise.
   */
  shouldEvaluate( node ) {
    return true;
  }
}

module.exports = PluginBase;
