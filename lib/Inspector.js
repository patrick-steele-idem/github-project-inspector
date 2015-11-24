var ProjectMeta = require('./ProjectMeta');
var GitHubApi = require('github');

var builtinNames = [
    'package',
    'readme',
    'org',
    'repo'
];

var builtinPlugins = {};


builtinNames.forEach(function(builtinName) {
    builtinPlugins[builtinName] = require('./inspectors/' + builtinName + '-inspector');
});

function RepoInspector(inspector, repo) {
    this.inspector = inspector;
    this.githubClient = inspector.githubClient;
    this.meta = new ProjectMeta();
    if (repo.charAt(0) === '/') {
        repo = repo.substring(1);
    }

    var repoParts = repo.split(['/']);
    this.user = this.org = repoParts[0];
    this.repo = repoParts[1];
    this.path = this.user + '/' + this.repo;
}

RepoInspector.prototype = {
    getMeta: function() {
        return this.meta;
    },

    setMetaProps: function(newProps) {
        this.meta.setProps(newProps);
    },

    setMetaProp: function(name, value) {
        this.meta.setProp(name, value);
    },

    readFiles: function(paths) {
        var githubClient = this.githubClient;
        var user = this.user;
        var repo = this.repo;

        var promises = paths.map(function(path) {
            var encoding = 'utf8';

            if (typeof path === 'object') {
                var pathInfo = path;
                path = pathInfo.path;
                encoding = pathInfo.encoding || 'utf8';
            }

            return new Promise(function(resolve, reject) {
                githubClient.repos.getContent({
                        user: user,
                        repo: repo,
                        path: path
                    },
                    function(err, contents) {
                        if (err) {
                            return resolve(null);
                        }

                        var base64Content = contents.content;
                        if (base64Content) {
                            var content = new Buffer(base64Content, 'base64');
                            if (encoding) {
                                content = content.toString(encoding);
                            }

                            contents.content = content;
                        }

                        resolve(contents);
                    });
            });
        });

        return Promise.all(promises);
    }
};

function Inspector(options) {
    var pathPrefix = options.prefix;
    var githubHost = options.host || 'api.github.com';

    if (!pathPrefix && githubHost !== 'api.github.com') {
        pathPrefix = '/api/v3';
    }

    var githubApiConfig = {
        // required
        version: '3.0.0',
        // optional
        debug: options.debug === true,
        protocol: 'https',
        host: githubHost,
        timeout: 5000,
        headers: {
            'user-agent': 'patrick-steele-idem/github-repo-inspector' // GitHub is happy with a unique user agent
        }
    };

    if (pathPrefix) {
        githubApiConfig.pathPrefix = pathPrefix;
    }

    this.githubClient = new GitHubApi(githubApiConfig);

    if (options.auth) {
        this.githubClient.authenticate(options.auth);
    }

    var plugins = options.plugins || builtinNames;

    this.plugins = plugins.map(function(pluginInfo) {
        var pluginModule;
        var pluginConfig;
        var loadedPlugin;

        if (typeof pluginInfo === 'string') {
            pluginModule = pluginInfo;
            pluginConfig = {};
        } else if (typeof pluginInfo === 'object') {
            pluginModule = pluginInfo.plugin;
            pluginConfig = pluginInfo.config || {};
        } else {
            throw new Error('Invalid plugin: ' + pluginInfo);
        }

        if (typeof pluginModule === 'string') {
            loadedPlugin = builtinPlugins[pluginModule];
            if (!loadedPlugin) {
                loadedPlugin = require(pluginModule);
            }
        } else {
            loadedPlugin = pluginModule;
        }

        return {
            plugin: loadedPlugin,
            config: pluginConfig
        };
    });
}

Inspector.prototype = {
    inspectRepo: function(repo) {

        var repoInspector = new RepoInspector(this, repo);

        // // Run the plugins in series...
        var pluginPromises = this.plugins.map(function( pluginInfo) {
            var plugin = pluginInfo.plugin;
            var pluginConfig = pluginInfo.config;
            return plugin(repoInspector, pluginConfig);
        });

        var meta = repoInspector.getMeta();

        return Promise.all(pluginPromises)
            .then(function(values) {
                values.forEach(function(data) {
                    if (data) {
                        meta.setProps(data);
                    }
                });

                return meta;
            });
    }
};

module.exports = Inspector;