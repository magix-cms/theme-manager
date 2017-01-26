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
        this.config = JSON.parse(fs.readFileSync('./config.json'));
    }
    else {
        this.config = JSON.parse(fs.readFileSync('./theme/' + theme + '/config.json'));
    }
}

/**
 * Display the current configuration load
 */
function showConfig(cf) {
    console.log(this.config);
}

/**
 * Overwrite the config of the theme
 *
 * @param theme
 * @param config
 */
function setConfig(theme, config) {
    var fs = require('fs');
    if(theme) {
        fs.writeFile('./theme/' + theme + '/config.json', JSON.stringify(config), 'utf8', function() {
            this.config = JSON.parse(fs.readFileSync('./theme/' + theme + '/config.json'));
        });
    }
}

module.exports = {
    config: {},
    getConfig: function (theme) {
        getConfig(theme);
    },
    showConfig: function () {
        showConfig(this.config);
    },
    setConfig: function (theme, config) {
        setConfig(theme, config)
    }
};