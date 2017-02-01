/**
 * Get the theme configuration
 * if a theme name is passed get its configuration
 * or get the default configuration if no theme name is passed
 * or if the theme does not exist
 *
 * @param theme
 */
function getConfig(theme) {
    var fs = require('fs');
    if(!theme || (theme && !fs.existsSync('./theme/' + theme))) {
        return JSON.parse(fs.readFileSync('./theme/default/config.json'));
    }
    else {
        return JSON.parse(fs.readFileSync('./theme/' + theme + '/config.json'));
    }
}

/**
 * Display the current configuration load
 */
function showConfig(cf) {
    console.log(cf);
}

/**
 * Overwrite the config of the theme
 *
 * @param {string} theme
 * @param {object} config
 * @param {function} cb
 */
function setConfig(theme, config, cb) {
    var fs = require('fs');
    if(theme) {
        fs.writeFile('./theme/' + theme + '/config.json', JSON.stringify(config), 'utf8', function() {
            cb(JSON.parse(fs.readFileSync('./theme/' + theme + '/config.json')));
        });
    }
}

/**
 * Set paths relative to the theme directory
 *
 * @param {object} config
 * @param {function} cb
 */
function setWorkingDir(config, cb) {
	var wd = {};
	Object.keys(config.paths.themePath).map(function(k, i) {
		wd[k] = './theme/' + config.name + '/' + config.paths.themePath[k];
	});
	cb(wd);
}

module.exports = {
    config: {},
    workingDir: {},
    getConfig: function (theme) {
        this.config = getConfig(theme);
    },
    showConfig: function () {
        showConfig(this.config);
    },
    setConfig: function (theme, config, cb) {
		var $this = this;
        setConfig(theme, config, function(cf) {
			$this.config = cf;
			cb();
		});

    },
	setWorkingDir: function (cb) {
    	var $this = this;
		setWorkingDir(this.config, function(wd) {
			$this.workingDir = wd;

			if(typeof cb !== 'undefined') {
				cb();
			}
		})
	}
};