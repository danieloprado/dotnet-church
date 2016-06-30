const gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  templateCache = require('gulp-angular-templatecache'),
  rimraf = require('rimraf');

const notify = (message) => {
  return gulp.src('')
    .pipe($.notify({ message: message, onLast: true }));
};

const paths = {
  js: ['App/main.js', 'App/**/*.js'],
  theme: ['App/theme/app.scss'],

  views: ['App/**/*.pug', '!App/index.pug'],
  viewIndex: 'App/index.pug',

  dist: 'wwwroot/',
  imgs: 'App/theme/imgs/**/*',
  svgs: 'App/theme/svgs/**/*',

  cssLibs: [
    'bower_components/animate.css/animate.min.css',
    'bower_components/angular-material/angular-material.min.css',
    'bower_components/angular-material-data-table/dist/md-data-table.min.css',

    //pickers
    'bower_components/mdPickers/dist/mdPickers.min.css',

    //markdown
    'bower_components/simplemde/dist/simplemde.min.css'
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
    'bower_components/angular-sanitize/angular-sanitize.min.js',

    //mask
    'bower_components/angular-input-masks/angular-input-masks-dependencies.min.js',
    'bower_components/angular-input-masks/angular-input-masks.min.js',

    //Maps
    'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',

    //markdown
    'bower_components/marked/marked.min.js',
    'bower_components/simplemde/dist/simplemde.min.js',

    //pickers
    'bower_components/moment/min/moment.min.js',
    'bower_components/moment/locale/pt-br.js',
    'bower_components/mdPickers/dist/mdPickers.min.js',

    //validator
    'bower_components/md-form-validator/dist/md-form-validator.min.js',
    "bower_components/angular-validator-async/dist/angular-validator-async.min.js"

  ]
};

//LIBS
gulp.task('css:libs', () => {
  return gulp.src(paths.cssLibs)
    .pipe($.concat('libs.min.css'))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task("js:libs", () => {
  return gulp.src(paths.jsLibs)
    .pipe($.concat("libs.min.js"))
    .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task('imgs', () => {
  return gulp.src(paths.imgs)
    .pipe(gulp.dest(paths.dist + 'imgs'));
});

gulp.task('svgs', () => {
  return gulp.src(paths.svgs)
    .pipe(gulp.dest(paths.dist + 'svgs'));
});

gulp.task('libs', ['css:libs', 'js:libs', 'imgs', 'svgs']);

//SASS
gulp.task("theme", () => {
  return gulp.src(paths.theme)
    .pipe($.sourcemaps.init())
    .pipe($.sass({ outputStyle: "compressed" }).on('error', $.notify.onError("Sass error")))
    .pipe($.autoprefixer({ browsers: ["last 2 versions", "ie >= 9"] }))
    .pipe($.sourcemaps.write("/"))
    .pipe(gulp.dest(paths.dist + 'css'));
});

//JADE
gulp.task('views:index', () => {
  return gulp.src(paths.viewIndex)
    .pipe($.pug({ pretty: false }))
    .pipe($.replace("@NOW", new Date() * 1))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('views', ['views:index'], () => {
  return gulp.src(paths.views)
    .pipe($.pug({ pretty: false }))
    .pipe($.replace("@NOW", new Date() * 1))
    .pipe(templateCache("templates.min.js", { module: "icbApp", root: "/views" }))
    .pipe(gulp.dest(paths.dist + "/js"));
});

//JS
gulp.task('js:hint', () => {
  return gulp.src(paths.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'))
    .on('error', $.notify.onError("JSHint error"));
});

gulp.task('js', ['js:hint'], () => {
  return gulp.src(paths.js)
    .pipe($.sourcemaps.init())
    .pipe($.concat('all.min.js'))
    .pipe($.babel({ presets: ['es2015'] }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dist + 'js'))
    .on('error', $.notify.onError("JS error"));
});

gulp.task('watch', () => {
  var startAndNotify = (tasks) => {
    return () => gulp.start(tasks, () => notify(`${tasks.join(', ').toUpperCase()} Completed`));
  };

  gulp.watch('App/**/*.scss', startAndNotify(['theme']));
  gulp.watch('App/**/*.pug', startAndNotify(['views']));
  gulp.watch(paths.js, startAndNotify(['js']));
});

gulp.task('compile', (cb) => {
  $.runSequence('clean', ['libs', 'views', 'theme', 'js'], () => {
    notify('Compile Completed');
    cb();
  });
});

gulp.task('default', ['compile', 'watch']);
gulp.task('clean', cb => rimraf(`${paths.dist}/**/*`, cb));