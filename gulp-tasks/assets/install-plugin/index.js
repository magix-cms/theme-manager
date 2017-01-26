var gulp = require('gulp');
var fs = require('fs');
var wget = require('download');

/**
 * Expose `download`.
 */

module.exports = download;

/**
 * Download GitHub `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} plugin
 * @param {Function} fn
 */

function download(plugin, fn){
    var url = github(plugin);
    wget(url, '../plugins/' + plugin, { extract: true, strip: 1 }).then(function () {
        fn();
    });
}

/**
 * Return a GitHub url for a given `repo` object.
 *
 * @param {String} plugin
 * @return {String}
 */

function github(plugin){
    return 'https://github.com/magix-cms/' + plugin + '/archive/master.zip';
}