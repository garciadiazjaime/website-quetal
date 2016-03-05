var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
gulp.task('jsx', function () {
return gulp.src('src/**/*.js')
    // .pipe(concat('bundle.js'))
    .pipe(react())
    .pipe(gulp.dest('build'));
});
