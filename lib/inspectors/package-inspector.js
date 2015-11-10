var normalizeData = require('normalize-package-data');

module.exports = function(inspector, config) {
    return inspector.readFiles([
            {
                path: 'package.json',
                encoding: 'utf8'
            }
        ])
        .then(function(files) {
            var packageJsonInfo = files[0];
            if (packageJsonInfo) {
                var packageManifest = JSON.parse(packageJsonInfo.content);
                normalizeData(packageManifest);
                delete packageManifest.readme;
                return packageManifest;
            }
        });
};