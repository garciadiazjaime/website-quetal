var gulp = require('gulp');
gulp.task('delete', function(callback) {
	var del    = require('del');
    del(['build/**/*','public/*.js', 'public/*.css'], callback);
});
