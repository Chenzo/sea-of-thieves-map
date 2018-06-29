/*

Gulpfile - last updated: 06.07.2018 - Eric


Launch Docker:
    $ gulp docker

Default Watch Command:
	$ gulp

Update CacheBuster:
	$ gulp updateCacheBuster

Update Javascript Files:
    $ gulp javascripting

Build Sprites:
    $ gulp spritesheet
    $ gulp moveSprites

Generate SVG Font:
    $ gulp iconFont

*/


var gulp = require('gulp'),
	sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    pump = require('pump'),
	wait = require('gulp-wait'),
    replace = require('gulp-replace'),
    spritesmith = require('gulp.spritesmith'),
    babel = require('gulp-babel'),
    run = require('gulp-run-command').default;

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

//SVG to font:
var iconfontCSS = require('gulp-iconfont-CSS'),
    iconfont = require('gulp-iconfont'),
    imagemin= require('gulp-imagemin');
var fontName = 'toll-icons';







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
        .pipe(gulp.dest('./www/css/'))
        .pipe(browserSync.stream());        
});




//Task - finds and updates chacheBusterNumber PHP variable in global with current time.
gulp.task('updateCacheBuster', function(){
    var timeInMs = Date.now();
    console.log("refreshing cacheBuster with timeStamp: " + timeInMs);
    gulp.src(['./www/includes/globals.php'])
        .pipe(replace(/define\(\'CACHE_BUSTER\',\s*\'\d*\'/g, "define('CACHE_BUSTER', '"+timeInMs+"'"))
        .pipe(gulp.dest('./www/includes/'))
});





gulp.task('javascripting', function() {
    gulp.src('./src/js/*.js')
      .pipe(named()) //swaps in individual files
      .pipe(webpackStream(webpackConfig), webpack).on('error', console.error.bind(console))
      .pipe(gulp.dest('./www/js'));
  });





gulp.task('sprite', function () {
  var spriteData = gulp.src('./src/sprites/sprite_pngs/*.png').pipe(spritesmith({
    retinaSrcFilter: ['./src/sprites/sprite_pngs/*@2x.png'],
    imgName: 'spritesheet.png',
    cssName: '_spritesheet.scss',
    retinaImgName: 'spritesheet@2x.png',
    padding: 4
  }));
  return spriteData.pipe(gulp.dest('./src/sprites/sprite_temp/'));
});


//This moves the spirtes to the /images/ui folder and
//moves the sass to the correct folder and renames the path to the IMAGE
gulp.task('moveSprites', ['sprite'], function() {
    gulp.src('./src/sprites/sprite_temp/*.png')
    .pipe(gulp.dest('./www/images/ui/'));
    gulp.src('./src/sprites/sprite_temp/*.scss')
    .pipe(replace('\'spritesheet', '\'/images/ui/spritesheet'))
    .pipe(gulp.dest('./src/scss/modules/'));
});



/*

    $ gulp iconFont

    converts all SVGs from inside the /src/svg folder into a font.
    creates a /www/fonts folder and places demo-icons font files inside
    creates a /src/scss/partials/_icons.scss file 

    icons can be used like:
    <div class="icon icon-svg_filename">

*/
gulp.task('iconFont', function() {
    //console.log(path.join(__dirname, '/src/scss/'));
    gulp.src(['./src/svgs/*.svg'], {base: './'})
      .pipe(imagemin())
      .pipe(iconfontCSS({
        fontName: fontName,
        targetPath: '../../src/scss/modules/_icons.scss',
        fontPath: '/fonts/'
      }))
      .pipe(iconfont({
        fontName: fontName,
        // Remove woff2 if you get an ext error on compile
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        normalize: true,
        fontHeight: 1001
      }))
      .pipe(gulp.dest('./www/fonts/'));
});
  


gulp.task('spritesheet', ['sprite', 'moveSprites'], function() {
    console.log("----------------- > Sprite Sheet Created!");
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
gulp.task('default', ['styles', 'javascripting'] ,function() {
	browserSync.init({
	    proxy: 'http://localhost:8088'
	});
	gulp.watch('./src/js/**/*.js',['js', 'updateCacheBuster']);
    gulp.watch('./src/scss/**/*.scss',['styles', 'updateCacheBuster']);
    //gulp.watch("./www/*.php").on('change', browserSync.reload);
    gulp.watch("./www/*.html").on('change', browserSync.reload);
    //gulp.watch("./www/**/*.php").on('change', browserSync.reload);
    gulp.watch("./www/**/*.html").on('change', browserSync.reload);
    gulp.watch("./www/js/**/*.js").on('change', browserSync.reload);
});


