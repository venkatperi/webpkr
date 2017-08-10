const gulp = require( 'gulp' );
const gulpDocumentation = require( 'gulp-documentation' );
const mocha = require( 'gulp-mocha' );
const jshint = require( 'gulp-jshint' )
const istanbul = require( 'gulp-istanbul' )
const npmcheck = require( 'gulp-npm-check' );
const path = require( 'path' );
const arrayp = require( 'arrayp' );
const promisify = require( 'util' ).promisify;
const exec = promisify( require( 'child_process' ).exec );
require( 'gulp-release-it' )( gulp );

const tests = ['simple', 'base', 'vendor', 'multi-env', 'fullSchema'];

const srcDirs = {
  js: ['index.js', "lib/**/*.js"],
  test: "test/*.{js,coffee}",
  doc: "doc"
}

gulp.task( 'pre-test', () =>
  arrayp.chain( tests.map( ( t ) =>
    exec( 'npm install', { cwd: path.join( __dirname, `test/${t}` ) } )
      .then( ( res ) => console.log( `test/${t}\n`, res.stdout ) )
  ) )
)

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

gulp.task( 'test', ['pre-test'], () =>
    gulp.src( srcDirs.test, { read: false } )
      .pipe( mocha() )
  //.pipe( istanbul.writeReports() )
);

gulp.task( 'coverage', () =>
  gulp.src( srcDirs.js )
    .pipe( istanbul() )
    .pipe( istanbul.hookRequire() )
);
