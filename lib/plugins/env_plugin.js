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

// eslint-disable-next-line no-unused-vars
const debug = require( 'debug' )( 'webpkr:env_plugin' );
const PluginBase = require( '../plugin_base' );
const V = require( '../util/validate' );

const test = env => V.both( V.contains( env.include ), V.missing( env.exclude ) );

class EnvPlugin extends PluginBase {
  constructor( opts = {} ) {
    super( 'env' );
    this._environments = opts.environments || opts.config.get( 'plugins.env.environments' );
    this._env = opts.env || process.env.NODE_ENV;
    this._currentEnv = null;

    this.on( 'added', () => {
      this.builder.on( 'nodeInstantiate', ( b, name, node ) => {
        if ( node._envs ) throw new Error( 'node.env already exists!' );
        if ( this._currentEnv ) {
          node._envs = {
            include: [this._currentEnv],
            exclude: [],
          };
        }
      } );
    } );
  }

  get env() {
    return this._env;
  }

  registerObjects() {
    this._environments.forEach( ( env ) => {
      global[env] = ( closure ) => {
        const prev = this._currentEnv;
        this._currentEnv = env;
        closure();
        this._currentEnv = prev;
      };
    } );
  }

  shouldEvaluate( node ) {
    return !node._envs || test( node._envs )( this.env );
  }

  unregisterObjects() {
    this._environments.forEach( e => delete global[e] );
  }
}

module.exports = EnvPlugin;
