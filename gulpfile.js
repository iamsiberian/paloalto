var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var path = {
    css:  '/src/styles/*.scss',
    fonts: './src/fonts/**',
    images: './src/images/**',
    html: {
        pages: './src/pages/**/*.hbs',
        partials: './src/partials/'
    },
    dist: {
        css: './dist/',
        html: './dist/',
        fonts: './dist/fonts/',
        images: './dist/images/'
    },
    watch: {
        css: './src/**/*.scss',
        html: './src/**/*.hbs'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
    return gulp.src(path.css)
    	.pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))

    /*
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(path.dist.css));
        */
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


gulp.task('build', ['html', 'css', 'fonts', 'images']);

gulp.task('watch', function () {
    gulp.watch(path.watch.css, ['css']);
    gulp.watch(path.watch.html, ['html']);
});

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: path.dist.html
        }
    });
    gulp.watch('dist/**').on('change', browserSync.reload);
});