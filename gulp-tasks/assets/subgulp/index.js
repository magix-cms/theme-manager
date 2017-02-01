var fs = require('fs');
var spawn = require('child_process').execFile;

function callGulp (process, dir, cb) {
	var cwd = process.cwd();

	try {
		process.chdir(cwd + dir);
	}
	catch (err) {
		console.log('chdir: ' + err);
	}

	if(fs.existsSync(cwd + dir + '/node_modules')) {
		run = spawn('gulp', {shell: true});

		run.stdout.on('data', function (data) {
			console.log(data.toString());
		});

		run.on('close', function () { cb(); });
	}
	else {
		var run = spawn('npm', ['install', '--save-dev'], {shell: true});

		run.on('error', function (err) { console.log(err); });

		run.on('close', function () {
			var run = spawn('npm', ['install', '--save'], {shell: true});

			run.on('error', function (err) { console.log(err); });

			run.on('close', function () {
				run = spawn('gulp', {shell: true});

				run.stdout.on('data', function (data) {
					console.log(data.toString());
				});

				run.stderr.on('data', function (data) {
					console.log(data.toString());
				});

				run.on('close', function () { cb(); });
			});
		});
	}
}

/**
 * Expose `callGulp`.
 */
module.exports = callGulp;