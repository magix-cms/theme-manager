'use strict';

var gulp = require('gulp'),
    bower = require('gulp-bower'),
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
    $.del = require('del');
    $.prompt = require('prompt');
    $.inquirer = require('inquirer');
    $.cheerio = require('cheerio');
    $.dir = require('./gulp-tasks/assets/folder');
    $.callGulp = require('./gulp-tasks/assets/subgulp');

/**
 * Get configuration
 */
var env = require('./gulp-tasks/config');
env.getConfig();

/**
 * Get Gulp task
 *
 * @param {string} task
 * @returns {*}
 */
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, runSeq, $, env, {});
}

/**
 * Gulp task: bower
 *
 * Install bower
 */
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(env.config.paths.bowerDir));
});

/**
 * Gulp task: install-plugin
 *
 * Ask for the name of the plugin to install
 * and for which theme it should be installed
 *
 * Then download the plugin and put public files in the choosen theme
 */
gulp.task('install-plugin', function() {
    var dl = require('./gulp-tasks/assets/install-plugin');

    $.prompt.start();
    $.prompt.get({
        properties: {
            name: {
                description: 'Enter the name of the plugin',
                type: 'string',
                pattern: /(?!magixcms|magixcms-3|convdata)/,
                message: 'You can\'t download this repository, sorry.',
                required: true
            },
            theme: {
                description: 'Enter the name of the theme which will use the plugin',
                type: 'string',
                pattern: /(?!default)(^[a-zA-Z0-9]+$)/,
                message: 'You can\'t install in the default theme, sorry.',
                required: true
            }
        }
    }, function(err, result) {
        if(!err) {
            if(!fs.existsSync('../plugins/' + result.name)) {
                dl(result.name, function () {
                    if(fs.existsSync('../plugins/' + result.name + '/skin/public')) {
                        gulp.src('../plugins/' + result.name + '/skin/public/**/*')
                            .pipe(gulp.dest('../skin/' + result.theme));
                    }
                });
            }
            else {
                console.log('This plugin is already installed.');
            }
        }
    })
});

/**
 * Gulp task: init
 *
 * Working on a theme
 *
 * Ask for user what he want to do between:
 * - Start file watchers
 * - Update version
 * - Closing (Never mind)
 */
gulp.task('init', function (cb) {
	var thconf = {
		properties: {
			name: {
				description: 'Enter the name of the theme you\'d like to work on',
				type: 'string',
				pattern: /(?!_base)(^[a-zA-Z0-9]+$)/,
				message: 'Name must be only letters and numbers',
				required: true
			}
		}
	};

	$.prompt.get(thconf, function (err, result) {
		if(!err) {
			if($.dir.dirExist('./theme/' + result.name) && $.dir.dirExist('../skin/' + result.name)) {
				env.getConfig(result.name);
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
								name: "Genera Dist. version",
								value: "dist"
							},
							{
								name: "Generate Build. version",
								value: "build"
							},
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
			}
			else {
				$.inquirer.prompt({
					type: 'confirm',
					name: 'createSkin',
					message: 'There is no theme called "' + result.name + '". Do you want to create it ?'
				}).then(function(result) {
					if (result.createSkin) {
						askConfig(cb)
					}
					else {
						cb();
					}
				});
			}
		}
	});
});

/**
 * Default Gulp task
 *
 * Ask for user what he want to do between:
 * - Create a new skin
 * - Copy a skin
 * - Install a skin
 * - Work on a skin
 * - Install a Magix plugin
 * - Check the version of Magix CMS
 * - Check packages updates
 * - Closing (Never mind)
 */
gulp.task('default', function () {
	env.getConfig();
    var task_choices = [
        {
            type: "list",
            name: "task",
            message: "What do you want to do ?",
            choices: [
                {
                    name: "Create a new skin",
                    value: "build-skin"
                },
				new $.inquirer.Separator(),
				/*{
				 name: "Copy a skin",
				 disabled: 'Unavailable at this time'
				 },*/
				/*{
				 name: "Install a skin",
				 disabled: 'Unavailable at this time'
				 },*/
				{
					name: "Work on a skin",
					value: "init"
				},
                new $.inquirer.Separator(),
				{
					name: "Check Magix Version",
					value: "mcv"
				},
                {
                    name: "Install a Magix plugin",
                    value: "install-plugin"
                },
                new $.inquirer.Separator(),
                {
                    name: "Check packages updates",
                    value: "ncu"
                },
                {
                    name: "Never mind",
                    value: "quit"
                }
            ]
        }
    ];
    $.inquirer.prompt(task_choices).then(function(result) {
		// Check if bower is installed
		if((result.task === 'watch' || result.task === 'build-skin') && !$.fs.existsSync('./bower_components')) {
			runSeq('bower', result.task);
		}
		else {
			if(result.task === 'quit') {
				process.exit();
			}
			else {
				runSeq(result.task, function () {
					runSeq('default');
				});
			}
		}
    });
});

// Includes tasks
var build = getTask('build');
var compile = getTask('compile');
var watch = getTask('watch');
var theme = getTask('theme');
var packageManager = require('./gulp-tasks/packages')(gulp, runSeq, $);
var magixcms = require('./gulp-tasks/magixcms')(gulp, $, runSeq);