module.exports = ( config ) => {
  config.set( {
    basePath: '',
    frameworks: ['mocha', 'chai', 'fixture'],
    files: [
      'dist/index.html',
      'dist/vendor-bundle.js',
      'test/**/*.js',
    ],

    preprocessors: {
      '**/*.html': ['html2js'],
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['Chrome', 'ChromeHeadless', 'MyHeadlessChrome'],
    customLaunchers: {
      MyHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions',
          '--no-first-run', '--disable-background-networking',
          '--remote-debugging-port=9223'],
      },
    },

    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
  } )
}

