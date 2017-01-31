module.exports = function (gulp, runSeq, $, env, options) {
    var workingdir = {}; // will be completed by the setWorkingDir function

    /**
     * Set paths relative to the theme directory
     */
    function setWorkingDir() {
        Object.keys(env.config.paths.themePath).map(function(k, i) {
            workingdir[k] = './theme/' + env.config.name + env.config.paths.themePath[k];
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
        if(env.config.name !== 'default') {
            setWorkingDir();
            runSeq(['watch-css', 'watch-vendors', 'watch-js']);
        }
        else {
            var thconf = {
                properties: {
                    name: {
                        description: 'Enter the name of the theme you\'d like to work on',
                        type: 'string',
                        pattern: /(?!default)/,
                        message: 'Name must be only letters and numbers and different than "default"',
                        required: true
                    }
                }
            };

            $.prompt.get(thconf, function (err, result) {
                if(!err) {
                    if($.dir.dirExist('./theme/' + result.name) && $.dir.dirExist('../skin/' + result.name)) {
                        env.getConfig(result.name);
                        setWorkingDir();
                        runSeq(['watch-css', 'watch-vendors', 'watch-js']);
                    }
                    else {
                        options.name = result.name;
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
        }
    });
};