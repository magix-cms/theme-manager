module.exports = function (gulp, runSeq, $) {
    var ncu = require('npm-check-updates');

    /**
     * Check for npm packages possible updates
     * If possible updates are found, ask user if he want to update
     */
    gulp.task('ncu-npm', function (cb) {
        ncu.run({packageFile: 'package.json'})
            .then(function(upg) {
            if ( !(Object.keys(upg).length === 0 && upg.constructor === Object)) {
                console.log('npm packages to update');
                console.log(upg);

                $.inquirer.prompt({
                    type: 'confirm',
                    name: 'update',
                    message: 'Do you want to update the outdated packages ?'
                }, function(result) {
                    if (result.update) {
                        ncu.run({
                            packageFile: 'package.json',
                            upgrade: true
                        }).then(function() {
                            cb();
                        });
                    }
                    else {
                        cb();
                    }
                });
            }
            else {
                console.log('npm packages are up to date');
                cb();
            }
        });
    });

    /**
     * Check for bower packages possible updates
     * If possible updates are found, ask user if he want to update
     */
    gulp.task('ncu-bower', function (cb) {
        ncu.run({
            packageFile: 'bower.json',
            packageManager: 'bower'
        }).then(function(upg) {
            if ( !(Object.keys(upg).length === 0 && upg.constructor === Object)) {
                console.log('bower packages to update');
                console.log(upg);

                $.inquirer.prompt({
                    type: 'confirm',
                    name: 'update',
                    message: 'Do you want to update the outdated packages ?'
                }, function(result) {
                    if (result.update) {
                        ncu.run({
                            packageFile: 'bower.json',
                            packageManager: 'bower',
                            upgrade: true
                        }).then(function() {
                            cb();
                        });
                    }
                    else {
                        cb();
                    }
                });
            }
            else {
                console.log('bower packages are up to date');
                cb();
            }
        });
    });

    /**
     * Start checking tasks
     */
    gulp.task('ncu', function() {
        runSeq('ncu-npm','ncu-bower');
    });
};