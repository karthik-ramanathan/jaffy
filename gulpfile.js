var gulp         = require('gulp');
//var babel        = require('gulp-babel');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var less = require('gulp-less');
var del = require('del');
var path = require('path');
var plumber = require('gulp-plumber');
var print = require('gulp-print');
var gulpif = require('gulp-if');
var watch = require('gulp-watch');


function log(str){
	return "---> " + str;
}

gulp.task('clean',function(){
   del(['bin/**', '!bin', '!bin/release', '!bin/release/plugins']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n '));
   });
});

gulp.task('plugins', ['clean'], function(){
  return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: '', suffix: '.min'}))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release/plugins'))
});

gulp.task('build', ['plugins'], function(){
  return gulp.src(['bin/release/plugins/*.js','!bin/release/plugins/_*.js'])
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: '', suffix: '.min'}))
    .pipe(concat('jaffy.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release'))
});

gulp.task('default', ['build' ]);
