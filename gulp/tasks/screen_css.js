var gulp = require("gulp");
var compass = require('gulp-compass');


function screenCssTask(){
	return gulp.src([
		'./compass_components/**/*.sass'
	])
	.pipe(compass({
      config_file: './config.rb',
      css: 'public',
      sass: 'compass_components'
    }))
    .pipe(gulp.dest('public/'));
}

gulp.task('screen:css', screenCssTask);
