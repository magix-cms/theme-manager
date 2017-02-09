module.exports = function (gulp, runSeq, $, env, options) {
	env.setWorkingDir();

	/**
	 * Gulp task: clean:dist
	 *
	 * Remove dist files
	 */
	gulp.task('clean:dist', function () {
		return $.del([
			env.config.paths.skins + '/' + env.config.name + '/css/*.css',
			env.config.paths.skins + '/' + env.config.name + '/js/**/*.js',
			env.config.paths.skins + '/' + env.config.name + '/img/fancybox/**/*'
		],{force: true});
	});

	/**
	 * Gulp task: dist
	 */
	gulp.task('dist', ['clean:dist', 'compile:all'], function () {
		gulp.src([
			'./theme/' + env.config.name + '/css/*.css'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/css'));

		gulp.src([
			'./theme/' + env.config.name + '/fonts/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/fonts'));

		gulp.src([
			'./theme/' + env.config.name + '/img/**/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/img'));

		return gulp.src([
			'./theme/' + env.config.name + '/js/**/*.js',
			'!./theme/' + env.config.name + '/js/src',
			'!./theme/' + env.config.name + '/js/src/*',
			'!./theme/' + env.config.name + '/js/vendor/src',
			'!./theme/' + env.config.name + '/js/vendor/src/*',
			'!./theme/' + env.config.name + '/js/vendor/bootstrap',
			'!./theme/' + env.config.name + '/js/vendor/bootstrap/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/js'));
	});

	/**
	 * Gulp task: clean:build
	 *
	 * Remove dist files
	 */
	gulp.task('clean:build', function () {
		return $.del([
			env.config.paths.skins + '/' + env.config.name + '/css/**/*',
			env.config.paths.skins + '/' + env.config.name + '/js/**/*',
			env.config.paths.skins + '/' + env.config.name + '/img/fancybox/**/*',
			env.config.paths.skins + '/' + env.config.name + '/gulpfile.js',
			env.config.paths.skins + '/' + env.config.name + '/config.json',
			env.config.paths.skins + '/' + env.config.name + '/package.json',
			env.config.paths.skins + '/' + env.config.name + '/Copyright'
		],{force: true});
	});

	/**
	 * Gulp task: build
	 */
	gulp.task('build', ['clean:build', 'compile:all'], function () {
		gulp.src([
			'./theme/' + env.config.name + '/css/**/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/css'));

		gulp.src([
			'./theme/' + env.config.name + '/fonts/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/fonts'));

		gulp.src([
			'./theme/' + env.config.name + '/img/**/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/img'));

		gulp.src([
			'./theme/' + env.config.name + '/js/**/*'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/js'));

		return gulp.src([
			'./theme/' + env.config.name + '/gulpfile.js',
			'./theme/' + env.config.name + '/config.json',
			'./theme/' + env.config.name + '/package.json',
			'./theme/' + env.config.name + '/Copyright'
		])
			.pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name));
	});

	/**
	 * Update version.
	 *
	 * @param type
	 * @param cb
	 */
	function updV(type, cb) {
		var oldV = env.config.version;
		var newV = oldV.split('.');
		var upd = 'update';

		switch (type) {
			case 'version':
				upd = 'Version update';
				newV[0] = (parseInt(newV[0]) + 1).toString();
				break;
			case 'major':
				upd = 'Major update';
				newV[1] = (parseInt(newV[1]) + 1).toString();
				break;
			case 'patch':
				upd = 'Patch update';
				newV[2] = (parseInt(newV[2]) + 1).toString();
				break;
		}

		newV = newV.join('.');
		env.config.version = newV;

		env.setConfig(env.config.name,env.config, function () {
			console.log(upd + '. From v' + oldV + ' to v' + newV);
			cb();
		});
	}

	/**
	 * Gulp task: patch
	 */
	gulp.task('patch', function (cb) {
		$.inquirer.prompt([
			{
				type: 'list',
				message: 'Update type ?',
				name: 'type',
				choices: [
					{
						name: 'Version update',
						value: 'version'
					},
					{
						name: 'Major update',
						value: 'major'
					},
					{
						name: 'Patch update',
						value: 'patch'
					},
					new $.inquirer.Separator(),
					{
						name: 'Never mind',
						value: 'closing'
					}
				]
			}
		]).then(function (result) {
			if(result.type !== 'closing') {
				updV(result.type, cb);
			}
			else {
				runSeq('closing');
			}
		});
	});
};