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
                var packageManifest;
                try {
                    packageManifest = JSON.parse(packageJsonInfo.content);
                } catch(e) {
                    console.error('Unable to parse package.json file for repo ' + inspector.path, 'Error:', e, 'JSON:', JSON.stringify(packageJsonInfo));
                    packageManifest = {};
                }

                normalizeData(packageManifest);
                delete packageManifest.readme;
                return packageManifest;
            }
        });
};