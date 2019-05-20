var gulp = require('gulp');
var concat = require('gulp-concat');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var nested = require('postcss-nested');
var cssVars = require('postcss-simple-vars');
var browser_Sync = require('browser-sync').create();

// task index file
function html_file(callback){
  return gulp.src(('app/index.html'))

  callback();
};

// task styles file
function styles_files(callback){
  return gulp.src(('app/assets/css/main.css'))
  .pipe(postCss([cssImport, mixins, nested, cssVars, autoprefixer]))
  .pipe(concat('stylesheets.css'))
  .pipe(gulp.dest('app/dist/build/css'))
  .pipe(browser_Sync.stream());

  callback();
};

//pending change the root name so it can work.
function scripts_files(callback){

    return gulp.src('app/assets/js/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/dist/build/js'))
        .pipe(browser_Sync.stream());
    callback();
};



// watch task file to watch for all saving changes files
function watch(){

  browser_Sync.init({
    server: {
      baseDir: "app"
    }
  });

  gulp.watch('app/*.html').on('change', browser_Sync.reload);
  gulp.watch('app/assets/css/**/*.css', styles_files);
  gulp.watch('app/assets/js/**/*.js', scripts_files);


};

exports.styles_files = styles_files;
exports.scripts_files = scripts_files;
exports.watch = watch;





// gulp.task('default', scripts_files );
// gulp.task('watch', gulp.series(watch_files, browserSync));

/************** to run multiple task
  gulp.task('default', gulp.series(scripts_files, styles_files));

  --- for watch ---
  gulp.watch('src/*.js', series(clean, javascript));

**************/
