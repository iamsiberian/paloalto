var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var path = {
    css:  'styles/*.scss',
    html: 'templates/*.html',
    eot:  'fonts/*.eot',
    ttf:  'fonts/*.ttf',
    woff: 'fonts/*.woff',
    woff2:'fonts/*.woff2',
    png:  'images/*.png',
    dist: {
        css:  'dist/styles/',
        html: 'dist/',
        eot:  'dist/fonts/',
        ttf:  'dist/fonts/',
        woff: 'dist/fonts/',
        woff2:'dist/*.woff2',
        png:  'dist/images/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
    return gulp.src(path.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
    return gulp.src(path.html)
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('eot', function () {
    return gulp.src(path.eot)
        .pipe(gulp.dest(path.dist.eot));
})

gulp.task('ttf', function () {
    return gulp.src(path.ttf)
        .pipe(gulp.dest(path.dist.ttf));
})

gulp.task('woff', function () {
    return gulp.src(path.woff)
        .pipe(gulp.dest(path.dist.woff));
})

gulp.task('woff2', function () {
    return gulp.src(path.woff2)
        .pipe(gulp.dest(path.dist.woff2));
})

gulp.task('png', function () {
    return gulp.src(path.png)
        .pipe(gulp.dest(path.dist.png));
});

gulp.task('build', ['html', 'css', 'eot', 'ttf', 'woff', 'woff2', 'png']);

gulp.task('watch', function () {
    gulp.watch(path.css, ['css']);
    gulp.watch(path.html, ['html']);
    gulp.watch(path.eot, ['eot']);
    gulp.watch(path.ttf, ['ttf']);
    gulp.watch(path.woff, ['woff']);
    gulp.watch(path.woff2, ['woff2']);
    gulp.watch(path.png, ['png']);
});

gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: path.dist.html
        }
    });
    gulp.watch('dist/**').on('change', browserSync.reload);
});