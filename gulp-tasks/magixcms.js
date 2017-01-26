module.exports = function (gulp, $, runSeq) {
    var mccv; // Current running version
    var mclv; // Latest release version

    /**
     * Gupl task: getCurrentVersion
     *
     * Get the current Magix CMS version
     */
    gulp.task('getCurrentVersion', function (cb) {
        var xml     = $.fs.readFileSync('../version.xml');
        var file    = $.cheerio.load(xml, { xmlMode: true });
        mccv = file('version').find('number').text();
        cb();
    });

    /**
     * Gupl task: getLatestVersion
     *
     * Get the latest Magix CMS version
     */
    gulp.task('getLatestVersion', function (cb) {
        var get = require('request');
        var options = {
            url: 'https://api.github.com/repos/magix-cms/magixcms/releases/latest',
            headers: {
                'User-Agent': 'magix-cms'
            }
        };
        get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var mcLatest = JSON.parse(body);
                mclv = mcLatest.tag_name;
                cb();
            }
            else {
                console.log(error);
                console.log(response.statusCode);
                cb();
            }
        });
    });

    /**
     * Gulp task: compareVersion
     *
     * Compare the current version with the offical one
     */
    gulp.task('compareVersion', function (cb) {
        if ( mccv && mclv) {
            if ( mccv !== mclv ) {
                console.log('WARNING: You do not have the latest version of Magix CMS.');
            } else {
                console.log('Notify: You have the latest version of Magix CMS (' + mclv + ')');
            }
        }
        else {
            console.log('ERROR: an error has occurred while retrieving the Magix CMS version');
        }
        cb();
    });

    /**
     * Gulp task: Check the version of Magix CMS
     */
    gulp.task('mcv', function (cb) {
        runSeq('getCurrentVersion','getLatestVersion','compareVersion', cb);
    });
};