"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass");
let babel = require('gulp-babel');
let uglify = require('gulp-uglify-es').default;
let concat = require("gulp-concat");
let cleanCSS = require("gulp-clean-css");
let autoprefixer = require("gulp-autoprefixer");
let eslint = require("gulp-eslint");

sass.compiler = require("node-sass");

gulp.task("sass", function() {
    return gulp
        .src([
            "./src/dev/scss/_boot.scss",
        ])
        .pipe(concat("all.min.css"))
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(
            cleanCSS({
                compatibility: "ie8"
            })
        )
        .pipe(gulp.dest("./src/dist/style"));
});

gulp.task("debugJs", function() {
    return gulp
        .src("./src/dev/js/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("compressJs", function() {
    return gulp
        .src([
            "./node_modules/jquery/dist/jquery.js",
            "./src/dev/js/*.js"
        ])
        .pipe(concat("all.min.js"))
        .pipe(uglify())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", function() {
    gulp.watch("./src/dev/scss/**/*.scss", gulp.series("sass"));
    gulp.watch("./src/dev/js/**/*.js", gulp.series("compressJs"));
});
