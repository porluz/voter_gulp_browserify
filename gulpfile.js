'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var del = require('del');

var eslint = require('gulp-eslint');

var browserify = require('browserify');
var babelify = require('babelify');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var less = require('gulp-less');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var htmlreplace = require('gulp-html-replace');

var karma = require('karma').server;

var browserSync = require('browser-sync');

var env = process.env.NODE_ENV || 'development';

var filePaths = {
    src: {
        scripts: {
            entry: './src/bootstrap.js',
            all: ['./src/**/*.js', './src/**/*.jsx'],
            bundled: env === 'development' ? 'app.js' : 'app.min.js'
        },
        styles: {
            entry: 'styles.scss',
            all: './sass/**/*.scss',
            bundled: env === 'development' ? 'styles.css' : 'styles.min.css'
        },
        teplates: {
            entry: './templates/index.html'
        }
    },
    dest: './build'
};

gulp.task('lint:scripts', function() {
    return gulp.src(filePaths.src.scripts.all)
    //    .pipe(jshint({ lookup: true, linter: require('jshint-jsx').JSXHINT}))
    //    .pipe(jshint.reporter('default'));
    //gulp.src( stagedFilePaths )
    .pipe( eslint({useEslintrc: true}) )
    .pipe( eslint.format() )
    .pipe( eslint.failAfterError() );
});

gulp.task('build:scripts', function() {
    return browserify(filePaths.src.scripts.entry, {
            paths: ['./node_modules', './src'],
            debug: env === 'development'
        })
        .transform(babelify, { presets: ['es2015', 'react']})
        .bundle()
        .on('error', function(err) {
            gutil.log(gutil.colors.red(err));
        })
        .pipe(source(filePaths.src.scripts.bundled))
        .pipe(buffer())
        .pipe(gulpif(env === 'development', sourcemaps.init({
            loadMaps: true
        })))
        .pipe(gulpif(env === 'production', uglify({
            mangle: false
        })))
        .pipe(gulpif(env === 'development', sourcemaps.write('./')))
        .pipe(gulp.dest(filePaths.dest));
});

gulp.task('reload:scripts', ['build:scripts'], function() {
    browserSync.reload();
});

gulp.task('build:styles', function() {
    return gulp.src(filePaths.src.styles.all)
        .pipe(sass()
        .on('error', function(err) {
            gutil.log(gutil.colors.red(err));
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulpif(env === 'production', minify()))
        .pipe(rename(filePaths.src.styles.bundled))
        .pipe(gulp.dest(filePaths.dest));
});

gulp.task('reload:styles', ['build:styles'], function() {
    browserSync.reload();
});

gulp.task('build:templates', function() {
    return gulp.src(filePaths.src.teplates.entry)
        .pipe(htmlreplace({
            css: filePaths.src.styles.bundled,
            js: filePaths.src.scripts.bundled
        }))
        .pipe(gulp.dest(filePaths.dest));
});

gulp.task('reload:templates', ['build:templates'], function() {
    browserSync.reload();
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, function() {
        done();
    });
});

gulp.task('clean', function(callback) {
    del(filePaths.dest, null, callback);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: filePaths.dest
        },
        browser: "google chrome",
        port: process.env.PORT || 8080
    });
});

gulp.task('watch', function() {
    var callback = function() {
        gulp.watch(filePaths.src.scripts.all, ['reload:scripts']);
        gulp.watch(filePaths.src.styles.all, ['reload:styles']);
        gulp.watch(filePaths.src.teplates.entry, ['reload:templates']);

        gutil.log(gutil.colors.green('Watching for changes...'));
    };

    runSequence(
        'clean',
        'lint:scripts',
        ['build:scripts', 'build:styles', 'build:templates'],
        'browser-sync',
        callback
    );
});

gulp.task('build', function() {
    var callback = function() {
        gutil.log(gutil.colors.green('Build complete.'));
    };

    runSequence(
        'clean',
        'lint:scripts',
        ['build:scripts', 'build:styles', 'build:templates'],
        callback
    );
});

gulp.task('default', ['build']);
