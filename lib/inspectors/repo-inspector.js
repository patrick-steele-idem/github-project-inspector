function getRepo(inspector) {
    var githubClient = inspector.githubClient;
    var user = inspector.user;
    var repo = inspector.repo;

    return new Promise(function(resolve, reject) {
        githubClient.repos.get({
                user: user,
                repo: repo
            },
            function(err, repoInfo) {
                if (err) {
                    return reject(err);
                }

                delete repoInfo.meta;
                resolve(repoInfo);
            });
    });
}

module.exports = function(inspector, config) {
    return getRepo(inspector)
        .then(function(repoInfo) {
            var data = {
                githubRepo: repoInfo
            };

            var desc = repoInfo.description;
            if (desc) {
                data.description = desc;
            }

            data.name = repoInfo.name;

            return data;
        });
};