/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 *
 */

'use strict';

import path from 'path';
import gulp from 'gulp';
import jshint from 'gulp-jshint';
import symlink from 'gulp-sym';
import sequence from 'run-sequence';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

const paths = {};

paths.specs = [path.join(__dirname, 'tests', '*.spec.js')];
paths.sources = [path.join(__dirname, '*.js'), path.join(__dirname, 'lib', '**', '*.js')];

gulp.task('lint', function () {
    return gulp.src(paths.specs.concat(paths.sources))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('build', function(){
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])

        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            configfile: '.eslintrc'
        }))

        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
    //.pipe(eslint.failOnError());
});

