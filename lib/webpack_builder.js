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

/* eslint-disable */
const ConfigNode = require( '../lib/config_node' );
const classes = require( '../lib/webpack_classes' );
const { JsDsl, AbstractFactory } = require( 'js-dsl' );
const BaseFactory = require( '../lib/base_factory' );


class LeafFactory extends AbstractFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ConfigNode( { name }, args );
  }
}

LeafFactory.INSTANCE = new LeafFactory();

// webpack.watchOptions.aggregateTimeout
class AggregateTimeoutNodeExt extends classes.AggregateTimeoutNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'watchOptions.aggregateTimeout';
  }
}

// webpack.resolve.alias
class AliasNodeExt extends classes.AliasNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.alias';
  }
}

// webpack.resolve.aliasField
class AliasFieldNodeExt extends classes.AliasFieldNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.aliasField';
  }
}

// webpack.amd
class AmdNodeExt extends classes.AmdNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'amd';
  }
}

// condition.and
class AndNodeExt extends classes.AndNode {
}

// webpack.performance.assetFilter
class AssetFilterNodeExt extends classes.AssetFilterNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'performance.assetFilter';
  }
}

// webpack.stats.assets
class AssetsNodeExt extends classes.AssetsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.assets';
  }
}

// webpack.stats.assetsSort
class AssetsSortNodeExt extends classes.AssetsSortNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.assetsSort';
  }
}

// webpack.output.auxiliaryComment
class AuxiliaryCommentNodeExt extends classes.AuxiliaryCommentNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.auxiliaryComment';
  }
}

// webpack.bail
class BailNodeExt extends classes.BailNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'bail';
  }
}

// webpack.node.Buffer
class BufferNodeExt extends classes.BufferNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node.Buffer';
  }
}

// webpack.cache
class CacheNodeExt extends classes.CacheNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'cache';
  }
}

// webpack.resolve.cachePredicate
class CachePredicateNodeExt extends classes.CachePredicateNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.cachePredicate';
  }
}

// webpack.resolve.cacheWithContext
class CacheWithContextNodeExt extends classes.CacheWithContextNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.cacheWithContext';
  }
}

// webpack.stats.cached
class CachedNodeExt extends classes.CachedNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.cached';
  }
}

// webpack.stats.children
class ChildrenNodeExt extends classes.ChildrenNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.children';
  }
}

// webpack.output.chunkFilename
class ChunkFilenameNodeExt extends classes.ChunkFilenameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.chunkFilename';
  }
}

// webpack.output.chunkLoadTimeout
class ChunkLoadTimeoutNodeExt extends classes.ChunkLoadTimeoutNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.chunkLoadTimeout';
  }
}

// webpack.stats.chunkModules
class ChunkModulesNodeExt extends classes.ChunkModulesNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.chunkModules';
  }
}

// webpack.stats.chunkOrigins
class ChunkOriginsNodeExt extends classes.ChunkOriginsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.chunkOrigins';
  }
}

// webpack.stats.chunks
class ChunksNodeExt extends classes.ChunksNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.chunks';
  }
}

// webpack.stats.chunksSort
class ChunksSortNodeExt extends classes.ChunksSortNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.chunksSort';
  }
}

// webpack.output.auxiliaryComment.commonjs
class CommonjsNodeExt extends classes.CommonjsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.auxiliaryComment.commonjs';
  }
}

// webpack.output.auxiliaryComment.commonjs2
class Commonjs2NodeExt extends classes.Commonjs2Node {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.auxiliaryComment.commonjs2';
  }
}

// rule.compiler
class CompilerNodeExt extends classes.CompilerNode {
}

// condition
class ConditionNodeExt extends classes.ConditionNode {
}

// webpack.node.console
class ConsoleNodeExt extends classes.ConsoleNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node.console';
  }
}

// webpack.context
class ContextNodeExt extends classes.ContextNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'context';
  }
}

// webpack.output.crossOriginLoading
class CrossOriginLoadingNodeExt extends classes.CrossOriginLoadingNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.crossOriginLoading';
  }
}

// webpack.dependency
class DependencyNodeExt extends classes.DependencyNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'dependency';
  }
}

// webpack.resolve.descriptionFile
class DescriptionFileNodeExt extends classes.DescriptionFileNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.descriptionFile';
  }
}

// webpack.devServer
class DevServerNodeExt extends classes.DevServerNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'devServer';
  }
}

// webpack.devtool
class DevtoolNodeExt extends classes.DevtoolNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'devtool';
  }
}

// webpack.output.devtoolFallbackModuleFilenameTemplate
// eslint-disable-next-line max-len
class DevtoolFallbackModuleFilenameTemplateNodeExt extends classes.DevtoolFallbackModuleFilenameTemplateNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.devtoolFallbackModuleFilenameTemplate';
  }
}

// webpack.output.devtoolLineToLine
class DevtoolLineToLineNodeExt extends classes.DevtoolLineToLineNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.devtoolLineToLine';
  }
}

// webpack.output.devtoolModuleFilenameTemplate
class DevtoolModuleFilenameTemplateNodeExt extends classes.DevtoolModuleFilenameTemplateNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.devtoolModuleFilenameTemplate';
  }
}

// webpack.node.__dirname
class DirnameNodeExt extends classes.DirnameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node.__dirname';
  }
}

// rule.enforce
class EnforceNodeExt extends classes.EnforceNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.resolve.enforceExtension
class EnforceExtensionNodeExt extends classes.EnforceExtensionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.enforceExtension';
  }
}

// webpack.resolve.enforceModuleExtension
class EnforceModuleExtensionNodeExt extends classes.EnforceModuleExtensionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.enforceModuleExtension';
  }
}

// webpack.entry
class EntryNodeExt extends classes.EntryNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'entry';
  }
}

// webpack.stats.errorDetails
class ErrorDetailsNodeExt extends classes.ErrorDetailsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.errorDetails';
  }
}

// condition.exclude
class ExcludeNodeExt extends classes.ExcludeNode {
}

// webpack.module$.exprContextCritical
class ExprContextCriticalNodeExt extends classes.ExprContextCriticalNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.exprContextCritical';
  }
}

// webpack.module$.exprContextRecursive
class ExprContextRecursiveNodeExt extends classes.ExprContextRecursiveNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.exprContextRecursive';
  }
}

// webpack.module$.exprContextRegExp
class ExprContextRegExpNodeExt extends classes.ExprContextRegExpNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.exprContextRegExp';
  }
}

// webpack.module$.exprContextRequest
class ExprContextRequestNodeExt extends classes.ExprContextRequestNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.exprContextRequest';
  }
}

// webpack.resolve.extension
class ExtensionNodeExt extends classes.ExtensionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.extension';
  }
}

// webpack.externals
class ExternalNodeExt extends classes.ExternalNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'externals';
  }
}

// webpack.resolve.fileSystem
class FileSystemNodeExt extends classes.FileSystemNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.fileSystem';
  }
}

// webpack.node.__filename
class FilenameNodeExt extends classes.FilenameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node.__filename';
  }
}

// webpack.node.global
class GlobalNodeExt extends classes.GlobalNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node.global';
  }
}

// webpack.stats.hash
class HashNodeExt extends classes.HashNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.hash';
  }
}

// webpack.output.hashDigest
class HashDigestNodeExt extends classes.HashDigestNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hashDigest';
  }
}

// webpack.output.hashDigestLength
class HashDigestLengthNodeExt extends classes.HashDigestLengthNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hashDigestLength';
  }
}

// webpack.output.hashFunction
class HashFunctionNodeExt extends classes.HashFunctionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hashFunction';
  }
}

// webpack.output.hashSalt
class HashSaltNodeExt extends classes.HashSaltNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hashSalt';
  }
}

// webpack.performance.hints
class HintsNodeExt extends classes.HintsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'performance.hints';
  }
}

// webpack.output.hotUpdateChunkFilename
class HotUpdateChunkFilenameNodeExt extends classes.HotUpdateChunkFilenameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hotUpdateChunkFilename';
  }
}

// webpack.output.hotUpdateFunction
class HotUpdateFunctionNodeExt extends classes.HotUpdateFunctionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hotUpdateFunction';
  }
}

// webpack.output.hotUpdateMainFilename
class HotUpdateMainFilenameNodeExt extends classes.HotUpdateMainFilenameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.hotUpdateMainFilename';
  }
}

// condition.include
class IncludeNodeExt extends classes.IncludeNode {
}

// rule.issuer
class IssuerNodeExt extends classes.IssuerNode {
}

// webpack.output.jsonpFunction
class JsonpFunctionNodeExt extends classes.JsonpFunctionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.jsonpFunction';
  }
}

// webpack.output.library
class LibraryNodeExt extends classes.LibraryNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.library';
  }
}

// webpack.output.libraryExport
class LibraryExportNodeExt extends classes.LibraryExportNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.libraryExport';
  }
}

// webpack.output.libraryTarget
class LibraryTargetNodeExt extends classes.LibraryTargetNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.libraryTarget';
  }
}

// rule.loader
class LoaderNodeExt extends classes.LoaderNode {
}

// rule.loaders
class LoadersNodeExt extends classes.LoadersNode {
}

// webpack.resolve.mainField
class MainFieldNodeExt extends classes.MainFieldNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.mainField';
  }
}

// webpack.resolve.mainFile
class MainFileNodeExt extends classes.MainFileNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.mainFile';
  }
}

// webpack.performance.maxAssetSize
class MaxAssetSizeNodeExt extends classes.MaxAssetSizeNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'performance.maxAssetSize';
  }
}

// webpack.performance.maxEntrypointSize
class MaxEntrypointSizeNodeExt extends classes.MaxEntrypointSizeNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'performance.maxEntrypointSize';
  }
}

// webpack.module$
class ModuleNodeExt extends classes.ModuleNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$';
  }
}

// webpack.resolve.moduleExtension
class ModuleExtensionNodeExt extends classes.ModuleExtensionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.moduleExtension';
  }
}

// webpack.stats.moduleTrace
class ModuleTraceNodeExt extends classes.ModuleTraceNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.moduleTrace';
  }
}

// webpack.stats.modules
class ModulesNodeExt extends classes.ModulesNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.modules';
  }
}

// webpack.stats.modulesSort
class ModulesSortNodeExt extends classes.ModulesSortNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.modulesSort';
  }
}

// webpack.name
class NameNodeExt extends classes.NameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'name';
  }
}

// webpack.module$.noParse
class NoParseNodeExt extends classes.NoParseNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.noParse';
  }
}

// webpack.node
class NodeNodeExt extends classes.NodeNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node';
  }
}

// condition.not
class NotNodeExt extends classes.NotNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// rule.oneOf
class OneOfNodeExt extends classes.OneOfNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.resolve.alias.<array>.onlyModule
class OnlyModuleNodeExt extends classes.OnlyModuleNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.alias.<array>.onlyModule';
  }
}

// webpack.stats.optimizationBailout
class OptimizationBailoutNodeExt extends classes.OptimizationBailoutNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.optimizationBailout';
  }
}

// rule.options
class OptionsNodeExt extends classes.OptionsNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// condition.or
class OrNodeExt extends classes.OrNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.output
class OutputNodeExt extends classes.OutputNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output';
  }
}

// rule.parser
class ParserNodeExt extends classes.ParserNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.output.path
class PathNodeExt extends classes.PathNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.path';
  }
}

// webpack.output.pathinfo
class PathinfoNodeExt extends classes.PathinfoNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.pathinfo';
  }
}

// webpack.performance
class PerformanceNodeExt extends classes.PerformanceNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'performance';
  }
}

// webpack.plugin
class PluginNodeExt extends classes.PluginNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'plugin';
  }
}

// webpack.watchOptions.poll
class PollNodeExt extends classes.PollNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'watchOptions.poll';
  }
}

// webpack.node.process
class ProcessNodeExt extends classes.ProcessNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'node.process';
  }
}

// webpack.profile
class ProfileNodeExt extends classes.ProfileNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'profile';
  }
}

// webpack.stats.providedExports
class ProvidedExportsNodeExt extends classes.ProvidedExportsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.providedExports';
  }
}

// webpack.output.publicPath
class PublicPathNodeExt extends classes.PublicPathNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.publicPath';
  }
}

// rule.query
class QueryNodeExt extends classes.QueryNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.stats.reasons
class ReasonsNodeExt extends classes.ReasonsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.reasons';
  }
}

// webpack.recordsInputPath
class RecordsInputPathNodeExt extends classes.RecordsInputPathNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'recordsInputPath';
  }
}

// webpack.recordsOutputPath
class RecordsOutputPathNodeExt extends classes.RecordsOutputPathNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'recordsOutputPath';
  }
}

// webpack.recordsPath
class RecordsPathNodeExt extends classes.RecordsPathNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'recordsPath';
  }
}

// webpack.resolve
class ResolveNodeExt extends classes.ResolveNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve';
  }
}

// webpack.resolveLoader
class ResolveLoaderNodeExt extends classes.ResolveLoaderNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolveLoader';
  }
}

// webpack.resolve.resolver
class ResolverNodeExt extends classes.ResolverNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.resolver';
  }
}

// rule.resource
class ResourceNodeExt extends classes.ResourceNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// rule.resourceQuery
class ResourceQueryNodeExt extends classes.ResourceQueryNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.output.auxiliaryComment.root
class RootNodeExt extends classes.RootNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.auxiliaryComment.root';
  }
}

// rule
class RuleNodeExt extends classes.RuleNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.stats.source
class SourceNodeExt extends classes.SourceNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.source';
  }
}

// webpack.output.sourceMapFilename
class SourceMapFilenameNodeExt extends classes.SourceMapFilenameNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.sourceMapFilename';
  }
}

// webpack.output.sourcePrefix
class SourcePrefixNodeExt extends classes.SourcePrefixNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.sourcePrefix';
  }
}

// webpack.stats
class StatsNodeExt extends classes.StatsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats';
  }
}

// webpack.module$.strictExportPresence
class StrictExportPresenceNodeExt extends classes.StrictExportPresenceNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.strictExportPresence';
  }
}

// webpack.output.strictModuleExceptionHandling
class StrictModuleExceptionHandlingNodeExt extends classes.StrictModuleExceptionHandlingNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.strictModuleExceptionHandling';
  }
}

// webpack.module$.strictThisContextOnImports
class StrictThisContextOnImportsNodeExt extends classes.StrictThisContextOnImportsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.strictThisContextOnImports';
  }
}

// webpack.resolve.symlinks
class SymlinksNodeExt extends classes.SymlinksNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.symlinks';
  }
}

// webpack.target
class TargetNodeExt extends classes.TargetNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'target';
  }
}

// condition.test
class TestNodeExt extends classes.TestNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.stats.timings
class TimingsNodeExt extends classes.TimingsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.timings';
  }
}

// webpack.output.umdNamedDefine
class UmdNamedDefineNodeExt extends classes.UmdNamedDefineNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'output.umdNamedDefine';
  }
}

// webpack.module$.unknownContextCritical
class UnknownContextCriticalNodeExt extends classes.UnknownContextCriticalNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.unknownContextCritical';
  }
}

// webpack.module$.unknownContextRecursive
class UnknownContextRecursiveNodeExt extends classes.UnknownContextRecursiveNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.unknownContextRecursive';
  }
}

// webpack.module$.unknownContextRegExp
class UnknownContextRegExpNodeExt extends classes.UnknownContextRegExpNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.unknownContextRegExp';
  }
}

// webpack.module$.unknownContextRequest
class UnknownContextRequestNodeExt extends classes.UnknownContextRequestNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.unknownContextRequest';
  }
}

// webpack.module$.unsafeCache
class UnsafeCacheNodeExt extends classes.UnsafeCacheNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.unsafeCache';
  }
}

// rule.use
class UseNodeExt extends classes.UseNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// use-item
class UseItemNodeExt extends classes.UseItemNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.resolve.useSyncFileSystemCalls
class UseSyncFileSystemCallsNodeExt extends classes.UseSyncFileSystemCallsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'resolve.useSyncFileSystemCalls';
  }
}

// webpack.stats.usedExports
class UsedExportsNodeExt extends classes.UsedExportsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.usedExports';
  }
}

// webpack.stats.version
class VersionNodeExt extends classes.VersionNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.version';
  }
}

// webpack.stats.warningsFilter
class WarningsFilterNodeExt extends classes.WarningsFilterNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'stats.warningsFilter';
  }
}

// webpack.watch
class WatchNodeExt extends classes.WatchNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'watch';
  }
}

// webpack.watchOptions
class WatchOptionsNodeExt extends classes.WatchOptionsNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'watchOptions';
  }
}

// webpack
class WebpackNodeExt extends classes.WebpackNode {
  constructor( opts, args ) {
    super( opts, args );
  }
}

// webpack.module$.wrappedContextCritical
class WrappedContextCriticalNodeExt extends classes.WrappedContextCriticalNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.wrappedContextCritical';
  }
}

// webpack.module$.wrappedContextRecursive
class WrappedContextRecursiveNodeExt extends classes.WrappedContextRecursiveNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.wrappedContextRecursive';
  }
}

// webpack.module$.wrappedContextRegExp
class WrappedContextRegExpNodeExt extends classes.WrappedContextRegExpNode {
  constructor( opts, args ) {
    super( opts, args );
    this._path = 'module$.wrappedContextRegExp';
  }
}

class AggregateTimeoutFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new AggregateTimeoutNodeExt( { name }, args );
  }
}

AggregateTimeoutFactory.INSTANCE = new AggregateTimeoutFactory();

class AliasFactory extends BaseFactory {
  // getBuilder( parent ) { return new AliasBuilder( parent ); }
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new AliasNodeExt( { name }, args );
  }
}

AliasFactory.INSTANCE = new AliasFactory();

class AliasFieldFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new AliasFieldNodeExt( { name }, args );
  }
}

AliasFieldFactory.INSTANCE = new AliasFieldFactory();

class AmdFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new AmdNodeExt( { name }, args );
  }
}

AmdFactory.INSTANCE = new AmdFactory();

class AndFactory extends BaseFactory {
  newInstance( builder, name, args ) {
    return new AndNodeExt( { name }, args );
  }
}

AndFactory.INSTANCE = new AndFactory();

class AssetFilterFactory extends BaseFactory {
  newInstance( builder, name, args ) {
    return new AssetFilterNodeExt( { name }, args );
  }
}

AssetFilterFactory.INSTANCE = new AssetFilterFactory();

class AssetsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new AssetsNodeExt( { name }, args );
  }
}

AssetsFactory.INSTANCE = new AssetsFactory();

class AssetsSortFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new AssetsSortNodeExt( { name }, args );
  }
}

AssetsSortFactory.INSTANCE = new AssetsSortFactory();

class AuxiliaryCommentFactory extends BaseFactory {
  getBuilder( parent ) {
    return new AuxiliaryCommentBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new AuxiliaryCommentNodeExt( { name }, args );
  }
}

AuxiliaryCommentFactory.INSTANCE = new AuxiliaryCommentFactory();

class BailFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new BailNodeExt( { name }, args );
  }
}

BailFactory.INSTANCE = new BailFactory();

class BufferFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new BufferNodeExt( { name }, args );
  }
}

BufferFactory.INSTANCE = new BufferFactory();

class CacheFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new CacheNodeExt( { name }, args );
  }
}

CacheFactory.INSTANCE = new CacheFactory();

class CachePredicateFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new CachePredicateNodeExt( { name }, args );
  }
}

CachePredicateFactory.INSTANCE = new CachePredicateFactory();

class CacheWithContextFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new CacheWithContextNodeExt( { name }, args );
  }
}

CacheWithContextFactory.INSTANCE = new CacheWithContextFactory();

class CachedFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new CachedNodeExt( { name }, args );
  }
}

CachedFactory.INSTANCE = new CachedFactory();

class ChildrenFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChildrenNodeExt( { name }, args );
  }
}

ChildrenFactory.INSTANCE = new ChildrenFactory();

class ChunkFilenameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChunkFilenameNodeExt( { name }, args );
  }
}

ChunkFilenameFactory.INSTANCE = new ChunkFilenameFactory();

class ChunkLoadTimeoutFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChunkLoadTimeoutNodeExt( { name }, args );
  }
}

ChunkLoadTimeoutFactory.INSTANCE = new ChunkLoadTimeoutFactory();

class ChunkModulesFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChunkModulesNodeExt( { name }, args );
  }
}

ChunkModulesFactory.INSTANCE = new ChunkModulesFactory();

class ChunkOriginsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChunkOriginsNodeExt( { name }, args );
  }
}

ChunkOriginsFactory.INSTANCE = new ChunkOriginsFactory();

class ChunksFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChunksNodeExt( { name }, args );
  }
}

ChunksFactory.INSTANCE = new ChunksFactory();

class ChunksSortFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ChunksSortNodeExt( { name }, args );
  }
}

ChunksSortFactory.INSTANCE = new ChunksSortFactory();

class CommonjsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new CommonjsNodeExt( { name }, args );
  }
}

CommonjsFactory.INSTANCE = new CommonjsFactory();

class Commonjs2Factory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new Commonjs2NodeExt( { name }, args );
  }
}

Commonjs2Factory.INSTANCE = new Commonjs2Factory();

class ConditionFactory extends BaseFactory {
  getBuilder( parent ) {
    return new ConditionBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new ConditionNodeExt( { name }, args );
  }
}

ConditionFactory.INSTANCE = new ConditionFactory();

class ConsoleFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ConsoleNodeExt( { name }, args );
  }
}

ConsoleFactory.INSTANCE = new ConsoleFactory();

class ContextFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ContextNodeExt( { name }, args );
  }
}

ContextFactory.INSTANCE = new ContextFactory();

class CrossOriginLoadingFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new CrossOriginLoadingNodeExt( { name }, args );
  }
}

CrossOriginLoadingFactory.INSTANCE = new CrossOriginLoadingFactory();

class DependencyFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DependencyNodeExt( { name }, args );
  }
}

DependencyFactory.INSTANCE = new DependencyFactory();

class DescriptionFileFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DescriptionFileNodeExt( { name }, args );
  }
}

DescriptionFileFactory.INSTANCE = new DescriptionFileFactory();

class DevServerFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DevServerNodeExt( { name }, args );
  }
}

DevServerFactory.INSTANCE = new DevServerFactory();

class DevtoolFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DevtoolNodeExt( { name }, args );
  }
}

DevtoolFactory.INSTANCE = new DevtoolFactory();

class DevtoolFallbackModuleFilenameTemplateFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DevtoolFallbackModuleFilenameTemplateNodeExt( { name }, args );
  }
}

DevtoolFallbackModuleFilenameTemplateFactory.INSTANCE =
  new DevtoolFallbackModuleFilenameTemplateFactory();

class DevtoolLineToLineFactory extends BaseFactory {
  getBuilder( parent ) {
    return new DevtoolLineToLineBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new DevtoolLineToLineNodeExt( { name }, args );
  }
}

DevtoolLineToLineFactory.INSTANCE = new DevtoolLineToLineFactory();

class DevtoolModuleFilenameTemplateFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DevtoolModuleFilenameTemplateNodeExt( { name }, args );
  }
}

DevtoolModuleFilenameTemplateFactory.INSTANCE = new DevtoolModuleFilenameTemplateFactory();

class DirnameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new DirnameNodeExt( { name }, args );
  }
}

DirnameFactory.INSTANCE = new DirnameFactory();

class EnforceFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new EnforceNodeExt( { name }, args );
  }
}

EnforceFactory.INSTANCE = new EnforceFactory();

class EnforceExtensionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new EnforceExtensionNodeExt( { name }, args );
  }
}

EnforceExtensionFactory.INSTANCE = new EnforceExtensionFactory();

class EnforceModuleExtensionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new EnforceModuleExtensionNodeExt( { name }, args );
  }
}

EnforceModuleExtensionFactory.INSTANCE = new EnforceModuleExtensionFactory();

class EntryFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new EntryNodeExt( { name }, args );
  }
}

EntryFactory.INSTANCE = new EntryFactory();

class ErrorDetailsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ErrorDetailsNodeExt( { name }, args );
  }
}

ErrorDetailsFactory.INSTANCE = new ErrorDetailsFactory();

class ExcludeFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExcludeNodeExt( { name }, args );
  }
}

ExcludeFactory.INSTANCE = new ExcludeFactory();

class ExprContextCriticalFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExprContextCriticalNodeExt( { name }, args );
  }
}

ExprContextCriticalFactory.INSTANCE = new ExprContextCriticalFactory();

class ExprContextRecursiveFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExprContextRecursiveNodeExt( { name }, args );
  }
}

ExprContextRecursiveFactory.INSTANCE = new ExprContextRecursiveFactory();

class ExprContextRegExpFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExprContextRegExpNodeExt( { name }, args );
  }
}

ExprContextRegExpFactory.INSTANCE = new ExprContextRegExpFactory();

class ExprContextRequestFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExprContextRequestNodeExt( { name }, args );
  }
}

ExprContextRequestFactory.INSTANCE = new ExprContextRequestFactory();

class ExtensionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExtensionNodeExt( { name }, args );
  }
}

ExtensionFactory.INSTANCE = new ExtensionFactory();

class ExternalFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ExternalNodeExt( { name }, args );
  }
}

ExternalFactory.INSTANCE = new ExternalFactory();

class FileSystemFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new FileSystemNodeExt( { name }, args );
  }
}

FileSystemFactory.INSTANCE = new FileSystemFactory();

class FilenameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new FilenameNodeExt( { name }, args );
  }
}

FilenameFactory.INSTANCE = new FilenameFactory();

class GlobalFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new GlobalNodeExt( { name }, args );
  }
}

GlobalFactory.INSTANCE = new GlobalFactory();

class HashFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HashNodeExt( { name }, args );
  }
}

HashFactory.INSTANCE = new HashFactory();

class HashDigestFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HashDigestNodeExt( { name }, args );
  }
}

HashDigestFactory.INSTANCE = new HashDigestFactory();

class HashDigestLengthFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HashDigestLengthNodeExt( { name }, args );
  }
}

HashDigestLengthFactory.INSTANCE = new HashDigestLengthFactory();

class HashFunctionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HashFunctionNodeExt( { name }, args );
  }
}

HashFunctionFactory.INSTANCE = new HashFunctionFactory();

class HashSaltFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HashSaltNodeExt( { name }, args );
  }
}

HashSaltFactory.INSTANCE = new HashSaltFactory();

class HintsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HintsNodeExt( { name }, args );
  }
}

HintsFactory.INSTANCE = new HintsFactory();

class HotUpdateChunkFilenameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HotUpdateChunkFilenameNodeExt( { name }, args );
  }
}

HotUpdateChunkFilenameFactory.INSTANCE = new HotUpdateChunkFilenameFactory();

class HotUpdateFunctionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HotUpdateFunctionNodeExt( { name }, args );
  }
}

HotUpdateFunctionFactory.INSTANCE = new HotUpdateFunctionFactory();

class HotUpdateMainFilenameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new HotUpdateMainFilenameNodeExt( { name }, args );
  }
}

HotUpdateMainFilenameFactory.INSTANCE = new HotUpdateMainFilenameFactory();

class IncludeFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new IncludeNodeExt( { name }, args );
  }
}

IncludeFactory.INSTANCE = new IncludeFactory();

class JsonpFunctionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new JsonpFunctionNodeExt( { name }, args );
  }
}

JsonpFunctionFactory.INSTANCE = new JsonpFunctionFactory();

class LibraryFactory extends BaseFactory {
  getBuilder( parent ) {
    return new LibraryBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new LibraryNodeExt( { name }, args );
  }
}

LibraryFactory.INSTANCE = new LibraryFactory();

class LibraryExportFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new LibraryExportNodeExt( { name }, args );
  }
}

LibraryExportFactory.INSTANCE = new LibraryExportFactory();

class LibraryTargetFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new LibraryTargetNodeExt( { name }, args );
  }
}

LibraryTargetFactory.INSTANCE = new LibraryTargetFactory();

class LoaderFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new LoaderNodeExt( { name }, args );
  }
}

LoaderFactory.INSTANCE = new LoaderFactory();

class MainFieldFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new MainFieldNodeExt( { name }, args );
  }
}

MainFieldFactory.INSTANCE = new MainFieldFactory();

class MainFileFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new MainFileNodeExt( { name }, args );
  }
}

MainFileFactory.INSTANCE = new MainFileFactory();

class MaxAssetSizeFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new MaxAssetSizeNodeExt( { name }, args );
  }
}

MaxAssetSizeFactory.INSTANCE = new MaxAssetSizeFactory();

class MaxEntrypointSizeFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new MaxEntrypointSizeNodeExt( { name }, args );
  }
}

MaxEntrypointSizeFactory.INSTANCE = new MaxEntrypointSizeFactory();

class ModuleFactory extends BaseFactory {
  getBuilder( parent ) {
    return new ModuleBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new ModuleNodeExt( { name }, args );
  }
}

ModuleFactory.INSTANCE = new ModuleFactory();

class ModuleExtensionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ModuleExtensionNodeExt( { name }, args );
  }
}

ModuleExtensionFactory.INSTANCE = new ModuleExtensionFactory();

class ModuleTraceFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ModuleTraceNodeExt( { name }, args );
  }
}

ModuleTraceFactory.INSTANCE = new ModuleTraceFactory();

class ModulesFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ModulesNodeExt( { name }, args );
  }
}

ModulesFactory.INSTANCE = new ModulesFactory();

class ModulesSortFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ModulesSortNodeExt( { name }, args );
  }
}

ModulesSortFactory.INSTANCE = new ModulesSortFactory();

class NameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new NameNodeExt( { name }, args );
  }
}

NameFactory.INSTANCE = new NameFactory();

class NoParseFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new NoParseNodeExt( { name }, args );
  }
}

NoParseFactory.INSTANCE = new NoParseFactory();

class NodeFactory extends BaseFactory {
  getBuilder( parent ) {
    return new NodeBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new NodeNodeExt( { name }, args );
  }
}

NodeFactory.INSTANCE = new NodeFactory();

class NotFactory extends BaseFactory {
  newInstance( builder, name, args ) {
    return new NotNodeExt( { name }, args );
  }
}

NotFactory.INSTANCE = new NotFactory();

class OneOfFactory extends BaseFactory {
  newInstance( builder, name, args ) {
    return new OneOfNodeExt( { name }, args );
  }
}

OneOfFactory.INSTANCE = new OneOfFactory();

class OnlyModuleFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new OnlyModuleNodeExt( { name }, args );
  }
}

OnlyModuleFactory.INSTANCE = new OnlyModuleFactory();

class OptimizationBailoutFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new OptimizationBailoutNodeExt( { name }, args );
  }
}

OptimizationBailoutFactory.INSTANCE = new OptimizationBailoutFactory();

class OptionsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new OptionsNodeExt( { name }, args );
  }
}

OptionsFactory.INSTANCE = new OptionsFactory();

class OrFactory extends BaseFactory {
  newInstance( builder, name, args ) {
    return new OrNodeExt( { name }, args );
  }
}

OrFactory.INSTANCE = new OrFactory();

class OutputFactory extends BaseFactory {
  getBuilder( parent ) {
    return new OutputBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new OutputNodeExt( { name }, args );
  }
}

OutputFactory.INSTANCE = new OutputFactory();

class ParserFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ParserNodeExt( { name }, args );
  }
}

ParserFactory.INSTANCE = new ParserFactory();

class PathFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new PathNodeExt( { name }, args );
  }
}

PathFactory.INSTANCE = new PathFactory();

class PathinfoFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new PathinfoNodeExt( { name }, args );
  }
}

PathinfoFactory.INSTANCE = new PathinfoFactory();

class PerformanceFactory extends BaseFactory {
  getBuilder( parent ) {
    return new PerformanceBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new PerformanceNodeExt( { name }, args );
  }
}

PerformanceFactory.INSTANCE = new PerformanceFactory();

class PluginFactory extends BaseFactory {
  newInstance( builder, name, args ) {
    return new PluginNodeExt( { name }, args );
  }
}

PluginFactory.INSTANCE = new PluginFactory();

class PollFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new PollNodeExt( { name }, args );
  }
}

PollFactory.INSTANCE = new PollFactory();

class ProcessFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ProcessNodeExt( { name }, args );
  }
}

ProcessFactory.INSTANCE = new ProcessFactory();

class ProfileFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ProfileNodeExt( { name }, args );
  }
}

ProfileFactory.INSTANCE = new ProfileFactory();

class ProvidedExportsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ProvidedExportsNodeExt( { name }, args );
  }
}

ProvidedExportsFactory.INSTANCE = new ProvidedExportsFactory();

class PublicPathFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new PublicPathNodeExt( { name }, args );
  }
}

PublicPathFactory.INSTANCE = new PublicPathFactory();

class QueryFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new QueryNodeExt( { name }, args );
  }
}

QueryFactory.INSTANCE = new QueryFactory();

class ReasonsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ReasonsNodeExt( { name }, args );
  }
}

ReasonsFactory.INSTANCE = new ReasonsFactory();

class RecordsInputPathFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new RecordsInputPathNodeExt( { name }, args );
  }
}

RecordsInputPathFactory.INSTANCE = new RecordsInputPathFactory();

class RecordsOutputPathFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new RecordsOutputPathNodeExt( { name }, args );
  }
}

RecordsOutputPathFactory.INSTANCE = new RecordsOutputPathFactory();

class RecordsPathFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new RecordsPathNodeExt( { name }, args );
  }
}

RecordsPathFactory.INSTANCE = new RecordsPathFactory();

class ResolveFactory extends BaseFactory {
  getBuilder( parent ) {
    return new ResolveBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new ResolveNodeExt( { name }, args );
  }
}

ResolveFactory.INSTANCE = new ResolveFactory();

class ResolveLoaderFactory extends BaseFactory {
  getBuilder( parent ) {
    return new ResolveLoaderBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new ResolveLoaderNodeExt( { name }, args );
  }
}

ResolveLoaderFactory.INSTANCE = new ResolveLoaderFactory();

class ResolverFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new ResolverNodeExt( { name }, args );
  }
}

ResolverFactory.INSTANCE = new ResolverFactory();

class RootFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new RootNodeExt( { name }, args );
  }
}

RootFactory.INSTANCE = new RootFactory();

class RuleFactory extends BaseFactory {
  getBuilder( parent ) {
    return new RuleBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new RuleNodeExt( { name }, args );
  }
}

RuleFactory.INSTANCE = new RuleFactory();

class SourceFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new SourceNodeExt( { name }, args );
  }
}

SourceFactory.INSTANCE = new SourceFactory();

class SourceMapFilenameFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new SourceMapFilenameNodeExt( { name }, args );
  }
}

SourceMapFilenameFactory.INSTANCE = new SourceMapFilenameFactory();

class SourcePrefixFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new SourcePrefixNodeExt( { name }, args );
  }
}

SourcePrefixFactory.INSTANCE = new SourcePrefixFactory();

class StatsFactory extends BaseFactory {
  getBuilder( parent ) {
    return new StatsBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new StatsNodeExt( { name }, args );
  }
}

StatsFactory.INSTANCE = new StatsFactory();

class StrictExportPresenceFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new StrictExportPresenceNodeExt( { name }, args );
  }
}

StrictExportPresenceFactory.INSTANCE = new StrictExportPresenceFactory();

class StrictModuleExceptionHandlingFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new StrictModuleExceptionHandlingNodeExt( { name }, args );
  }
}

StrictModuleExceptionHandlingFactory.INSTANCE = new StrictModuleExceptionHandlingFactory();

class StrictThisContextOnImportsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new StrictThisContextOnImportsNodeExt( { name }, args );
  }
}

StrictThisContextOnImportsFactory.INSTANCE = new StrictThisContextOnImportsFactory();

class SymlinksFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new SymlinksNodeExt( { name }, args );
  }
}

SymlinksFactory.INSTANCE = new SymlinksFactory();

class TargetFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new TargetNodeExt( { name }, args );
  }
}

TargetFactory.INSTANCE = new TargetFactory();

class TestFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new TestNodeExt( { name }, args );
  }
}

TestFactory.INSTANCE = new TestFactory();

class TimingsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new TimingsNodeExt( { name }, args );
  }
}

TimingsFactory.INSTANCE = new TimingsFactory();

class UmdNamedDefineFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UmdNamedDefineNodeExt( { name }, args );
  }
}

UmdNamedDefineFactory.INSTANCE = new UmdNamedDefineFactory();

class UnknownContextCriticalFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UnknownContextCriticalNodeExt( { name }, args );
  }
}

UnknownContextCriticalFactory.INSTANCE = new UnknownContextCriticalFactory();

class UnknownContextRecursiveFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UnknownContextRecursiveNodeExt( { name }, args );
  }
}

UnknownContextRecursiveFactory.INSTANCE = new UnknownContextRecursiveFactory();

class UnknownContextRegExpFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UnknownContextRegExpNodeExt( { name }, args );
  }
}

UnknownContextRegExpFactory.INSTANCE = new UnknownContextRegExpFactory();

class UnknownContextRequestFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UnknownContextRequestNodeExt( { name }, args );
  }
}

UnknownContextRequestFactory.INSTANCE = new UnknownContextRequestFactory();

class UnsafeCacheFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UnsafeCacheNodeExt( { name }, args );
  }
}

UnsafeCacheFactory.INSTANCE = new UnsafeCacheFactory();

class UseItemFactory extends BaseFactory {
  getBuilder( parent ) {
    return new UseItemBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new UseItemNodeExt( { name }, args );
  }
}

UseItemFactory.INSTANCE = new UseItemFactory();

class UseSyncFileSystemCallsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UseSyncFileSystemCallsNodeExt( { name }, args );
  }
}

UseSyncFileSystemCallsFactory.INSTANCE = new UseSyncFileSystemCallsFactory();

class UsedExportsFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new UsedExportsNodeExt( { name }, args );
  }
}

UsedExportsFactory.INSTANCE = new UsedExportsFactory();

class VersionFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new VersionNodeExt( { name }, args );
  }
}

VersionFactory.INSTANCE = new VersionFactory();

class WarningsFilterFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new WarningsFilterNodeExt( { name }, args );
  }
}

WarningsFilterFactory.INSTANCE = new WarningsFilterFactory();

class WatchFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new WatchNodeExt( { name }, args );
  }
}

WatchFactory.INSTANCE = new WatchFactory();

class WatchOptionsFactory extends BaseFactory {
  getBuilder( parent ) {
    return new WatchOptionsBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new WatchOptionsNodeExt( { name }, args );
  }
}

WatchOptionsFactory.INSTANCE = new WatchOptionsFactory();

class WebpackFactory extends BaseFactory {
  getBuilder( parent ) {
    return new WebpackBuilder( parent );
  }

  newInstance( builder, name, args ) {
    return new WebpackNodeExt( { name }, args );
  }
}

WebpackFactory.INSTANCE = new WebpackFactory();

class WrappedContextCriticalFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new WrappedContextCriticalNodeExt( { name }, args );
  }
}

WrappedContextCriticalFactory.INSTANCE = new WrappedContextCriticalFactory();

class WrappedContextRecursiveFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new WrappedContextRecursiveNodeExt( { name }, args );
  }
}

WrappedContextRecursiveFactory.INSTANCE = new WrappedContextRecursiveFactory();

class WrappedContextRegExpFactory extends BaseFactory {
  isLeaf() {
    return true;
  }

  newInstance( builder, name, args ) {
    return new WrappedContextRegExpNodeExt( { name }, args );
  }
}

WrappedContextRegExpFactory.INSTANCE = new WrappedContextRegExpFactory();

class AliasBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'name', NameFactory.INSTANCE );
    this.registerFactory( 'onlyModule', OnlyModuleFactory.INSTANCE );
  }
}

class AuxiliaryCommentBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'amd', AmdFactory.INSTANCE );
    this.registerFactory( 'commonjs', CommonjsFactory.INSTANCE );
    this.registerFactory( 'commonjs2', Commonjs2Factory.INSTANCE );
    this.registerFactory( 'root', RootFactory.INSTANCE );
  }
}

class ConditionBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'and', AndFactory.INSTANCE );
    this.registerFactory( 'exclude', ConditionFactory.INSTANCE );
    this.registerFactory( 'include', ConditionFactory.INSTANCE );
    this.registerFactory( 'not', NotFactory.INSTANCE );
    this.registerFactory( 'or', OrFactory.INSTANCE );
    this.registerFactory( 'test', ConditionFactory.INSTANCE );
  }
}

class DevtoolLineToLineBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'exclude', ExcludeFactory.INSTANCE );
    this.registerFactory( 'include', IncludeFactory.INSTANCE );
    this.registerFactory( 'test', TestFactory.INSTANCE );
  }
}

class LibraryBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'root', RootFactory.INSTANCE );
    this.registerFactory( 'amd', AmdFactory.INSTANCE );
    this.registerFactory( 'commonjs', CommonjsFactory.INSTANCE );
  }
}

class ModuleBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'exprContextCritical', ExprContextCriticalFactory.INSTANCE );
    this.registerFactory( 'exprContextRecursive', ExprContextRecursiveFactory.INSTANCE );
    this.registerFactory( 'exprContextRegExp', ExprContextRegExpFactory.INSTANCE );
    this.registerFactory( 'exprContextRequest', ExprContextRequestFactory.INSTANCE );
    this.registerFactory( 'loader', LoaderFactory.INSTANCE );
    this.registerFactory( 'noParse', NoParseFactory.INSTANCE );
    this.registerFactory( 'rule', RuleFactory.INSTANCE );
    this.registerFactory( 'unknownContextCritical', UnknownContextCriticalFactory.INSTANCE );
    this.registerFactory( 'unknownContextRecursive', UnknownContextRecursiveFactory.INSTANCE );
    this.registerFactory( 'unknownContextRegExp', UnknownContextRegExpFactory.INSTANCE );
    this.registerFactory( 'unknownContextRequest', UnknownContextRequestFactory.INSTANCE );
    this.registerFactory( 'unsafeCache', UnsafeCacheFactory.INSTANCE );
    this.registerFactory( 'wrappedContextCritical', WrappedContextCriticalFactory.INSTANCE );
    this.registerFactory( 'wrappedContextRecursive', WrappedContextRecursiveFactory.INSTANCE );
    this.registerFactory( 'wrappedContextRegExp', WrappedContextRegExpFactory.INSTANCE );
    this.registerFactory( 'strictExportPresence', StrictExportPresenceFactory.INSTANCE );
    this.registerFactory( 'strictThisContextOnImports', StrictThisContextOnImportsFactory.INSTANCE );
  }
}

class NodeBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'Buffer', BufferFactory.INSTANCE );
    this.registerFactory( '__dirname', DirnameFactory.INSTANCE );
    this.registerFactory( '__filename', FilenameFactory.INSTANCE );
    this.registerFactory( 'console', ConsoleFactory.INSTANCE );
    this.registerFactory( 'global', GlobalFactory.INSTANCE );
    this.registerFactory( 'process', ProcessFactory.INSTANCE );
  }
}

class OutputBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'auxiliaryComment', AuxiliaryCommentFactory.INSTANCE );
    this.registerFactory( 'chunkFilename', ChunkFilenameFactory.INSTANCE );
    this.registerFactory( 'crossOriginLoading', CrossOriginLoadingFactory.INSTANCE );
    this.registerFactory( 'chunkLoadTimeout', ChunkLoadTimeoutFactory.INSTANCE );
    this.registerFactory( 'devtoolFallbackModuleFilenameTemplate', DevtoolFallbackModuleFilenameTemplateFactory.INSTANCE );
    this.registerFactory( 'devtoolLineToLine', DevtoolLineToLineFactory.INSTANCE );
    this.registerFactory( 'devtoolModuleFilenameTemplate', DevtoolModuleFilenameTemplateFactory.INSTANCE );
    this.registerFactory( 'filename', FilenameFactory.INSTANCE );
    this.registerFactory( 'hashDigest', HashDigestFactory.INSTANCE );
    this.registerFactory( 'hashDigestLength', HashDigestLengthFactory.INSTANCE );
    this.registerFactory( 'hashFunction', HashFunctionFactory.INSTANCE );
    this.registerFactory( 'hashSalt', HashSaltFactory.INSTANCE );
    this.registerFactory( 'hotUpdateChunkFilename', HotUpdateChunkFilenameFactory.INSTANCE );
    this.registerFactory( 'hotUpdateFunction', HotUpdateFunctionFactory.INSTANCE );
    this.registerFactory( 'hotUpdateMainFilename', HotUpdateMainFilenameFactory.INSTANCE );
    this.registerFactory( 'jsonpFunction', JsonpFunctionFactory.INSTANCE );
    this.registerFactory( 'library', LibraryFactory.INSTANCE );
    this.registerFactory( 'libraryTarget', LibraryTargetFactory.INSTANCE );
    this.registerFactory( 'libraryExport', LibraryExportFactory.INSTANCE );
    this.registerFactory( 'path$', PathFactory.INSTANCE );
    this.registerFactory( 'pathinfo', PathinfoFactory.INSTANCE );
    this.registerFactory( 'publicPath', PublicPathFactory.INSTANCE );
    this.registerFactory( 'sourceMapFilename', SourceMapFilenameFactory.INSTANCE );
    this.registerFactory( 'sourcePrefix', SourcePrefixFactory.INSTANCE );
    this.registerFactory( 'strictModuleExceptionHandling', StrictModuleExceptionHandlingFactory.INSTANCE );
    this.registerFactory( 'umdNamedDefine', UmdNamedDefineFactory.INSTANCE );
  }
}


class DevServerBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'assetFilter', AssetFilterFactory.INSTANCE );
    this.registerFactory( 'hints', HintsFactory.INSTANCE );
    this.registerFactory( 'maxEntrypointSize', MaxEntrypointSizeFactory.INSTANCE );
    this.registerFactory( 'maxAssetSize', MaxAssetSizeFactory.INSTANCE );
  }
}

class PerformanceBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'assetFilter', AssetFilterFactory.INSTANCE );
    this.registerFactory( 'hints', HintsFactory.INSTANCE );
    this.registerFactory( 'maxEntrypointSize', MaxEntrypointSizeFactory.INSTANCE );
    this.registerFactory( 'maxAssetSize', MaxAssetSizeFactory.INSTANCE );
  }
}

class ResolveBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'alias', AliasFactory.INSTANCE );
    this.registerFactory( 'aliasField', AliasFieldFactory.INSTANCE );
    this.registerFactory( 'cachePredicate', CachePredicateFactory.INSTANCE );
    this.registerFactory( 'cacheWithContext', CacheWithContextFactory.INSTANCE );
    this.registerFactory( 'descriptionFile', DescriptionFileFactory.INSTANCE );
    this.registerFactory( 'enforceExtension', EnforceExtensionFactory.INSTANCE );
    this.registerFactory( 'enforceModuleExtension', EnforceModuleExtensionFactory.INSTANCE );
    this.registerFactory( 'extensions', ExtensionFactory.INSTANCE );
    this.registerFactory( 'fileSystem', FileSystemFactory.INSTANCE );
    this.registerFactory( 'mainField', MainFieldFactory.INSTANCE );
    this.registerFactory( 'mainFile', MainFileFactory.INSTANCE );
    this.registerFactory( 'moduleExtension', ModuleExtensionFactory.INSTANCE );
    this.registerFactory( 'module$', ModuleFactory.INSTANCE );
    this.registerFactory( 'plugin', PluginFactory.INSTANCE );
    this.registerFactory( 'resolver', ResolverFactory.INSTANCE );
    this.registerFactory( 'symlinks', SymlinksFactory.INSTANCE );
    this.registerFactory( 'unsafeCache', UnsafeCacheFactory.INSTANCE );
    this.registerFactory( 'useSyncFileSystemCalls', UseSyncFileSystemCallsFactory.INSTANCE );
  }
}

class ResolveLoaderBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'alias', AliasFactory.INSTANCE );
    this.registerFactory( 'aliasField', AliasFieldFactory.INSTANCE );
    this.registerFactory( 'cachePredicate', CachePredicateFactory.INSTANCE );
    this.registerFactory( 'cacheWithContext', CacheWithContextFactory.INSTANCE );
    this.registerFactory( 'descriptionFile', DescriptionFileFactory.INSTANCE );
    this.registerFactory( 'enforceExtension', EnforceExtensionFactory.INSTANCE );
    this.registerFactory( 'enforceModuleExtension', EnforceModuleExtensionFactory.INSTANCE );
    this.registerFactory( 'extension', ExtensionFactory.INSTANCE );
    this.registerFactory( 'fileSystem', FileSystemFactory.INSTANCE );
    this.registerFactory( 'mainField', MainFieldFactory.INSTANCE );
    this.registerFactory( 'mainFile', MainFileFactory.INSTANCE );
    this.registerFactory( 'moduleExtension', ModuleExtensionFactory.INSTANCE );
    this.registerFactory( 'module$', ModuleFactory.INSTANCE );
    this.registerFactory( 'plugin', PluginFactory.INSTANCE );
    this.registerFactory( 'resolver', ResolverFactory.INSTANCE );
    this.registerFactory( 'symlinks', SymlinksFactory.INSTANCE );
    this.registerFactory( 'unsafeCache', UnsafeCacheFactory.INSTANCE );
    this.registerFactory( 'useSyncFileSystemCalls', UseSyncFileSystemCallsFactory.INSTANCE );
  }
}

class RuleBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'enforce', EnforceFactory.INSTANCE );
    this.registerFactory( 'exclude', ConditionFactory.INSTANCE );
    this.registerFactory( 'include', ConditionFactory.INSTANCE );
    this.registerFactory( 'issuer', ConditionFactory.INSTANCE );
    this.registerFactory( 'loader', UseItemFactory.INSTANCE );
    this.registerFactory( 'loaders', UseItemFactory.INSTANCE );
    this.registerFactory( 'oneOf', OneOfFactory.INSTANCE );
    this.registerFactory( 'options', OptionsFactory.INSTANCE );
    this.registerFactory( 'parser', ParserFactory.INSTANCE );
    this.registerFactory( 'query', QueryFactory.INSTANCE );
    this.registerFactory( 'resource', ConditionFactory.INSTANCE );
    this.registerFactory( 'resourceQuery', ConditionFactory.INSTANCE );
    this.registerFactory( 'compiler', ConditionFactory.INSTANCE );
    this.registerFactory( 'test', ConditionFactory.INSTANCE );
    this.registerFactory( 'use', UseItemFactory.INSTANCE );
  }
}

class StatsBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'context', ContextFactory.INSTANCE );
    this.registerFactory( 'hash', HashFactory.INSTANCE );
    this.registerFactory( 'version', VersionFactory.INSTANCE );
    this.registerFactory( 'timings', TimingsFactory.INSTANCE );
    this.registerFactory( 'assets', AssetsFactory.INSTANCE );
    this.registerFactory( 'chunks', ChunksFactory.INSTANCE );
    this.registerFactory( 'chunkModules', ChunkModulesFactory.INSTANCE );
    this.registerFactory( 'modules', ModulesFactory.INSTANCE );
    this.registerFactory( 'children', ChildrenFactory.INSTANCE );
    this.registerFactory( 'cached', CachedFactory.INSTANCE );
    this.registerFactory( 'reasons', ReasonsFactory.INSTANCE );
    this.registerFactory( 'source', SourceFactory.INSTANCE );
    this.registerFactory( 'warningsFilter', WarningsFilterFactory.INSTANCE );
    this.registerFactory( 'errorDetails', ErrorDetailsFactory.INSTANCE );
    this.registerFactory( 'chunkOrigins', ChunkOriginsFactory.INSTANCE );
    this.registerFactory( 'modulesSort', ModulesSortFactory.INSTANCE );
    this.registerFactory( 'moduleTrace', ModuleTraceFactory.INSTANCE );
    this.registerFactory( 'chunksSort', ChunksSortFactory.INSTANCE );
    this.registerFactory( 'assetsSort', AssetsSortFactory.INSTANCE );
    this.registerFactory( 'providedExports', ProvidedExportsFactory.INSTANCE );
    this.registerFactory( 'usedExports', UsedExportsFactory.INSTANCE );
    this.registerFactory( 'optimizationBailout', OptimizationBailoutFactory.INSTANCE );
  }
}

class UseItemBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'loader', LoaderFactory.INSTANCE );
    this.registerFactory( 'options', OptionsFactory.INSTANCE );
    this.registerFactory( 'query', QueryFactory.INSTANCE );
  }
}

class WatchOptionsBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'aggregateTimeout', AggregateTimeoutFactory.INSTANCE );
    this.registerFactory( 'poll', PollFactory.INSTANCE );
  }
}

class WebpackBuilder extends JsDsl {
  constructor( parent ) {
    super( parent );
    this.registerFactory( 'amd', AmdFactory.INSTANCE );
    this.registerFactory( 'bail', BailFactory.INSTANCE );
    this.registerFactory( 'cache', CacheFactory.INSTANCE );
    this.registerFactory( 'context', ContextFactory.INSTANCE );
    this.registerFactory( 'dependency', DependencyFactory.INSTANCE );
    this.registerFactory( 'devServer', DevServerFactory.INSTANCE );
    this.registerFactory( 'devtool', DevtoolFactory.INSTANCE );
    this.registerFactory( 'entry', EntryFactory.INSTANCE );
    this.registerFactory( 'external', ExternalFactory.INSTANCE );
    this.registerFactory( 'loader', LoaderFactory.INSTANCE );
    this.registerFactory( 'module$', ModuleFactory.INSTANCE );
    this.registerFactory( 'name', NameFactory.INSTANCE );
    this.registerFactory( 'node', NodeFactory.INSTANCE );
    this.registerFactory( 'output', OutputFactory.INSTANCE );
    this.registerFactory( 'performance', PerformanceFactory.INSTANCE );
    this.registerFactory( 'plugin', PluginFactory.INSTANCE );
    this.registerFactory( 'profile', ProfileFactory.INSTANCE );
    this.registerFactory( 'recordsInputPath', RecordsInputPathFactory.INSTANCE );
    this.registerFactory( 'recordsOutputPath', RecordsOutputPathFactory.INSTANCE );
    this.registerFactory( 'recordsPath', RecordsPathFactory.INSTANCE );
    this.registerFactory( 'resolve', ResolveFactory.INSTANCE );
    this.registerFactory( 'resolveLoader', ResolveLoaderFactory.INSTANCE );
    this.registerFactory( 'stats', StatsFactory.INSTANCE );
    this.registerFactory( 'target', TargetFactory.INSTANCE );
    this.registerFactory( 'watch', WatchFactory.INSTANCE );
    this.registerFactory( 'watchOptions', WatchOptionsFactory.INSTANCE );
  }
}

class RootBuilder extends JsDsl {
  constructor() {
    super();
    this.registerFactory( 'webpackConfig', new WebpackFactory() );
  }
}

module.exports = RootBuilder;
