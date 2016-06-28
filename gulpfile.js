var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  templateCache = require('gulp-angular-templatecache'),
  rimraf = require('rimraf');

var paths = {
  js: [
    'App/main.js', 'App/**/*.js'
  ],
  sass: 'App/theme/app.scss',

  views: ['App/**/*.jade', '!App/index.jade'],
  viewIndex: 'App/index.jade',

  dist: 'wwwroot/',
  imgs: 'App/theme/imgs/**/*',
  svgs: 'App/theme/svgs/**/*',

  cssLibs: [
    'bower_components/animate.css/animate.min.css',
    'bower_components/angular-material/angular-material.min.css',
    'bower_components/angular-material-data-table/dist/md-data-table.min.css',
    'bower_components/angular-material-icons/angular-material-icons.css',
    'bower_components/material-design-icons/iconfont/material-icons.css'
  ],


  jsLibs: [
    'bower_components/jQuery/dist/jquery.min.js',
    'bower_components/lodash/dist/lodash.min.js',

    //angular
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-i18n/angular-locale_pt-br.js',
    'bower_components/angular-jwt/dist/angular-jwt.min.js',
    'bower_components/angular-material/angular-material.min.js',
    'bower_components/angular-material-data-table/dist/md-data-table.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-jwt/dist/angular-jwt.min.js',
    'bower_components/angular-material-icons/angular-material-icons.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/ngMask/dist/ngMask.min.js',

    //Maps
    'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',

    //markdown
    'bower_components/marked/marked.min.js',
    'bower_components/angular-marked/dist/angular-marked.min.js',

    //validator
    'bower_components/md-form-validator/dist/md-form-validator.min.js'

  ]
};

//CLEAN
gulp.task('clean', cb => rimraf(paths.dist, cb));

//LIBS
gulp.task('css:libs', () =>
  gulp.src(paths.cssLibs)
  .pipe($.concat('libs.min.css'))
  .pipe(gulp.dest(paths.dist + 'css')));

gulp.task("js:libs", () =>
  gulp.src(paths.jsLibs)
  .pipe($.concat("libs.min.js"))
  .pipe(gulp.dest(paths.dist + "js")));

gulp.task('imgs', () =>
  gulp.src(paths.imgs)
  .pipe(gulp.dest(paths.dist + 'imgs')));

gulp.task('svgs', () =>
  gulp.src(paths.svgs)
  .pipe(gulp.dest(paths.dist + 'svgs')));

gulp.task('libs', ['css:libs', 'js:libs', 'imgs', 'svgs']);

//SASS
gulp.task("sass", () =>
  gulp.src(paths.sass)
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    outputStyle: "compressed"
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: ["last 2 versions", "ie >= 9"]
  }))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(paths.dist + 'css'))
  .pipe($.livereload({
    start: true
  })));

//JADE
gulp.task('views:index', () => {
    return gulp.src(paths.viewIndex)
    .pipe($.jade({ pretty: false }))
    //.pipe($.replace("@NOW", new Date() * 1))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('views', ['views:index'], () => {
    return gulp.src(paths.views)
    .pipe($.jade({ pretty: false }))
    //.pipe($.replace("@NOW", new Date() * 1))
    .pipe(templateCache("templates.min.js", { module: "icbApp", root: "/views" }))
    .pipe(gulp.dest(paths.dist + "/js"));
    //.pipe(gulp.dest(paths.dist + "/views"))
});


//JS
gulp.task('js:hint', () =>
  gulp.src(paths.js)
  .pipe($.jshint())
  .pipe($.jshint.reporter('default')));

gulp.task('js', ['js:hint'], () =>
  gulp.src(paths.js)
  .pipe($.sourcemaps.init())
  .pipe($.concat('all.min.js'))
  .pipe($.babel({
    presets: ['es2015']
  }))
  .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(paths.dist + 'js')));

gulp.task('watch', function() {
  $.livereload.listen();
  gulp.watch('App/**/*.scss', ['sass']);
  gulp.watch('App/**/*.jade', ['views']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('compile', ['libs', 'views', 'sass', 'js']);
gulp.task('default', ['compile', 'watch']);