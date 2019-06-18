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


var gulp = require('gulp'),
	sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait'),
    replace = require('gulp-replace'),
    //babel = require('gulp-babel'),
    run = require('gulp-run-command').default;
    //rename = require("gulp-rename");

//For Webpack/JS: 
var webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js');
var named = require('vinyl-named');

//For PostCSS/AutoPrefixer
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

//Browser sync
var browserSync = require('browser-sync').create();


var timeInMs = 12345;





//Task - run docker
gulp.task('docker', run('docker-compose -f config/docker/docker-compose.yml up --build'));




//Task - compiles SCSS files into a single compressed CSS file with a sourcemap
gulp.task('styles', function() {
   return gulp.src('./src/scss/**/*.scss')
        .pipe(wait(500)) //Slight delay for Windows Users
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'uncompressed'}).on('error', sass.logError))
        .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
        .pipe(sourcemaps.write('/maps'))
        /* .pipe(rename(function (path) {
            path.basename += "." + timeInMs;
        })) */
        .pipe(gulp.dest('./www/css/'))
        .pipe(browserSync.stream());        
});




//Task - finds and updates chacheBusterNumber PHP variable in global with current time.
gulp.task('updateCacheBuster', function(){
    timeInMs = Date.now();
    console.log("refreshing cacheBuster with timeStamp: " + timeInMs);
    gulp.src(['./www/includes/globals.php'])
        .pipe(replace(/define\(\'CACHE_BUSTER\',\s*\'\d*\'/g, "define('CACHE_BUSTER', '"+timeInMs+"'"))
        .pipe(gulp.dest('./www/includes/'));
    
    gulp.src(['./www/service-worker.js'])
        .pipe(replace(/\?v=\d+/g, "?v="+timeInMs))
        .pipe(gulp.dest('./www/'));

    gulp.src(['./www/data/mapfile_list.json'])
        .pipe(replace(/\?v=\d+/g, "?v="+timeInMs))
        .pipe(gulp.dest('./www/data/'));
});





gulp.task('javascripting', function() {
    gulp.src('./src/js/*.js')
      .pipe(named()) //swaps in individual files
      .pipe(webpackStream(webpackConfig), webpack).on('error', console.error.bind(console))
      /* .pipe(rename(function (path) {
        //path.dirname += "/ciao";
        path.basename += "." + timeInMs;
        //path.extname = ".md";
      })) */
      .pipe(gulp.dest('./www/js'));
  });









gulp.task('js', ['javascripting'], function() {
    console.log("----------------- > javascripting");
});


gulp.task('updateCB', ['updateCacheBuster'], function() {
    console.log("----------------- > Updated Cache Buster!!");
});




/* 

Default Watch Task
------------------
runs the sass and javascript commands on change in the SRC folder

*/
gulp.task('default', ['updateCacheBuster', 'styles', 'javascripting'] ,function() {
	browserSync.init({
        proxy: 'http://localhost:8088'
	});
	gulp.watch('./src/js/**/*.js',['updateCacheBuster', 'js']);
    gulp.watch('./src/scss/**/*.scss',['updateCacheBuster', 'styles']);
    //gulp.watch("./www/*.php").on('change', browserSync.reload);
    gulp.watch("./www/*.html").on('change', browserSync.reload);
    //gulp.watch("./www/**/*.php").on('change', browserSync.reload);
    gulp.watch("./www/**/*.html").on('change', browserSync.reload);
    gulp.watch("./www/js/**/*.js").on('change', browserSync.reload);
});


