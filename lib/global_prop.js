const _ = require('lodash');
const debug = require('debug')('webpkr:global_prop');
const uniqueString = require('unique-string');

const storeName = uniqueString();
global[storeName] = {};
const store = global[storeName];

function globalProp( name, opts = {} ) {
  debug('add: %s, %o', name, opts);

  if ( global[name] ) {
    debug(global[name]);
    throw new TypeError(`global property already exists: ${name}`);
  }

  Object.defineProperty(global, name, {
    // so that we can remove this property down the line
    configurable: true,

    get: opts.get || (() => {
      const val = store[name];
      return typeof val === 'function' ?
        val() : val;
    }),

    set: opts.set || (( v ) => {
      if ( opts.readOnly ) {
        throw new Error("Can't change readonly property");
      }
      store[name] = opts.convert ? opts.convert(v) : v;
    }),
  });

  // if we're delegting, make an entry anyway, so that we can 
  // delete it down the line
  if ( !store[name] ) {
    store[name] = undefined;
  }

  if ( opts.initialValue ) {
    global[name] = opts.initialValue;
  }
}

function delegatingProp( name, delegate, opts = {} ) {
  return globalProp(name, _.extend({}, opts,
    {
      get: () => delegate[name],
      set: ( v ) => {
        // eslint-disable-next-line
        delegate[name] = v;
      },
    }));
}

function deleteGlobalProps() {
  debug('deleteGlobalProps');
  _.forOwn(store, ( v, k ) => {
    delete global[k];
    debug(`delete global.${k}`);
  });

  delete global[storeName];
}

module.exports = {
  globalProp,
  delegatingProp,
  deleteGlobalProps,
};
