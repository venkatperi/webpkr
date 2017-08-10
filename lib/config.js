const convict = require( 'convict' );

const config = convict( {
  defaults: {
    environments: {
      doc: 'The app environments',
      format: Array,
      default: ['development', 'production', 'testing', 'staging'],
    },
    buildDir: {
      doc: 'the output dir',
      format: String,
      default: 'build',
    },
    publicPath: {
      format: String,
      default: '/',
    },
    srcDirs: {
      format: String,
      default: JSON.stringify( {
        js: 'srcs',
        css: 'css',
      } ),
    },
    env: {
      doc: 'env inherited from webpack cli',
      format: '*',
      default: {},
    },
    configFile: {
      doc: 'default webpack config start file',
      format: String,
      default: './webpkr',
    },
  },
  plugins: {
    env: {
      environments: {
        doc: 'The app environments',
        format: Array,
        default: ['development', 'production', 'testing', 'staging'],
      },
    },
  }
} );

// var env = config.get( 'env' );

config.validate( { allowed: 'strict' } );

module.exports = config;
