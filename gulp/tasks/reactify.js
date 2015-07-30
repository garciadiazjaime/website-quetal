var gulp = require('gulp');
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    literalify = require('literalify');

function reactifyTask(){
    return browserify()
        .require('./src/client.js', {expose: 'myApp'}, reactify)
        .transform({global: true}, 
            literalify.configure(
            {
            global: true,
            react: 'window.React'
            })
        )
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public'));
    }

gulp.task('reactify', reactifyTask)
