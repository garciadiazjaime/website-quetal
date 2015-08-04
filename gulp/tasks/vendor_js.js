var gulp = require("gulp");

function vendorJSTask(){
	var concat = require('gulp-concat');
    // uglify = require('gulp-uglify');
    return gulp.src([
            'node_modules/react/dist/react-with-addons.js',
            'node_modules/react-bootstrap/amd/react-bootstrap.js'
        ])
        // .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public'));
}

gulp.task('vendor:js', vendorJSTask);
