module.exports = function (gulp, runSeq, $, env, options) {
    /**
     * Gulp task: images
     *
     * Get images and add them to the img directory
     */
    gulp.task('images', function () {
        return gulp.src([
            env.config.paths.bowerDir + '/fancybox/dist/images/**/*.*'
        ])
            .pipe(gulp.dest('./theme/' + env.config.name + '/' + env.config.paths.themePath.img));
    });

    /**
     * Gulp task: fonts
     *
     * Get fonts and add them to the fonts directory
     */
    gulp.task('fonts', function () {
        return gulp.src([
            env.config.paths.bowerDir + '/bootstrap/fonts/**.*',
            env.config.paths.bowerDir + '/font-awesome/fonts/**.*'
        ])
            .pipe(gulp.dest('./theme/' + env.config.name + '/css/fonts'));
    });

    /**
     * Gulp task: css-src
     *
     * Get less and add it to the css directory
     */
    gulp.task('css-src', function () {
        gulp.src([env.config.paths.bowerDir + '/fancybox/dist/css/**.*'])
            .pipe(gulp.dest('./theme/' + env.config.name + '/' + env.config.paths.themePath.css + '/fancybox'));

        if(env.config.cssProcessor === 'less') {
            return gulp.src([
                env.config.paths.bowerDir + '/bootstrap/less/**/**.*',
                env.config.paths.bowerDir + '/font-awesome/less/**.*'
            ], { base: env.config.paths.bowerDir})
                .pipe(gulp.dest('./theme/' + env.config.name + '/' + env.config.paths.themePath.css + '/'));
        }
    });

    /**
     * Gulp task: vendors
     *
     * Get vendors js and add it to the js directory
     */
    gulp.task('vendors', function () {
        gulp.src([
            env.config.paths.bowerDir + '/jquery/dist/jquery.min.js',
            env.config.paths.bowerDir + '/fancybox/dist/js/**.*'
        ])
            .pipe(gulp.dest('./theme/' + env.config.name + '/js/vendors'));
        return gulp.src([env.config.paths.bowerDir + '/bootstrap/js/**.*'])
            .pipe(gulp.dest('./theme/' + env.config.name + '/js/vendors/bootstrap'));
    });

    /**
     * Gulp task: conf-skin
     *
     * Create theme config file
     */
    gulp.task('conf-skin', function (cb) {
        if (options.name !== undefined) {
            env.config.name = options.name;
            if (options.cssProcessor !== undefined) env.config.cssProcessor = options.cssProcessor;

            env.setConfig(options.name, env.config, cb);
        }
    });

    /**
     * Gulp task: create-skin
     *
     * Create theme directories
     */
    gulp.task('create-skin', function () {
        if (options.name !== undefined) {
            if(!($.dir.dirExist('./theme/' + options.name) || $.dir.dirExist('../skin/' + options.name))) {

                gulp.src('./theme/default')
                    .pipe($.rename('./' + options.name))
                    .pipe(gulp.dest('./theme'))
                    .pipe(gulp.dest(env.config.paths.skins));

                gulp.src('./theme/default/**/*')
                    .pipe(gulp.dest('./theme/' + options.name));

                return gulp.src([
                    env.config.paths.skins + '/default/**/*',
                    '!' + env.config.paths.skins + '/default/css/**/*',
                    '!' + env.config.paths.skins + '/default/css',
                    '!' + env.config.paths.skins + '/default/js/**/*',
                    '!' + env.config.paths.skins + '/default/js'
                ])
                    .pipe(gulp.dest(env.config.paths.skins + '/' + options.name));
            } else {
                $.inquirer.prompt({
                    type: 'confirm',
                    name: 'startFW',
                    message: 'A theme called ' + options.name + 'already exist. Do you want to work on it ?'
                }).then(function(result) {
                    if (result.startFW) {
                        env.getConfig(options.name);
                        runSeq('watch', cb);
                    }
                    else {
                        cb();
                    }
                });
            }
        }
    });

    /**
     * Gulp task: askFW
     *
     * Ask user if he want to start the file watchers
     */
    gulp.task('askFW', function (cb) {
        $.inquirer.prompt({
            type: 'confirm',
            name: 'startFW',
            message: 'Start file watchers ?'
        }).then(function(result) {
            if (result.startFW) {
                runSeq('watch', cb);
            }
            else {
                cb();
            }
        });
    });

	/**
	 * Gulp task: comp-fancybox
	 *
	 * Compile fancybox to get dist files
	 */
	gulp.task('comp-fancybox', function (cb) {
    	if(!$.fs.existsSync(env.config.paths.bowerDir + '/fancybox/dist')) {
			/*var childProcess = require('child_process');
			var cwd = process.cwd();

			try {
				process.chdir(cwd + '/bower_components/fancybox');
			}
			catch (err) {
				console.log('chdir: ' + err);
			}

			// Run the `gulp` executable
			var instll = childProcess.spawn('npm', ['install', '--save-dev'], {shell: true});

			instll.on('error', function (err) { console.log(err); });

			instll.on('close', function (code) {
				var fb = childProcess.spawn('gulp', {shell: true});

				fb.on('close', function (code) { cb(); });
			});*/

			$.callGulp(process, '/bower_components/fancybox', cb)
		}
		else {
    		cb();
		}
	});

    /**
     * Gulp task: import-src
     *
     * Import theme source files
     */
    gulp.task('import-src', ['comp-fancybox'], function (cb) {
        runSeq(['vendors', 'css-src', 'fonts', 'images'], 'askFW', cb);
    });

    /**
     * Ask if the configuration options choosed are correct
     *
     * @param {stream|function} cb (callback)
     */
    function askConfirm(cb) {
        $.inquirer.prompt({
            type: 'confirm',
            name: 'confirm',
            message: 'Is it correct ?'
        }).then(function(result) {
            if (result.confirm) {
                runSeq('create-skin', 'conf-skin', 'import-src', cb);
            }
            else {
                askConfig(cb);
            }
        });
    }

    /**
     * Ask theme configuration when creating new theme
     *
     * @param {stream|function} cb (callback)
     */
    function askConfig(cb) {
        var data = $.fs.readdirSync('./theme');
        var nb = data.length.toString();
        var dfname = 'theme';
        for(var l=0;l < (4 - (nb.length));l++) {
            dfname += '0';
        }
        dfname += data.length;

        var thconf = {
            properties: {
                name: {
                    description: 'Enter the name of the theme',
                    type: 'string',
                    pattern: /(?!default)(^[a-zA-Z0-9]+$)/,
                    default: dfname,
                    message: 'Name must be only letters and numbers and different than "default"',
                    required: true
                },
                cssProcessor: {
                    description: 'Enter the css pre-processor you would like to use for this project [less|sass]',
                    type: 'string',
                    pattern: /(less|sass)/,
                    default: 'less',
                    message: 'The css pre-processor must be less or sass',
                    required: true
                }
            }
        };

        $.prompt.get(thconf, function (err, result) {
            if(!err) {
                console.log(result);
                options.name = result.name;
                options.cssProcessor = result.cssProcessor;

                askConfirm(cb);
            }
        });
    }

    /**
     * Gulp task: build-skin
     *
     * Create a new skin|theme
     *
     * If the theme already exists,
     * it propose to start the file watchers for this one
     */
    gulp.task('build-skin', function(cb) {
        if (env.config.name !== 'default'
			&& env.config.name !== 'undefined'
			&& typeof env.config.name !== 'undefined') {
            options.name = env.config.name;
            options.cssProcessor = env.config.cssProcessor;
            runSeq('create-skin', 'conf-skin', 'import-src', cb);
        }
        else {
            $.prompt.start();
            askConfig(cb);
        }
    });
};