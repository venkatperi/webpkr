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

const _ = require( 'lodash' )
const debug = require( 'debug' )( 'webpkr:webpack_classes' );
const path = require( 'path' );
const ConfigNode = require( './config_node' );
const { type, scalar } = require( './util' );
const V = require( './util/validate' );
const R = require( 'ramda' );

const projectResolve = ( f ) => path.resolve( global.projectDir, f )

//  condition
class ConditionNode extends ConfigNode {
  constructor( opts, args ) {
    super( opts, args );
    ['include', 'exclude', 'and', 'not', 'or', 'test'].forEach( ( t ) => {
      this._memberType[t] = 'array';
    } );
  }

  validate() {
    this.args.forEach( ( a ) => {
      if ( !V.condition( a ) ) {
        this.reportInvalidArgument( a, '(RegExp|Function|Object|[Condition])' )
      }
    } )
  }
}

class EntryNode extends ConfigNode {
  validate() {
    this.args.forEach( ( a ) => {
      if ( !V.entry( a ) ) {
        this.reportInvalidArgument( a, '(string|[string]|Object|Function)' )
      }
    } )
  }
}

// rule
class RuleNode extends ConfigNode {
  constructor( opts, args ) {
    super( opts, args );
    ['include', 'exclude', 'issuer', 'resource', 'resourceQuery',
      'compiler', 'test',
    ].forEach( ( t ) => {
      this._memberType[t] = 'array';
    } );
  }
}

// output.path
class PathNode extends ConfigNode {
  evaluate() {
    this.value = projectResolve( this.args[0] );
    super.evaluate();
  }
}

// output
class OutputNode extends ConfigNode {
  path$( ...args ) {
    this._set( 'path', args[0] );
  }
}

// webpack.module$
class ModuleNode extends ConfigNode {
  rule( ...args ) {
    this._push( 'rules', ...args );
  }
}

// webpack.output.devtoolLineToLine
class DevtoolLineToLineNode extends ConfigNode {
  constructor( opts, args ) {
    super( opts, args );
    ['include', 'exclude', 'test'].forEach( ( t ) => {
      this._memberType[t] = 'array';
    } );
  }
}

// webpack.resolve
class ResolveNode extends ConfigNode {
  constructor( opts, args ) {
    super( opts, args );
    ['alias'].forEach( ( t ) => {
      this._memberType[t] = 'object';
    } );
  }

  // alias( ...args ) {
  //   this.value = this._doMerge( ...args.map( x => _.set( {}, 'resolve.alias', x ) ) ).resolve;
  // }

  module$( ...args ) {
    this.value = this._doMerge( ...args.map( x => _.set( {}, 'resolve.module', x ) ) ).resolve;
  }

  plugin( ...args ) {
    this._push( 'plugins', ...args );
  }
}

// webpack.resolveLoader
class ResolveLoaderNode extends ConfigNode {
  constructor( opts, args ) {
    super( opts, args );
    ['module$'].forEach( ( t ) => {
      this._memberType[t] = 'object';
    } );
    ['plugin'].forEach( ( t ) => {
      this._memberType[t] = 'array';
    } );
  }
}

// webpack.stats
class StatsNode extends ConfigNode {
}

// webpack.watchOptions
class WatchOptionsNode extends ConfigNode {

}

// webpack.plugins
class PluginNode extends ConfigNode {
  evaluate() {
    let args = this.args;
    const id = args.shift();
    args = scalar( args );

    switch ( type( id ) ) {
      case 'string': {
        const Klass = module.require( id );
        this.value = new Klass( args );
        break;
      }

      case 'function':
        // hack to check if function is a constructor
        // eslint-disable-next-line no-undef,new-cap
        this.value = id.prototype ? new id( args ) : id( args );
        break;

      default:
        this.value = id;
    }
    return super.evaluate();
  }
}

// webpack
class WebpackNode extends ConfigNode {

  dependency( ...args ) {
    this._push( 'dependencies', ...args );
  }

  entry( ...args ) {
    args.forEach( ( a ) => {
      if ( !this.value.entry ) {
        switch ( type( a ) ) {
          case 'object':
            this.value.entry = _.extend( {}, a );
            break;
          case 'array':
            this.value.entry = a;
            break;
          default:
            this.value.entry = [a];
            break;
        }
      }
      else {
        let t1 = type( this.value.entry );
        let t2 = type( a );
        console.log( t1, t2 );
        switch ( t2 ) {
          case 'object':
            if ( t1 !== 'object' )
              return this.reportError( new TypeError( `entry: cannot add ${t2} when entry is of type ${t1}` ) );
            let allKeys = new Set();
            Object.keys( this.value.entry ).forEach( ( k ) => allKeys.add( k ) );
            Object.keys( a ).forEach( ( k ) => allKeys.add( k ) );
            allKeys.forEach( ( k ) => {
              this.value.entry[k] = _.flattenDeep( [this.value.entry[k] || [], a[k] || []] )
            } );
            // this.value.entry = _.extend( {}, this.value.entry, a );
            break;

          case 'array':
            if ( t1 === 'object' ) {
              return this.reportError( new TypeError( `entry: cannot add ${t2} when entry is of type ${t1}` ) );
            }
            this.value.entry = this.value.entry.concat( a );
            break;

          default:
            if ( t1 === 'object' ) {
              return this.reportError( new TypeError( `entry: cannot add ${t2} when entry is of type ${t1}` ) );
            }
            this.value.entry.push( a );
            break;
        }
      }
    } )
  }

  external( ...args ) {
    this._merge( ...args.map( x => _.set( {}, 'externals', x ) ) );
  }

  module$( ...args ) {
    this._merge( ...args.map( x => _.set( {}, 'module', x ) ) );
  }

  plugin( ...args ) {
    this._push( 'plugins', ...args );
  }

  resolve( ...args ) {
    this._merge( ...args.map( x => _.set( {}, 'resolve', x ) ) );
  }
}

const _k = () => class extends ConfigNode {
};

// noinspection WebpackConfigHighlighting
module.exports = {
  ConditionNode,
  AndNode: _k(),
  ExcludeNode: _k(),
  IncludeNode: _k(),
  NotNode: _k(),
  OrNode: _k(),
  TestNode: _k(),
  RuleNode,
  EnforceNode: _k(),
  IssuerNode: _k(),
  LoaderNode: _k(),
  LoadersNode: _k(),
  OneOfNode: _k(),
  OptionsNode: _k(),
  ParserNode: _k(),
  QueryNode: _k(),
  ResourceNode: _k(),
  ResourceQueryNode: _k(),
  CompilerNode: _k(),
  UseNode: _k(),
  UseItemNode: _k(),
  AmdNode: _k(),
  BailNode: _k(),
  CacheNode: _k(),
  ContextNode: _k(),
  DependencyNode: _k(),
  DevServerNode: _k(),
  DevtoolNode: _k(),
  EntryNode: EntryNode,
  ExternalNode: _k(),
  ExprContextCriticalNode: _k(),
  ExprContextRecursiveNode: _k(),
  ExprContextRegExpNode: _k(),
  ExprContextRequestNode: _k(),
  NoParseNode: _k(),
  UnknownContextCriticalNode: _k(),
  UnknownContextRecursiveNode: _k(),
  UnknownContextRegExpNode: _k(),
  UnknownContextRequestNode: _k(),
  UnsafeCacheNode: _k(),
  WrappedContextCriticalNode: _k(),
  WrappedContextRecursiveNode: _k(),
  WrappedContextRegExpNode: _k(),
  StrictExportPresenceNode: _k(),
  StrictThisContextOnImportsNode: _k(),
  ModuleNode,
  NameNode: _k(),
  BufferNode: _k(),
  DirnameNode: _k(),
  FilenameNode: _k(),
  ConsoleNode: _k(),
  GlobalNode: _k(),
  ProcessNode: _k(),
  NodeNode: _k(),
  CommonjsNode: _k(),
  Commonjs2Node: _k(),
  RootNode: _k(),
  AuxiliaryCommentNode: _k(),
  ChunkFilenameNode: _k(),
  CrossOriginLoadingNode: _k(),
  ChunkLoadTimeoutNode: _k(),
  DevtoolFallbackModuleFilenameTemplateNode: _k(),
  DevtoolLineToLineNode,
  DevtoolModuleFilenameTemplateNode: _k(),
  HashDigestNode: _k(),
  HashDigestLengthNode: _k(),
  HashFunctionNode: _k(),
  HashSaltNode: _k(),
  HotUpdateChunkFilenameNode: _k(),
  HotUpdateFunctionNode: _k(),
  HotUpdateMainFilenameNode: _k(),
  JsonpFunctionNode: _k(),
  LibraryTargetNode: _k(),
  LibraryNode: _k(),
  LibraryExportNode: _k(),
  PathNode: PathNode || _k(),
  PathinfoNode: _k(),
  PublicPathNode: _k(),
  SourceMapFilenameNode: _k(),
  SourcePrefixNode: _k(),
  StrictModuleExceptionHandlingNode: _k(),
  UmdNamedDefineNode: _k(),
  OutputNode: OutputNode || _k(),
  AssetFilterNode: _k(),
  HintsNode: _k(),
  MaxEntrypointSizeNode: _k(),
  MaxAssetSizeNode: _k(),
  PluginNode: PluginNode || _k(),
  PerformanceNode: _k(),
  ProfileNode: _k(),
  RecordsInputPathNode: _k(),
  RecordsOutputPathNode: _k(),
  RecordsPathNode: _k(),
  OnlyModuleNode: _k(),
  AliasFieldNode: _k(),
  AliasNode: _k(),
  CachePredicateNode: _k(),
  CacheWithContextNode: _k(),
  DescriptionFileNode: _k(),
  EnforceExtensionNode: _k(),
  EnforceModuleExtensionNode: _k(),
  ExtensionNode: _k(),
  FileSystemNode: _k(),
  MainFieldNode: _k(),
  MainFileNode: _k(),
  ModuleExtensionNode: _k(),
  ResolverNode: _k(),
  SymlinksNode: _k(),
  UseSyncFileSystemCallsNode: _k(),
  ResolveNode,
  ResolveLoaderNode,
  HashNode: _k(),
  VersionNode: _k(),
  TimingsNode: _k(),
  AssetsNode: _k(),
  ChunksNode: _k(),
  ChunkModulesNode: _k(),
  ModulesNode: _k(),
  ChildrenNode: _k(),
  CachedNode: _k(),
  ReasonsNode: _k(),
  SourceNode: _k(),
  WarningsFilterNode: _k(),
  ErrorDetailsNode: _k(),
  ChunkOriginsNode: _k(),
  ModulesSortNode: _k(),
  ModuleTraceNode: _k(),
  ChunksSortNode: _k(),
  AssetsSortNode: _k(),
  ProvidedExportsNode: _k(),
  UsedExportsNode: _k(),
  OptimizationBailoutNode: _k(),
  StatsNode,
  TargetNode: _k(),
  WatchNode: _k(),
  AggregateTimeoutNode: _k(),
  PollNode: _k(),
  WatchOptionsNode,
  WebpackNode,
};
