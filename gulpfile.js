var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); /* js-min not used */

var path = {
    css:  './src/*.scss',
    fonts: './src/fonts/**',
    images: './src/images/**',
    js: './src/scripts/*.js',
    mock: './src/mockapi/*.json',
    partials: './src/partials/render/*.hbs',
    html: {
        pages: './src/pages/**/*.hbs',
        partials: './src/partials/'
    },
    dist: {
        css: './dist/',
        html: './dist/',
        fonts: './dist/fonts/',
        images: './dist/images/',
        partials: './dist/partials/render',
        js: './dist/scripts/',
        mock: './dist/mockapi/'
    },
    watch: {
        css: './src/pages/**/*.scss',
        html: './src/pages/**/*.hbs',
        js: './src/scripts/*.js',
        mock: './src/mockapi/*.json'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
    return gulp.src(path.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
    return gulp.src(path.html.pages)
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: [path.html.partials]
        }))
        .pipe(rename({
            dirname: '.',
            extname: '.html'
        }))
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('fonts', function () {
    return gulp.src(path.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('images', function () {
    return gulp.src(path.images)
        .pipe(gulp.dest(path.dist.images));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.dist.mock));
});

gulp.task('partials', function () {
    return gulp.src(path.partials)
        .pipe(gulp.dest(path.dist.partials));
});


gulp.task('build', ['html', 'css', 'js', 'fonts', 'images', 'mock', 'partials']);

gulp.task('watch', function () {
    gulp.watch(path.watch.css, ['css']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.mock, ['mock']);
});

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: path.dist.html
        }
    });
    gulp.watch('dist/**').on('change', browserSync.reload);
});