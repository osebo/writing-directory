var gulp        = require('gulp');
var shell       = require('gulp-shell');
var deploy      = require('gulp-gh-pages');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var options = {
  dist: './dist/'
}

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', reload);
});


gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/////////////

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task('default', ['build', 'serve']);
