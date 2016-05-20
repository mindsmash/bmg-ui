var gulp = require('gulp');
var replace = require('gulp-replace');
var mainBowerFiles = require('gulp-main-bower-files');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');

// ----------------------------------------------------------------------------------------------------

var REMOVE_LINE_TOKEN = /.*@@gulp-remove-line.*/g;

// ----------------------------------------------------------------------------------------------------

/**
 * Copies the bmg-ui kit source SCSS files into the 'dist' folder. Remember, developers don't want to use a
 * fully compiled version of bmg-ui. They want to integrate bmg-ui into their own build process so that
 * they can change variables.
 */
gulp.task('copy:styles', function () {
  gulp.src('source/kit/stylesheets/**/*')
      .pipe(replace(REMOVE_LINE_TOKEN, ''))
      .pipe(replace('../../bower_components', '../..'))
      .pipe(gulp.dest('dist/stylesheets/'));

  return gulp.src('source/kit/components/**/*.scss')
      .pipe(gulp.dest('dist/components/'));
});

// ----------------------------------------------------------------------------------------------------

/**
 * Copies and flattens fonts to docs/fonts
 */
gulp.task('copy:fonts', function(){
  return gulp.src('bower.json')
      .pipe(mainBowerFiles())
      .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(flatten())
      .pipe(gulp.dest('docs/fonts'));
});

// ----------------------------------------------------------------------------------------------------

/**
 * Copies images
 */
gulp.task('copy:images', function(){
    return gulp.src('source/kit/images/*')
        .pipe(gulp.dest('docs/images'));
});