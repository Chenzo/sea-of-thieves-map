/*

Launch Docker:
    $ gulp docker

Default Watch Command:
	$ gulp

Update CacheBuster:
	$ gulp updateCacheBuster

Update Javascript Files:
    $ gulp javascripting

*/

var paths = {
    styles: {
        src: "./src/scss",
        dest: "./www/css"
    },
    scripts: {
        src: "./src/js",
        dest: "./www/js",
        webpackconffile: "./webpack.config.js"
    }
};


var gulp = require('gulp'),
	sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
	//wait = require('gulp-wait'),
    //replace = require('gulp-replace'),
    //babel = require('gulp-babel'),
    run = require('gulp-run-command').default,
    t2 = require('through2');
    //rename = require("gulp-rename");

//For Webpack/JS: 
var webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require(paths.scripts.webpackconffile);
var named = require('vinyl-named');

//For PostCSS/AutoPrefixer
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

//Browser sync
var browserSync = require('browser-sync').create();


var timeInMs = 12345;





















/* 

Default Watch Task
------------------
runs the sass and javascript commands on change in the SRC folder

*/


function scripts() {
    return gulp
        .src(paths.scripts.src+ '/*.js')
        .pipe(named()) 
        .pipe(webpackStream(webpackConfig), webpack).on('error', function() {
            console.error.bind(console);
            this.emit('end');
        })
        .pipe(gulp.dest(paths.scripts.dest))
} 


function style(done) {
    return gulp
        .src(paths.styles.src + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on("error", sass.logError)
        .pipe(t2.obj((chunk, enc, cb) => { // Execute through2
            let date = new Date();
            chunk.stat.atime = date;
            chunk.stat.mtime = date;
            cb(null, chunk);
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(paths.styles.dest)); 
        done();
}



exports.scripts = scripts;
exports.style = style;

var build = gulp.parallel(scripts, style);

gulp.task('default', build);

