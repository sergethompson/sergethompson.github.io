/////// ME-GULP.js

const gulp = require('gulp'),
      runSequence = require('gulp-run-sequence'),
      source = require('vinyl-source-stream'),
      browserify = require('browserify'),
      eslint = require('gulp-eslint'),
      watchify   = require('watchify'),
      envify = require('envify'),
      errorify = require('errorify');



const $PutItHere = 'wwwDone';

gulp.task('me', function() {
    var file = __dirname+'/js/react/me.react.js';
    return browserify(file, { debug: true })
      .transform("envify", {NODE_ENV: 'production'})
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest($PutItHere+'/js/'));
});

gulp.task('watch-me', function () {
    var reactFile = __dirname+'/js/react/me.react.js',
        bundler    = watchify(browserify(reactFile,
                        {
                            debug: true,
                            cache: {},
                            packageCache: {},
                            fullPaths: true,
                            plugin: ['errorify'],
                            transform: [["babelify", {presets: ["es2015", "react"]}]]
                        })
                    );

    function rebundle() {
        return bundler.bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest($PutItHere+'/js/'));
    }
    bundler
        .on('update', rebundle)
        .on('time', function (time) {
            console.log('Finished me after ',time/1000," s");
        });
    // run any other gulp.watch tasks

    return rebundle();
});



