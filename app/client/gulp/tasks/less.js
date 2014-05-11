var less      = require('gulp-less');
var gulp         = require('gulp');
var notify       = require('gulp-notify');
var handleErrors = require('../util/handleErrors');

gulp.task('less', function() {
	return gulp.src('./src/less/style.less')
		.pipe(less({
	      paths: ['./src/less/style.less']
	    }))
	    .pipe(gulp.dest('./build/css'))
		.on('error', handleErrors);
});
