module.exports = function (gulp, runSeq, $, env, options) {
	var Gaze = require('./assets/gaze');

	/**
	 *
	 * @param globs
	 * @param ext
	 * @param task
	 */
	function gwatch(globs,task) {
		// Watch all .ext files/dirs in process.cwd()
		Gaze(globs, function(err, watcher) {
			// Get all watched files
			var watched = this.watched();

			this.on('error', function(err) {
				console.log(err);
			});

			// On changed/added/deleted
			this.on('all', function(event, filepath) {
				//if(filepath.split('.').pop() !== ext) return false;

				switch (event) {
					case 'added':
						watcher.add(filepath);
						break;
					case 'deleted':
						watcher.remove(filepath);
						break;
					case 'changed':
						runSeq(task);
						break;
				}
				console.log(filepath + ' was ' + event);
			});
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
            var srcPath = env.workingDir.cssSrc + '/' + env.config.cssProcessor;
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
		gulp.watch(env.workingDir.vendors + '/bootstrap/**/*.js', ['bootstrap-js']);
		//gulp.watch(env.workingDir.vendorsSrc + '/**/*.js', ['vendors']);

		gwatch([env.workingDir.vendorsSrc, env.workingDir.vendorsSrc +'/**/*.js'],'vendors');

		/*$.fs.watch(env.workingDir.vendorsSrc, function(eventType, filename) {
			var event = eventType;
			switch (eventType) {
				case 'change':
					break;
				case 'rename':
					event = $.fs.existsSync(env.workingDir.vendorsSrc + '/' + filename) ? 'add' : 'delete';
					break;
			}
			console.log(event);
			console.log(filename);
		});*/
	});

    /**
     * gulp Task: watch-js
     *
     * File watcher for JS files
     */
    gulp.task('watch-js', function () {
        gulp.watch(env.workingDir.jsSrc + '/**/*.js', ['js']);

        /*var js = new Gaze(env.workingDir.jsSrc + '/!**!/!*.js');
		js.on('all', function (error, filepath) {
			runSeq('js');
		});*/
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