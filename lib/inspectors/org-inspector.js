function getOrganization(inspector) {
    var githubClient = inspector.githubClient;
    var org = inspector.user;

    return new Promise(function(resolve, reject) {
        githubClient.orgs.get({
                org: org
            },
            function(err, orgInfo) {
                if (err) {
                    return reject(err);
                }

                delete orgInfo.meta;

                resolve(orgInfo);
            });
    });
}

module.exports = function(inspector, config) {
    return getOrganization(inspector)
        .then(function(orgInfo) {


            var data = {
                'githubOrg': orgInfo
            };

            var logoUrl = orgInfo.avatar_url;
            if (logoUrl) {
                data.logo = {
                    url: logoUrl
                };
            }

            return data;
        });
};