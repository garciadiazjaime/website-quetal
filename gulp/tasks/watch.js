var gulp = require('gulp'),
    watch = require('gulp-watch');
 
function watchTask(){
	return gulp.watch('src/**/*.js', ['jsx', 'reactify']);
}

gulp.task('watch', ['build'], watchTask);