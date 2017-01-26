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
     * Get theme version
     */
    var getVersion = function () {
        return fs.readFileSync('Version');
    };

    /**
     * Get copyright
     */
    var getCopyright = function () {
        return fs.readFileSync('Copyright');
    };

    /**
     * Gulp task: bootstrap-js
     *
     * Compile bootstrap js files to bootstrap.min.js
     */
    gulp.task('bootstrap-js', function () {
        gulp.src(workingdir.vendors + '/bootstrap/**/*.js')
            .pipe($.concat('bootstrap.js'))
            .pipe($.compress())
            .pipe($.rename({ suffix: '.min' }))
            .pipe($.header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(workingdir.vendors))
            .pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/js/vendors'));
    });

    /**
     * Gulp task: vendors
     *
     * Compile js vendor sources into .min
     */
    gulp.task('vendors', function () {
        gulp.src(workingdir.vendorsSrc + '/*.js')
            .pipe($.compress())
            .pipe($.rename({ suffix: '.min' }))
            .pipe($.header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(workingdir.vendors))
            .pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/js/vendors'));
    });

    /**
     * Gulp task:js
     *
     * Compile js sources into .min
     */
    gulp.task('js', function () {
        gulp.src(workingdir.jsSrc + '/*.js')
            .pipe($.compress())
            .pipe($.rename({ suffix: '.min' }))
            .pipe($.header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(workingdir.js))
            .pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/js'));
    });

    /**
     * Gulp task: scss
     *
     * Compile scss files into .min.css
     */
    gulp.task('scss', function () {
        var globs, msg;
        if (typeof $.util.env.cssFile == 'undefined') {
            msg = 'Compilation and Minification of all css files';
            globs = [workingdir.less + '/style.less', workingdir.less + '/mobile.less'];
        }
        else {
            msg = 'Compilation and Minification of ' + $.util.env.cssFile + '.css';
            globs = workingdir.less + '/' + $.util.env.cssFile + '.less';
        }

        return $.sass(globs, {
            style: 'compressed',
            loadPath: [
                workingdir.scss,
                workingdir.css + '/bootstrap/scss',
                workingdir.css + '/font-awesome/scss'
            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
            .pipe($.notify(msg))
            .pipe($.rename({ suffix: '.min' }))
            .pipe(gulp.dest(workingdir.css));
    });

    /**
     * Gulp task: less
     *
     * Compile less files into .min.css
     */
    gulp.task('less', function () {
        var globs, msg;
        setWorkingDir();
        if (typeof env.config.cssFile == 'undefined') {
            msg = 'Compilation and Minification of all css files';
            globs = [workingdir.less + '/style.less', workingdir.less + '/mobile.less'];
        }
        else {
            msg = 'Compilation and Minification of ' + env.config.cssFile + '.css';
            globs = workingdir.less + '/' + env.config.cssFile + '.less';
        }

        return gulp.src(globs)
            .pipe($.notify(msg))
            .pipe($.less({
                paths: [
                    workingdir.less,
                    workingdir.css + '/bootstrap/less',
                    workingdir.css + '/font-awesome/less'/*,
                    workingdir.css + '/fancybox/less'*/
                ]
            }))
            .pipe($.cleanCSS())
            .pipe($.rename({ suffix: '.min' }))
            .pipe(gulp.dest(workingdir.css))
            .pipe(gulp.dest(env.config.paths.skins + '/' + env.config.name + '/css'));
    });
};