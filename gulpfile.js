const gulp = require( 'gulp' );
const gulpDocumentation = require( 'gulp-documentation' );
const mocha = require( 'gulp-mocha' );
const jshint = require( 'gulp-jshint' )
const istanbul = require( 'gulp-istanbul' )
const npmcheck = require( 'gulp-npm-check' );
require( 'gulp-release-it' )( gulp );

const srcDirs = {
  js: [ 'index.js', "lib/**/*.js" ],
  test: "test/*.{js,coffee}",
  doc: "doc"
}

gulp.task( 'deps', function ( cb ) {
  npmcheck( cb );
} );

gulp.task( 'docs', function () {
  return gulp.src( srcDirs.js )
    .pipe( gulpDocumentation( 'md' ) )
    .pipe( gulp.dest( 'doc/' ) );
} );

gulp.task( 'lint', function () {
  return gulp.src( srcDirs.js )
    .pipe( jshint( { esversion: 6, asi: true } ) )
    .pipe( jshint.reporter( 'default' ) )
    .pipe( jshint.reporter( 'fail' ) );
} );

gulp.task( 'test', [ 'coverage' ], () =>
  gulp.src( srcDirs.test, { read: false } )
  .pipe( mocha() )
  .pipe( istanbul.writeReports() )
);

gulp.task( 'coverage', () =>
  gulp.src( srcDirs.js )
  .pipe( istanbul() )
  .pipe( istanbul.hookRequire() )
);
