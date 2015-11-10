require('native-promise-only');

var Inspector = require('./Inspector');

exports.createInspector = function(options) {
    var inspector = new Inspector(options);
    return inspector;
};