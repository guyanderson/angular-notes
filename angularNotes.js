//============== starter HTML ============
<html>
  <head>
    <title>PlaceHolder</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="build/js/vendor.min.js"></script>
    <link rel="stylesheet" href="build/css/vendor.css">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>

    <link rel="stylesheet" href="build/css/styles.css">
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <!-- 3. Display the application -->
  <body>
    <app-root>Loading...</app-root>
  </body>
</html>

//================ package.json ============

{
  "name": "angular2-to-do",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
    "lite": "lite-server",
    "postinstall": "typings install",
    "tsc": "tsc",
    "tsc:w": "tsc -w"
  },
  "license": "MIT",
  "dependencies": {
    "@angular/common": "2.4.0",
    "@angular/compiler": "2.4.0",
    "@angular/core": "2.4.0",
    "@angular/forms": "2.4.0",
    "@angular/http": "2.4.0",
    "@angular/platform-browser": "2.4.0",
    "@angular/platform-browser-dynamic": "2.4.0",
    "@angular/router": "3.4.0",
    "@angular/upgrade": "2.4.0",
    "bootstrap": "3.3.6",
    "angular-in-memory-web-api": "0.3.1",
    "core-js": "2.4.1",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.1",
    "zone.js": "0.7.2",
    "systemjs": "0.19.27"
  },
  "devDependencies": {
    "bower-files": "3.11.3",
    "browser-sync": "2.11.1",
    "del": "2.2.0",
    "gulp": "3.9.1",
    "gulp-concat": "2.6.0",
    "gulp-sass": "2.2.0",
    "gulp-shell": "0.5.2",
    "gulp-sourcemaps": "1.6.0",
    "gulp-uglify": "1.5.3",
    "gulp-util": "3.0.7",
    "concurrently": "3.0.0",
    "lite-server": "2.2.2",
    "typescript": "2.2.2",
    "typings":"1.3.2"
  }
}

//============= initilization =====

$ bower init

$ npm install
$ bower install
$ gulp build
$ gulp serve

//=========== files ============

project
    app
        app.module.ts
        app.component.ts
        main.ts
    resources
        images
        js
        styles
            styles.css (stylesheet?)
    .gitignore
    index.html
    bower.json
    package.json
    tsconfig.json
    system.config.js

//======= main.ts ============

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);

//======= app.module.ts ======

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }  from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

//=========== app.component.ts

import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <h1>PlaceHolder</h1>
    `
})

export class AppComponent {

}

//=========== tsconfig.json ======

{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [ "es2015", "dom" ],
    "noImplicitAny": false,
    "suppressImplicitAnyIndexErrors": true
  }
}

//=========== systemjs.config.js ===========

/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);

//===========gulpfile===========

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//////////////// typescript ///////////////


gulp.task('tsClean', function(){
  return del(['app/*.js', 'app/*.js.map']);
});

gulp.task('ts', ['tsClean'], shell.task([
  'tsc'
]));

////////////////// bower ////////////////


gulp.task('jsBowerClean', function(){
  return del(['./build/js/vendor.min.js']);
});

gulp.task('jsBower', ['jsBowerClean'], function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('cssBowerClean', function(){
  return del(['./build/css/vendor.css']);
});

gulp.task('cssBower', ['cssBowerClean'], function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);

////////////////// SASS ////////////////

gulp.task('sassBuild', function() {
  return gulp.src(['resources/styles/*'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

////////////////// SERVER ////////////////


gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['resources/js/*.js'], ['jsBuild']); // vanilla js changes, reload.
  gulp.watch(['*.html'], ['htmlBuild']); // html changes, reload.
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']);      gulp.watch(['app/*.ts'], ['tsBuild']); // typescript files change, compile then reload.
});

gulp.task('jsBuild', function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('cssBuild', ['sassBuild'], function(){
  browserSync.reload();
});

gulp.task('tsBuild', ['ts'], function(){
  browserSync.reload();
});

////////////////// global build task ////////////////

gulp.task('build', ['ts'], function(){
  // we can use the buildProduction environment variable here later.
  gulp.start('bower');
  gulp.start('sassBuild');
});

//============ gitignore file========

.gitignore
    node_modules/
    npm-debug.log
    bower_components/
    app/*.js
    app/*.js.map
    .DS_Store
    build/
