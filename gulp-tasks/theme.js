module.exports = function (gulp, runSeq, $, env, options) {
	env.setWorkingDir();

	/**
	 * Gulp task: dist
	 */
	gulp.task('dist', function () {});

	/**
	 * Gulp task: build
	 */
	gulp.task('build', function () {});

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