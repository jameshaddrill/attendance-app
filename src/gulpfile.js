var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config.json');
var plugins = require('gulp-load-plugins')({
	pattern: '*'
});

//Clean
//require('./gulp-tasks/clean')(gulp, plugins, config);

// Copy
//require('./gulp-tasks/copy-dev')(gulp, plugins, config);
//require('./gulp-tasks/copy-build')(gulp, plugins, config);

// Scss
require('./gulp-tasks/scss-lint')(gulp, plugins, config);
require('./gulp-tasks/scss-tidy')(gulp, plugins, config);

require('./gulp-tasks/sass-develop')(gulp, plugins, config);
require('./gulp-tasks/sass-build')(gulp, plugins, config);

//JS

// Image minification
require('./gulp-tasks/image-min')(gulp, plugins, config);

// HTML standards
//require('./gulp-tasks/html-lint')(gulp, plugins, config, gutil);

// SVG spritesheets
//require('./gulp-tasks/svg2png')(gulp, plugins, config);
//require('./gulp-tasks/svgo-sprite')(gulp, plugins, config);
//require('./gulp-tasks/sprite-create')(gulp, plugins, config);

//watch for updates rebuild as required
//gulp.task('watch', function() {
	//gulp.watch(config.paths.input.staticDev,  ['copy-dev']);
	//gulp.watch(config.paths.input.styles, ['sass-develop']);
	//gulp.watch(config.paths.input.spriteSrc, ['sprite-create']);
	//gulp.watch(config.paths.input.img + "**/*.svg", ['svg2png']);
	//gulp.watch(config.paths.input.scripts + "**/*.js", ['babelify-develop']);
	//gulp.watch(config.paths.input.html, ['html-templating-develop']);
	//gulp.watch(config.paths.output.html, ['html-lint']);
//});

//gulp.task('develop', function(callback) {
	//plugins.runSequence('copy-dev', 'sprite-create', ['svg2png','svgo-sprite', 'sass-develop', 'babelify-develop', 'html-templating-develop'], 'html-lint', 'browser-sync', 'watch', callback);
//});

//watch for updates rebuild as required
gulp.task('watch', function() {
	gulp.watch('**/*scss', ['sass-develop']);
});

gulp.task('develop', function(callback) {
	plugins.runSequence(['sass-develop'], 'watch', callback);
});

gulp.task('build', function(callback) {
	plugins.runSequence( ['sass-build', 'image-min' ], callback); //
});


gulp.task('default', ['develop']);
