var gulp = require('gulp'),
    gulpJade = require('gulp-jade');
    gulpSass = require('gulp-sass');

gulp.task('jade', function () {
  return gulp.src('views/*.jade')
    .pipe(gulpJade())
    .pipe(gulp.dest('builds/development/views'));
});

gulp.task('sass', function () {
  return gulp.src('assets/styles/*.scss')
    .pipe(gulpSass({ sourceComments: 'map' }))
    .pipe(gulp.dest('builds/development/css')); 
});

gulp.task('watch', function () {
  gulp.watch('/views/*.jade', ['jade']);
  gulp.watch('/assets/styles/*.scss', ['sass']);
});

gulp.task('default', ['jade', 'sass', 'watch']);

