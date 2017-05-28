var gulp = require('gulp');
var less = require('gulp-uglify');

gulp.task('plugins', function(){
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('bin/release/plugins'));
});

gulp.task('default', ['plugins' ]);
