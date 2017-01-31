var spawn = require('child_process').spawn;

function callGulp (process, dir, cb) {
	var cwd = process.cwd();

	try {
		process.chdir(cwd + dir);
	}
	catch (err) {
		console.log('chdir: ' + err);
	}

	var run = spawn('npm', ['install', '--save-dev'], {shell: true});

	run.on('error', function (err) { console.log(err); });

	run.on('close', function () {
		var run = spawn('npm', ['install', '--save'], {shell: true});

		run.on('error', function (err) { console.log(err); });

		run.on('close', function () {
			run = spawn('gulp', {shell: true});

			run.on('close', function () { cb(); });
		});
	});
}

/**
 * Expose `callGulp`.
 */
module.exports = callGulp;