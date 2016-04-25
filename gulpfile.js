'use-strict';

var gulp      = require('gulp'),
  sass        = require('gulp-sass'),
	clean       = require('gulp-clean'),
	browserSync	= require('browser-sync').create(),
	runSequence = require('run-sequence'),
  concat      = require('gulp-concat'),
  merge       = require('merge-stream'),
  babel       = require('gulp-babel');


var paths = {
	html: [
		"src/*.html"
	],
	sass: [
		"src/sass/**/*.scss"
	],
  js:[
  ]
}

gulp.task('html', function(){
	return gulp.src(paths.html)
		.pipe(gulp.dest("dist"));
});

gulp.task('compileES6', function(){
  return gulp.src(paths.js)
    .pipe(babel())
    .pipe(gulp.dest('src/assets/js/laced/dist'));
});

gulp.task('concatJS', function(){
  return gulp.src(paths.js)
    .pipe(concat('laced.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('style', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('laced.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['js']).on('change', browserSync.reload);
  gulp.watch(paths.sass, ['style']).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
  browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});

// Clean build folder
gulp.task('clean', function(){
	return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('serve', function(callback) {
  runSequence('clean',
              ['style', 'html'],
              'watch',
              'browser-sync',
              callback);
});

gulp.task('default', ['serve']);