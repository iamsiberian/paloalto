var gulp = require('gulp');
var compileHandlebars = require('gulp-compile-handlebars');
var handlebars = require('gulp-handlebars');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var uglify = require('gulp-uglify'); /* js-min not used */

var path = {
    css:  './src/*.scss',
    fonts: './src/fonts/**',
    images: './src/images/**',
    js: './src/scripts/*.js',
    mock: './src/mockapi/*.json',
    templates: './src/templates/post/*.hbs',
    vendor: {
        js: './src/vendor/js/*.js'
    },
    html: {
        pages: './src/pages/**/*.hbs',
        partials: './src/partials/'
    },
    dist: {
        css: './dist/',
        html: './dist/',
        fonts: './dist/fonts/',
        images: './dist/images/',
        templates: './dist/',
        js: './dist/scripts/',
        mock: './dist/mockapi/',
        vendor: {
            js: './dist/'
        }
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
        .pipe(compileHandlebars({}, {
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

gulp.task('vendor_js', function () {
  return gulp.src(path.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(path.dist.vendor.js));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.dist.mock));
});

gulp.task('hbs_templates', function() {
  return gulp.src(path.templates)
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'blocks.templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(path.dist.templates))
});


gulp.task('build', ['html', 'css', 'js', 'vendor_js', 'fonts', 'images', 'mock', 'hbs_templates']);

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