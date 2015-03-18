var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    changed = require('gulp-changed'),
    minifyHTML = require('gulp-minify-html'),
    run = require('gulp-run');

gulp.task('lint', function() {
    return gulp.src('./*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

gulp.task('html', function() {
    var htmlSrc = './chat/views/*.html',
        htmlDst = './chat/views/min';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDst));
});

gulp.task('start', function() {
   run('mongod').exec();
   run('nodemon api/server.js').exec();
});

gulp.task('default', ['lint']);
