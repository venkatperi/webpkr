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
const stackTrace = require( 'stack-trace' );
const debug = require( 'debug' )( 'webpkr:config_node' )
const { inspect } = require( 'util' );

const { ValidationError } = require( './error' );
const asciiTree = require( './util/ascii_tree' );
const { nop } = require( './util' );

/**
 * Base class for nodes in webpack parse tree
 *
 */
class ConfigNode {
  constructor( opts = {}, ...args ) {
    this._name = opts.name;
    this._args = args.length === 0 ? null : args;
    this.children = [];
    this.parent = null;
    this._memberType = {};
    this._path = null;
    this._sourceFilename = global.currentFilename;
    this._trace = stackTrace.get();
    this._envs = null;

    if ( global.currentEnv ) {
      this._envs = {
        include: [global.currentEnv],
        exclude: []
      }
    }
    this.validate();
  }

  /**
   * Gets this node's arguments
   *
   * @returns {*[]|*}
   */
  get args() {
    return this._args;
  }

  get callSite() {
    return _.find( this._trace, ( x ) => x.getFileName() === this._sourceFilename );
  }

  /**
   * Gets the env rules in which this node should be evaluated or not.
   *
   * @returns {object}
   */
  get envs() {
    return this._envs;
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

  reportError( err ) {
    throw err;
  }

  reportInvalidArgument( actual, expected ) {
    let callSite = this.callSite;
    let err = [];
    err.push( `'${this.name}()': ` )
    err.push( actual )
    err.push( ' is not ' )
    err.push( expected )
    err.push( ' at ' )
    err.push( callSite.getFileName() )
    err.push( ':' )
    err.push( Number( callSite.getLineNumber() ) - 1 )
    this.reportError( new ValidationError( err.join( '' ),
      callSite.getFileName(),
      Number( callSite.getLineNumber() ) - 1 ) );
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

  validate() {
    return true;
  }

  walk( visitor = {} ) {
    ( visitor.beforeChildren || nop ).call( null, this );
    this.children.forEach( c => c.walk( visitor ) );
    return ( visitor.afterChildren || nop ).call( null, this );
  }
}

module.exports = ConfigNode;

