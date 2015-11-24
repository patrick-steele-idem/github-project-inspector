var titleSummaryRegExp = /^\s*([^=\n]+)\s*[=]{4,}\s+([^]+?)(\n\{TOC\}|\n[#]|$)/i;

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
                var markdown;
                var title;
                var summaryMarkdown;

                if (base64Content) {
                    contents.content = markdown = new Buffer(base64Content, 'base64').toString('utf8');

                    var titleSummaryMatches = titleSummaryRegExp.exec(markdown);

                    if (titleSummaryMatches) {
                        title = titleSummaryMatches[1];

                        if (titleSummaryMatches[2]) {
                            summaryMarkdown = titleSummaryMatches[2];
                        }
                    }
                }

                resolve({
                    readme: contents,
                    title: title,
                    summaryMarkdown: summaryMarkdown
                });
            });
    });

    return rawReadmePromise;
}

module.exports = function(inspector, config) {
    return getReadme(inspector);
};