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
    $.prompt = require('prompt');
    $.inquirer = require('inquirer');
    $.cheerio = require('cheerio');
    $.dir = require('./gulp-tasks/assets/folder');

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
 * Gulp task: config
 *
 * Display current configuration
 */
gulp.task('config', function () {
    env.showConfig();
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
 * Check the version of Magix CMS
 *
 * Ask for user what he want to do between:
 * - Work on a skin
 * - Create a new skin
 * - Install a Magix plugin
 * - Check packages updates
 * - Closing (Never mind)
 */
gulp.task('default', function () {
    var task_choices = [
        {
            type: "list",
            name: "task",
            message: "What do you want to do ?",
            choices: [
                {
                    name: "Work on a skin (launch file watchers)",
                    value: "watch"
                },
                new $.inquirer.Separator(),
                {
                    name: "Create a new skin",
                    value: "build-skin"
                },
                /*{
                 name: "Copy a skin",
                 disabled: 'Unavailable at this time'
                 },*/
                new $.inquirer.Separator(),
                {
                    name: "Install a Magix plugin",
                    value: "install-plugin"
                },
                new $.inquirer.Separator(),
                {
                    name: "Check Magix Version",
                    value: "mcv"
                },
                {
                    name: "Check packages updates",
                    value: "ncu"
                },
                {
                    name: "Never mind",
                    value: "closing"
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
			runSeq(result.task);
		}
    });
});

// Includes tasks
var compilers = getTask('compile');
var wartchers = getTask('watch');
var build = getTask('build');
var packageManager = require('./gulp-tasks/packages')(gulp, runSeq, $);
var magix = require('./gulp-tasks/magixcms')(gulp, $, runSeq);