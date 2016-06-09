var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var includer = require('gulp-htmlincluder');
var connect = require ('gulp-connect');
var livereload = require ('gulp-livereload');
var cleanCss = require('gulp-clean-css');
var autopref = require('gulp-autoprefixer');

gulp.task ('missionZero', function(){
	connect.server({
		root: 'build/',
		livereload: true
	});
});

gulp.task('missionOne', function(){
	gulp.src('dev/css/*.css')
		.pipe(concatCss('style.css'))
		.pipe(autopref({
			browsers:['last 10 version'],
			cascade: false
		}))
		.pipe(cleanCss())
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});

gulp.task('missionTwo', function(){
	gulp.src('dev/html/**/*.html')
		.pipe(includer())
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('missionThree', function(){
	gulp.src('dev/img/*.*').pipe(gulp.dest('build/img/'));
});

gulp.task('default', function(){
	gulp.start('missionOne', 'missionTwo', 'missionZero', 'missionThree');

	gulp.watch(['dev/css/*.css'], function(){
		gulp.start('missionOne');
	});	
	gulp.watch(['dev/html/**/*.html'], function(){
		gulp.start('missionTwo');
	});
	gulp.watch(['dev/img/*.*'], function(){
		gulp.start('missionThree');
	});	
});


