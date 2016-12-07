var path = require('path');
var runSequence = require('run-sequence');
var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat')
var rename = require('gulp-rename');
const tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');

// get the dependencies
var childProcess = require('child_process'),
    electron = require('electron-prebuilt');

var fileConfigs = {
    'bundle': {
        'outputDirectory': 'build',
        'mainIndexFile': 'index.html'
    },
    'client': {
        sourceTsFiles: ['client/**/*.ts'],
        sourceResourceFiles: ['client/**/*.html', 'client/**/*.css'],
        additionalFilesToCopy: ['client/systemjs.config.js'],
        ignoreTsFiles: [],
        tsConfigFile: 'client/tsconfig.json',
        mainIndexFile: 'client/index.html',
        mainElectronFile: 'client/electronMain.js',
        mainElectronPackage: 'client/package.json'
    }
};

// SERVER
gulp.task('clean', function() {
    return del(fileConfigs.outputDirectory)
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', function(tsFiles) {
    return gulp.src(tsFiles)
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task('build:libs', function() {

    var dependencies = [
         'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**/*.js',
        'zone.js/dist/**',
        '@angular/**/bundles/**',
        'angular-in-memory-web-api/*.js',
        'lodash/*.*',
        'bootstrap/dist/**',
        'jquery/dist/**',
        'ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
        'moment/min/**',
        'angular2-jwt/*.js'
    ];
    var mappedPaths = dependencies.map(file => {
            return path.resolve('node_modules', file)
        })
        //Let's copy our head dependencies into a dist/libs
    gulp.src(mappedPaths, {
            base: 'node_modules'
        })
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory + "/libs"))

});

gulp.task('build:index', function() {
    //Let's copy our index into dist   
    var copyIndex = gulp.src(fileConfigs.client.mainIndexFile)
        .pipe(rename(fileConfigs.bundle.mainIndexFile))
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));

    //copy all config files   
    var copyConfigFiles = gulp.src(fileConfigs.client.additionalFilesToCopy)
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));

    //copy all config files   
    var copyResourceFiles = gulp.src(fileConfigs.client.sourceResourceFiles)
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));

    return [copyIndex, copyConfigFiles, copyResourceFiles];
});

gulp.task('build:app', function() {
    var tsProject = ts.createProject(fileConfigs.client.tsConfigFile);

    var tsResult = gulp.src(fileConfigs.client.sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))

    return tsResult.js
        .pipe(sourcemaps.write(".", {
            sourceRoot: '/client'
        }))
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory))
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("build:resources", () => {
    return gulp.src([fileConfigs.client.mainElectronFile, fileConfigs.client.mainElectronPackage])
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));
});

gulp.task("copy:packagejson", () => {
    return gulp.src(["package.json"])
        .pipe(gulp.dest('build'));
});



/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch:all', function() {
    gulp.watch(fileConfigs.client.sourceTsFiles, ['build:app']).on('change', function(e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(fileConfigs.client.sourceResourceFiles, ['build:index']).on('change', function(e) {
        console.log('Html file ' + e.path + ' has been changed, bundling again.');
    });
});

gulp.task('build:client:all', ['build:app', 'build:index', 'build:libs', 'build:resources', 'copy:packagejson']);

gulp.task('build', function(callback) {
    runSequence('clean', 'build:client:all', 'watch:all', callback);
});

gulp.task('gulp-release', function(callback) {
    runSequence('clean', 'copy:packagejson', 'build:client:all', callback);
});

gulp.task('default', ['build']);

// create the gulp task
gulp.task('run', function() {
    childProcess.spawn(electron, ['./dist/module'], {
        stdio: 'inherit'
    });
});

/** Create Installers */

var release_windows = require('./build.windows');
var os = require('os');

gulp.task('build-electron', ['gulp-release'], function() {
    switch (os.platform()) {
        case 'darwin':
            // execute build.osx.js 
            break;
        case 'linux':
            //execute build.linux.js 
            break;
        case 'win32':
            return release_windows.build();
    }
});