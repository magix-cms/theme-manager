module.exports = function (directory, callback) {
    var fs = require('fs');
    /*fs.stat(directory, function(err, stats) {
        if (err) {
            if(err.errno === 34) { // error code is "not exists"
                return false;
            } else {
                return err;
            }
        } else {
            return true;
        }
    });*/
    return fs.existsSync(directory);
};