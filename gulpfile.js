var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    autoprefix = require('gulp-autoprefixer')
    notify = require("gulp-notify")
    bower = require('gulp-bower');
var plugins = require('gulp-load-plugins');
var panini = require('panini');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
// Load all Gulp plugins into one variable
const $ = plugins();
var config = {
    sassPath: './src/assets/scss',
    bowerDir: './bower_components'
}
gulp.task('default', ['serve']);
gulp.task('serve', ['build','sass'], function() {
    browserSync.init({
        server: "./src/build"
    });
    gulp.watch("src/assets/scss/**/*.scss", ['sass']);
    gulp.watch(['src/pages/**/*.html'], ['build']);
    // gulp.watch(['src/partials/**/*.html'], ['pages']);
});
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});
gulp.watch(['./src/{layouts,partials,helpers,data}/**/*'], ['build','pages']);
gulp.task('pages', function() {
    panini.refresh();
    browserSync.reload();
    // return gulp.src('src/pages/**/*.html')
});

gulp.task('sass',['clean'], function() {
    return sass('./src/assets/scss/main.scss', {
            style: 'compressed'
        })
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest('./src/build/css'))
        .pipe(browserSync.stream());
});

gulp.task('build', function () {
    return gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest('src/build'))
    
});

gulp.task('clean', function () {
     return gulp.src('./src/build/css/', {read: false})
        .pipe(clean());
});


