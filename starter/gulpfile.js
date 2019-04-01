'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
combine = require('gulp-scss-combine'),
concat = require('gulp-concat'),
chmod = require('gulp-chmod'),
debug = require('gulp-debug'),
wait = require('gulp-wait'),
autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function(done) { 
    console.log("This is default gulp task.");
    if(done) done();
});

function checkHTML(){
  console.log("Html 'index.html' zmieniony.");
}

// Define tasks after requiring dependencies
function style() {

  // Where should gulp look for the sass files?
  // My .sass files are stored in the styles folder
  // (If you want to use scss files, simply look for *.scss files instead)
  return (
      gulp
          .src("sass/main.scss")
          .pipe(wait(200))
          //.pipe(combine())
          .pipe(chmod(0o755))

          // Use sass with the files found, and log any errors
          .pipe( sass({errLogToConsole: true }) )
          .on("error", sass.logError)
          //.pipe(debug())

          .pipe(concat('style.css'))

          // -webkit- and so on
          .pipe(autoprefixer({browsers: ['last 5 versions'],cascade: false}))

          // What is the destination for the compiled file?
          .pipe(gulp.dest("css"))
  );
}

function watchFiles(){
  // gulp.watch takes in the location of the files to watch for changes
  // and the name of the function we want to run on change
  gulp.watch('sass/**', style);
  gulp.watch('index.html',checkHTML);
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

// Don't forget to expose the task!
exports.watchFiles = watchFiles

exports.checkHTML = checkHTML;