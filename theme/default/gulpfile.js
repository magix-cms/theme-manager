'use strict';

var gulp = require('gulp'),
	fs = require('fs'),
	runSeq = require('run-sequence'),
	$ = require('gulp-load-plugins')({
		rename: {
			'gulp-ruby-sass': 'sass',
			'gulp-clean-css': 'cleanCSS',
			'gulp-uglify'   : 'compress'
		}
	});
	$.fs = fs;
	$.path = require('path');
	$.prompt = require('prompt');
	$.inquirer = require('inquirer');

/**
 * Get configuration
 */
var env = {
	config: JSON.parse(fs.readFileSync('./config.json'))
};

var workingdir = {}; // will be completed by the setWorkingDir function

/**
 * Set paths relative to the theme directory
 */
function setWorkingDir() {
	Object.keys(env.config.paths.themePath).map(function(k, i) {
		workingdir[k] = './' + env.config.paths.themePath[k];
	});
}

/**
 * gulp Task: watch-css
 *
 * File watcher for CSS files
 */
gulp.task('watch-css', function () {
	if(env.config.cssProcessor === 'less'
		|| env.config.cssProcessor === 'scss')
	{
		var srcPath = workingdir.cssSrc + '/' + env.config.cssProcessor;
		gulp.watch([
			srcPath + '/style.' + env.config.cssProcessor,
			srcPath + '/**/*.' + env.config.cssProcessor,
			'!' + srcPath + 'custom/critical/mobile/*.' + env.config.cssProcessor,
			'!' + srcPath + 'custom/theme/mobile/*.' + env.config.cssProcessor,
			'!' + srcPath + '/mobile.' + env.config.cssProcessor
		], [(env.config.cssProcessor)]).on('change', function() { env.config.cssFile = 'style'; });
		gulp.watch([
			srcPath + '/mobile.' + env.config.cssProcessor,
			srcPath + '/**/*.' + env.config.cssProcessor,
			'!' + srcPath + 'custom/critical/**/*.' + env.config.cssProcessor,
			'!' + srcPath + 'custom/theme/**/*.' + env.config.cssProcessor,
			srcPath + 'custom/critical/mobile/*.' + env.config.cssProcessor,
			srcPath + 'custom/theme/mobile/*.' + env.config.cssProcessor,
			'!' + srcPath + '/style.' + env.config.cssProcessor
		], [(env.config.cssProcessor)]).on('change', function() { env.config.cssFile = 'mobile'; });
	}
});

/**
 * gulp Task: watch-vendors
 *
 * File watcher for JS Vendors files
 */
gulp.task('watch-vendors', function () {
	gulp.watch(workingdir.vendors + '/bootstrap/**/*.js', ['bootstrap-js']);
	gulp.watch(workingdir.vendorsSrc + '/**/*.js', ['vendors']);
});

/**
 * gulp Task: watch-js
 *
 * File watcher for JS files
 */
gulp.task('watch-js', function () {
	gulp.watch(workingdir.jsSrc + '/**/*.js', ['js']);
});

// --- All Watchers
/**
 * Gulp Task: watch
 *
 * Start file watchers for a theme
 *
 * If the theme does not exist,
 * it propose to create it
 */
gulp.task('watch', function (cb) {
	setWorkingDir();
	runSeq(['watch-css', 'watch-vendors', 'watch-js'], cb);
});

/**
 * Gulp task: config
 *
 * Display current configuration
 */
gulp.task('config', function () {
	env.showConfig();
});

/**
 * Gulp task: closing
 *
 * End process
 */
gulp.task('closing', function() {
	return null;
});

/**
 * Default Gulp task
 *
 * Ask for user what he want to do between:
 * - Start file watchers
 * - Update version
 * - Never mind
 */
gulp.task('default', function (cb) {
	var task_choices = [
		{
			type: "list",
			name: "task",
			message: "What do you want to do ?",
			choices: [
				{
					name: "Start file watchers",
					value: "watch"
				},
				new $.inquirer.Separator(),
				{
					name: "Update version",
					value: "patch"
				},
				new $.inquirer.Separator(),
				{
					name: "Never mind",
					value: "closing"
				}
			]
		}
	];
	$.inquirer.prompt(task_choices).then(function(result) {
		// Check if bower is installed
		runSeq(result.task, cb);
	});
});