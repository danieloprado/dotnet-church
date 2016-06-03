const gulp = require("gulp");
const concat = require("gulp-concat");
const pug = require("gulp-pug");
const exec = require('child_process').exec;
const rimraf = require("rimraf");

const appFolder = "App";
const distFolder = "wwwroot";

gulp.task('clean', cb => {
  return rimraf(`${distFolder}/**/*`, cb);
});

//INDEX
gulp.task("views", _ => {
  return gulp.src(`${appFolder}/**/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(`${distFolder}`));
});

gulp.task("systemjs", _ => {
  return gulp.src(`${appFolder}/systemjs.config.js`)
    .pipe(gulp.dest(`${distFolder}`));
});

//LIBS
gulp.task("libs-polyfills", _ => {
  return gulp.src([
    "node_modules/core-js/client/shim.min.js",
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    "node_modules/systemjs/dist/system.src.js",
  ]).pipe(concat("polyfills.js"))
    .pipe(gulp.dest(`${distFolder}/libs`));
});

gulp.task("libs", ["libs-polyfills"], cb => {
  'use strict';
  let processed = 0;
  const libs = [
    "node_modules/@angular/**/*.js",
    "node_modules/angular2-in-memory-web-api/**/*.js",
    "node_modules/rxjs/**/*.js"
  ];

  libs.forEach(path => {
    const folderName = path.replace("node_modules/", "").replace("/**/*.js", "");
    gulp.src(path)
      .pipe(gulp.dest(`${distFolder}/libs/${folderName}`))
      .on('end', _ => {
        processed++;
        if (processed == libs.length) cb();
      });
  });
});

//TS
gulp.task("js", cb => {
  exec("tsc", function (err, stdout, stderr) {
    console.log(`tsc stdout: ${stdout}`);
    console.log(`tsc stderr: ${stderr}`);
    cb(err);
  });
});

//DEFAULT
gulp.task("watch", cb => {
  gulp.watch(`${appFolder}/**/*.pug`, ['views']);
  gulp.watch(`${appFolder}/systemjs.config.js`, ['systemjs']);

  const tsc = exec("tsc -w");
  tsc.stdout.on('data', data => console.log(`tsc stdout: ${data}`));
  tsc.stderr.on('data', data => console.log(`tsc stderr: ${data}`));
  tsc.on('exit', code => console.log(`tsc exited with code: ${code}`));
});
gulp.task("default", ["views", "systemjs", "libs", "watch"]);