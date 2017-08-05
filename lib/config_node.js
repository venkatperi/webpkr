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

const _ = require( 'lodash' );
const { Config } = require( 'webpack-config' );
const deepmerge = require( 'deepmerge' );
const { inspect } = require( 'util' );
const asciiTree = require( './util/ascii_tree' );
const { nop } = require( './util' );
const debug = require( 'debug' )( 'webpkr:config_node' )

/**
 * Base class for nodes in webpack parse tree
 *
 */
class ConfigNode {
  constructor( opts = {}, ...args ) {
    this._name = opts.name;
    this._env = opts.env || global.currentEnv;
    this._args = args.length === 0 ? null : args;
    this.children = [];
    this.parent = null;
    this._memberType = {};
    this._path = null;
  }

  /**
   * Gets this node's arguments
   *
   * @returns {*[]|*}
   */
  get args() {
    return this._args;
  }

  get env() {
    return this._env;
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get name() {
    return this._name;
  }

  /**
   * Path to the current node
   * @returns {*}
   */
  get path() {
    if ( this._path ) return this._path;
    const parts = [];
    if ( this.parent ) {
      parts.push( this.parent.path );
    }
    parts.push( this.name );
    return parts.join( '.' );
  }

  _doMerge( ...args ) {
    return new Config()
      .merge( this.value, ...args )
      .toObject();
  }

  _extend( path, ...args ) {
    this.value = this.value || {};
    args.forEach( ( x ) => {
      this.value[path] = deepmerge( ( this.value[path] || {} ), x );
    } );
  }

  _handler( name, ...args ) {
    switch ( this._memberType[name] ) {
      case 'object':
        return this._extend( name, ...args );
      case 'array':
        return this._push( name, ...args );
      default:
        return this._set( name, ...args );
    }
  }

  _merge( ...args ) {
    this.value = this._doMerge( ...args )
  }

  _push( path, ...args ) {
    this.value = this.value || {};
    this.value[path] = ( this.value[path] || [] ).concat( args );
  }

  _set( path, ...args ) {
    this.value = this.value || {};
    this.value[path] = args[0];
  }

  addChild( c ) {
    this.children.push( c );
    // eslint-disable-next-line no-param-reassign
    c.parent = this;
    return c;
  }

  evaluate() {
    if ( !this.parent ) {
      return this.value;
    }

    // let args = this.isLeaf ? this.args : [ this.value ];
    const args = this.value ? [this.value] : this.args;
    let handler = null;
    if ( this.name !== 'name' )    // don't get the name property for name('...)
      handler = this.parent[this.name];

    if ( !handler ) {
      handler = this.parent._handler;
      args.unshift( this.name );
    }
    try {
      handler.apply( this.parent, args );
    } catch ( err ) {
      debug( '%o, %o, %o', this, handler, err )
      throw err;
    }
    return this.value;
  }

  removeChild( c ) {
    const idx = this.children.indexOf( c );
    if ( idx >= 0 ) {
      this.children.splice( idx, 1 );
    }
  }

  toAsciiTree() {
    return asciiTree( this );
  }

  toString() {
    const res = [this.name];
    res.push( this.constructor.name );
    res.push( this.path );
    if ( this.args ) {
      res.push( _.truncate( inspect( this.args ) ) );
    }

    return res.join( ', ' );
  }

  walk( visitor = {} ) {
    ( visitor.beforeChildren || nop ).call( null, this );
    this.children.forEach( c => c.walk( visitor ) );
    return ( visitor.afterChildren || nop ).call( null, this );
  }
}

module.exports = ConfigNode;

