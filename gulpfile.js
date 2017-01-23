var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('css', function(){
  return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('bin/css'))
});

gulp.task('default', ['css' ]);