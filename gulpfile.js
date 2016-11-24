
/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    include = require("gulp-include");
 
gulp.task("angular", function() {
  return gulp.src("node_modules/angular/angular.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

gulp.task("angular-resource", function() {
  return gulp.src("node_modules/angular-resource/angular-resource.min.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

gulp.task("moment", function() {
  return gulp.src("node_modules/moment/min/moment.min.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

gulp.task("angular-route", function() {
  return gulp.src("node_modules/angular-route/angular-route.min.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

gulp.task("angular-cookies", function() {
  return gulp.src("node_modules/angular-cookies/angular-cookies.min.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

gulp.task("jquery", function() {
  return gulp.src("node_modules/jquery/dist/jquery.min.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

gulp.task("md5", function() {
  return gulp.src("node_modules/blueimp-md5/js/md5.js")
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest("public/js"));
});

// Styles
gulp.task('styles', function() {
  return sass('assets/css/**/*.scss', { style: 'expanded' })
    .pipe(concat('main.css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['public/css', 'public/js', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'images', 'angular', 'angular-route', 'angular-resource', 'angular-cookies', 'md5','moment', 'jquery', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets/css/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('assets/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('assets/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);

});