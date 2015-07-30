var gulp = require("gulp"),
	concat = require('gulp-concat');
	// uglify = require('gulp-uglify');

function vendorCssTask(){
	return gulp.src([
		'./bower_components/bootstrap/dist/css/bootstrap.css'
	])
	// .pipe(uglify())
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest('public'));
}

gulp.task('vendor:css', vendorCssTask);
