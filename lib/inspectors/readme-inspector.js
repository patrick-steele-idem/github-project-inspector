function getReadme(inspector) {
    var githubClient = inspector.githubClient;
    var user = inspector.user;
    var repo = inspector.repo;

    var rawReadmePromise = new Promise(function(resolve, reject) {
        githubClient.repos.getReadme({
                user: user,
                repo: repo
            },
            function(err, contents) {
                if (err) {
                    return resolve(null);
                }

                var base64Content = contents.content;
                if (base64Content) {
                    contents.content = new Buffer(base64Content, 'base64').toString('utf8');
                }

                resolve(contents);
            });
    });

    return rawReadmePromise;
}

module.exports = function(inspector, config) {
    return getReadme(inspector)
        .then(function(readme) {
            return {
                readme: readme
            };
        });
};