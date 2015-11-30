var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    livereload  = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    plumber     = require('gulp-plumber'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream');

var paths = {
    sassMain: './sass/main.scss',
    sassFiles: './sass/**/*.scss',
    jsMain: './js/main.js',
    jsFiles: './js/lib/**/*.js',
    cssDir: './css',
    proxy: 'horsestrap.dev'
};

// SASS
gulp.task('sass', function () {
    gulp.src(paths.sassMain)
        .pipe(sourcemaps.init())
            .pipe(sass({
                errLogToConsole: true
                //outputStyle: 'compressed'
            }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.cssDir))
        //.pipe(reload({stream:true})) // use Livereload by default
        .pipe(livereload());
});


//Concactenate Javascript and minify it
gulp.task('js', function() {  
  return gulp.src(['js/lib/pages/*.js', 'js/lib/modules/*.js', 'js/lib/utilities/*.js'])
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});


// BrowserSync - still on the fence about this(vs Livereload), but it IS pretty awesome
gulp.task('browser-sync', function() {
    browserSync({
        proxy: paths.proxy,
        xip: true,
        notify: false
    });
});

// Default
gulp.task('default', ['sass', 'js'], function(){ // pass in 'browser-sync' to start right away
    livereload.listen();
    gulp.watch(paths.sassFiles, ['sass']);
    gulp.watch(paths.jsFiles, ['js']);
    gulp.watch(paths.jsMain, ['js']);
});