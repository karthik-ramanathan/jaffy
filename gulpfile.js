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
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-css-iconfont');
var gulpSequence = require('gulp-sequence');

function log(str){
	return "---> " + str;
}

gulp.task('clean',function(){
   del(['bin/**', '!bin', '!bin/release', '!bin/release/plugins']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n '));
   });
});


 
gulp.task('pre-build-icon',['clean'], function(){
  gulp.src(['src/icons/svg/*.svg'])
    .pipe(iconfontCss({
      fontName: 'jaffy',
      path: 'src/icons/config/jaffy.template.less',
      targetPath: '../icons.less',
      fontPath: '../fonts/',
	  cssSelector: '.i'
    }))
    .pipe(iconfont({
	  formats: ['ttf', 'eot', 'woff', 'woff2' ,'svg'],
      fontName: 'jaffy',
	  normalize: true
     }))
    .pipe(gulp.dest('src/icons/fonts'));
});

gulp.task('plugins-js', function(){
  return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: '', suffix: '.min'}))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release/plugins'))
});
gulp.task('plugins-css', function(){
  return gulp.src('src/*/*.less')
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: '', suffix: '.min'}))
    .pipe(less())
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release/plugins'))
});
gulp.task('plugins-font', function(){
  return gulp.src('src/*/fonts/*.{ttf,eot,woff,woff2,svg}')
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: ''}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release/fonts'))
});
gulp.task('build-js', function(){
  return gulp.src(['bin/release/plugins/*.js','!bin/release/plugins/_*.js'])
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: '', suffix: '.min'}))
    .pipe(concat('jaffy.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release'))
});
gulp.task('build-css', function(){
  return gulp.src(['bin/release/plugins/*.css','!bin/release/plugins/_*.css'])
    .pipe(plumber())
    .pipe(print(log))
    .pipe(rename({dirname: '', suffix: '.min'}))
    .pipe(concat('jaffy.min.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('bin/release'))
});

//gulp.task('default', gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f'))
gulp.task('pre-build', gulpSequence(['pre-build-icon']));
gulp.task('build-all', gulpSequence('pre-build', 'clean',['plugins-js','plugins-css'],'plugins-font', ['build-js','build-css']));

gulp.task('default', gulpSequence('build-all'));