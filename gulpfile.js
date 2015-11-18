"use strict";

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'), // js and css
    rename = require('gulp-rename'),
    batch = require('gulp-batch'),
    browserify = require('gulp-browserify'), // browserify
    reactify = require('reactify'),
    uglifycss = require('gulp-uglifycss'),
    karma = require('karma');


// Concatenate, Browserify & Minify JS
gulp.task('scripts', function() {
    return browserify('./client-dev/js/app.js').bundle()
        .pipe(source('app.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./build/js/'));
});


// Concatenate, Backbone, React, Browserify & Minify JS
gulp.task('js', function() {
    gulp.src('./client-dev/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug: true,
            transform: [reactify]
        }))
        //.pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./build/js/'))
});


// Concat and uglify css
gulp.task('css', function(){
    return gulp.src(['./client-dev/css/reset.css', './client-dev/css/main.css', './client-dev/css/react-modal.css'])
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(rename('main.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./build/css/'));
});


// Run tests
gulp.task('test', function () {
  return karma.server.start({
    configFile: __dirname+'/karma.conf.js'
  });
});


// build task
gulp.task('build', function () {
	gulp.start(['css', 'js']);
});
