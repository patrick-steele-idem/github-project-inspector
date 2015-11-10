github-project-inspector
========================

_WARNING: This project is pre 1.0. Use at own risk._

This utility module uses the Github API to gather metadata about a project by reading information directly from Github. This module uses the Github API to inspect the repository, organization and read various files. All of the data is collected by plugins and the data is merged into a single "metadata" object.

# Usage

```javascript
var inspector = require('github-project-inspector').createInspector({
    auth: { // Optional token to increase the rate limit
        type: 'oauth',
        token: 'abc123'
    },
    plugins: [
        'package', // Reads package.json (if it exists)
        'readme',  // Reads the repo's default README file (if it exists)
        'org',     // Reads the data for the repo's Github organization
        'repo'     // Reads the data for the Github repo
    ]
});

inspector.inspectRepo('marko-js/marko')
    .then(function(meta) {
        console.log(JSON.stringify(meta, null, 2));
    })
    .catch(function(e) {
        // Handle the error...
    });
```

Output will be similar to the following:


```json
{
  "maintainers": [
    {
      "name": "Patrick Steele-Idem",
      "email": "pnidem@gmail.com"
    }
  ],
  "contributors": [],
  "author": {
    "name": "Patrick Steele-Idem",
    "email": "pnidem@gmail.com"
  },
  "keywords": [
    "templating",
    "template",
    "async",
    "streaming"
  ],
  "description": "Marko is an extensible, streaming, asynchronous, high performance, HTML-based templating language that can be used in Node.js or in the browser.",
  "name": "marko",
  "license": "Apache-2.0",
  "homepage": "http://markojs.com/",
  "version": "2.7.29",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/marko-js/marko.git"
  },
  "scripts": {
    "init-tests": "./test/init-tests.sh",
    "test": "npm run init-tests && node_modules/.bin/mocha --ui bdd --reporter spec ./test && node_modules/.bin/jshint compiler/ runtime/ taglibs/",
    "test-fast": "npm run init-tests && node_modules/.bin/mocha --ui bdd --reporter spec ./test/render-test",
    "test-async": "npm run init-tests && node_modules/.bin/mocha --ui bdd --reporter spec ./test/render-async-test",
    "test-taglib-loader": "npm run init-tests && node_modules/.bin/mocha --ui bdd --reporter spec ./test/taglib-loader-test",
    "jshint": "node_modules/.bin/jshint compiler/ runtime/ taglibs/"
  },
  "dependencies": {
    "app-module-path": "^1.0.0",
    "async-writer": "^1.4.0",
    "browser-refresh-client": "^1.0.0",
    "char-props": "~0.1.5",
    "events": "^1.0.2",
    "htmlparser2": "^3.7.2",
    "jsonminify": "^0.2.3",
    "marko-async": "^2.0.0",
    "marko-layout": "^2.0.0",
    "minimatch": "^0.2.14",
    "property-handlers": "^1.0.0",
    "raptor-args": "^1.0.0",
    "raptor-json": "^1.0.1",
    "raptor-logging": "^1.0.1",
    "raptor-modules": "^1.0.5",
    "raptor-polyfill": "^1.0.0",
    "raptor-promises": "^1.0.1",
    "raptor-regexp": "^1.0.0",
    "raptor-strings": "^1.0.0",
    "raptor-util": "^1.0.0",
    "resolve-from": "^1.0.0",
    "sax": "^0.6.0",
    "try-require": "^1.2.1"
  },
  "devDependencies": {
    "bluebird": "^2.9.30",
    "chai": "~1.8.1",
    "jshint": "^2.5.0",
    "mocha": "~1.15.1",
    "through": "^2.3.4"
  },
  "bin": {
    "markoc": "bin/markoc"
  },
  "main": "runtime/marko-runtime.js",
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  },
  "browser": {
    "./node-require.js": "./node-require-browser.js"
  },
  "bugs": {
    "url": "https://github.com/marko-js/marko/issues"
  },
  "_id": "marko@2.7.29",
  "readme": {
    "name": "README.md",
    "path": "README.md",
    "sha": "b2fd1f1f012e3f4c97f9cef20435b099b0d5fab7",
    "size": 1634,
    "url": "https://api.github.com/repos/marko-js/marko/contents/README.md?ref=master",
    "html_url": "https://github.com/marko-js/marko/blob/master/README.md",
    "git_url": "https://api.github.com/repos/marko-js/marko/git/blobs/b2fd1f1f012e3f4c97f9cef20435b099b0d5fab7",
    "download_url": "https://raw.githubusercontent.com/marko-js/marko/master/README.md",
    "type": "file",
    "content": "![Marko Logo](https://raw.githubusercontent.com/marko-js/branding/master/marko-logo-small.png)\n\n[![Build Status](https://travis-ci.org/marko-js/marko.svg?branch=master)](https://travis-ci.org/marko-js/marko) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/marko-js/marko)\n[![NPM](https://nodei.co/npm/marko.png)](https://nodei.co/npm/marko/)\n[![Downloads](https://img.shields.io/npm/dm/marko.svg)](http://npm-stat.com/charts.html?package=marko)\n\nMarko is a fast and lightweight HTML-based templating engine that compiles templates to CommonJS modules and supports streaming, async rendering and custom tags. Learn more on [http://markojs.com/](http://markojs.com/).\n\n# Changelog\n\nSee [CHANGELOG.md](CHANGELOG.md)\n\n# Discuss\n\n- Chat channel:  [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/marko-js/marko)\n- Twitter: please use the `#MarkoJS` hashtag. Follow [@MarkoDevTeam](https://twitter.com/MarkoDevTeam)\n\nQuestions or comments can also be posted on the [Marko Github issues](https://github.com/marko-js/marko/issues) page.\n\n# Maintainers\n\n* [Patrick Steele-Idem](https://github.com/patrick-steele-idem) (Twitter: [@psteeleidem](http://twitter.com/psteeleidem))\n* [Phillip Gates-Idem](https://github.com/philidem/) (Twitter: [@philidem](https://twitter.com/philidem))\n* [Martin Aberer](https://github.com/tindli) (Twitter: [@metaCoffee](https://twitter.com/metaCoffee))\n\n# Contribute\n\nPull Requests welcome. Please make sure all tests pass:\n\n```\nnpm test\n```\n\nPlease submit Github issues for any feature enhancements, bugs or documentation problems.\n\n# License\n\nApache License v2.0\n",
    "encoding": "base64",
    "_links": {
      "self": "https://api.github.com/repos/marko-js/marko/contents/README.md?ref=master",
      "git": "https://api.github.com/repos/marko-js/marko/git/blobs/b2fd1f1f012e3f4c97f9cef20435b099b0d5fab7",
      "html": "https://github.com/marko-js/marko/blob/master/README.md"
    }
  },
  "githubOrg": {
    "login": "marko-js",
    "id": 11873696,
    "url": "https://api.github.com/orgs/marko-js",
    "repos_url": "https://api.github.com/orgs/marko-js/repos",
    "events_url": "https://api.github.com/orgs/marko-js/events",
    "members_url": "https://api.github.com/orgs/marko-js/members{/member}",
    "public_members_url": "https://api.github.com/orgs/marko-js/public_members{/member}",
    "avatar_url": "https://avatars.githubusercontent.com/u/11873696?v=3",
    "description": "",
    "name": "MarkoJS",
    "company": null,
    "blog": "http://markojs.com",
    "location": "",
    "email": "",
    "public_repos": 13,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "html_url": "https://github.com/marko-js",
    "created_at": "2015-04-09T15:44:32Z",
    "updated_at": "2015-10-08T15:28:13Z",
    "type": "Organization",
    "total_private_repos": 0,
    "owned_private_repos": 0,
    "private_gists": 0,
    "disk_usage": 16160,
    "collaborators": 0,
    "billing_email": "pnidem@gmail.com",
    "plan": {
      "name": "free",
      "space": 976562499,
      "private_repos": 0
    }
  },
  "logo": {
    "url": "https://avatars.githubusercontent.com/u/11873696?v=3"
  },
  "githubRepo": {
    "id": 15720445,
    "name": "marko",
    "full_name": "marko-js/marko",
    "owner": {
      "login": "marko-js",
      "id": 11873696,
      "avatar_url": "https://avatars.githubusercontent.com/u/11873696?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/marko-js",
      "html_url": "https://github.com/marko-js",
      "followers_url": "https://api.github.com/users/marko-js/followers",
      "following_url": "https://api.github.com/users/marko-js/following{/other_user}",
      "gists_url": "https://api.github.com/users/marko-js/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/marko-js/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/marko-js/subscriptions",
      "organizations_url": "https://api.github.com/users/marko-js/orgs",
      "repos_url": "https://api.github.com/users/marko-js/repos",
      "events_url": "https://api.github.com/users/marko-js/events{/privacy}",
      "received_events_url": "https://api.github.com/users/marko-js/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/marko-js/marko",
    "description": "Marko template engine",
    "fork": false,
    "url": "https://api.github.com/repos/marko-js/marko",
    "forks_url": "https://api.github.com/repos/marko-js/marko/forks",
    "keys_url": "https://api.github.com/repos/marko-js/marko/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/marko-js/marko/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/marko-js/marko/teams",
    "hooks_url": "https://api.github.com/repos/marko-js/marko/hooks",
    "issue_events_url": "https://api.github.com/repos/marko-js/marko/issues/events{/number}",
    "events_url": "https://api.github.com/repos/marko-js/marko/events",
    "assignees_url": "https://api.github.com/repos/marko-js/marko/assignees{/user}",
    "branches_url": "https://api.github.com/repos/marko-js/marko/branches{/branch}",
    "tags_url": "https://api.github.com/repos/marko-js/marko/tags",
    "blobs_url": "https://api.github.com/repos/marko-js/marko/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/marko-js/marko/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/marko-js/marko/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/marko-js/marko/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/marko-js/marko/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/marko-js/marko/languages",
    "stargazers_url": "https://api.github.com/repos/marko-js/marko/stargazers",
    "contributors_url": "https://api.github.com/repos/marko-js/marko/contributors",
    "subscribers_url": "https://api.github.com/repos/marko-js/marko/subscribers",
    "subscription_url": "https://api.github.com/repos/marko-js/marko/subscription",
    "commits_url": "https://api.github.com/repos/marko-js/marko/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/marko-js/marko/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/marko-js/marko/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/marko-js/marko/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/marko-js/marko/contents/{+path}",
    "compare_url": "https://api.github.com/repos/marko-js/marko/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/marko-js/marko/merges",
    "archive_url": "https://api.github.com/repos/marko-js/marko/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/marko-js/marko/downloads",
    "issues_url": "https://api.github.com/repos/marko-js/marko/issues{/number}",
    "pulls_url": "https://api.github.com/repos/marko-js/marko/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/marko-js/marko/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/marko-js/marko/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/marko-js/marko/labels{/name}",
    "releases_url": "https://api.github.com/repos/marko-js/marko/releases{/id}",
    "created_at": "2014-01-07T23:58:21Z",
    "updated_at": "2015-11-10T16:53:25Z",
    "pushed_at": "2015-11-10T17:23:05Z",
    "git_url": "git://github.com/marko-js/marko.git",
    "ssh_url": "git@github.com:marko-js/marko.git",
    "clone_url": "https://github.com/marko-js/marko.git",
    "svn_url": "https://github.com/marko-js/marko",
    "homepage": "http://markojs.com/",
    "size": 3745,
    "stargazers_count": 557,
    "watchers_count": 557,
    "language": "JavaScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "forks_count": 41,
    "mirror_url": null,
    "open_issues_count": 22,
    "forks": 41,
    "open_issues": 22,
    "watchers": 557,
    "default_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "marko-js",
      "id": 11873696,
      "avatar_url": "https://avatars.githubusercontent.com/u/11873696?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/marko-js",
      "html_url": "https://github.com/marko-js",
      "followers_url": "https://api.github.com/users/marko-js/followers",
      "following_url": "https://api.github.com/users/marko-js/following{/other_user}",
      "gists_url": "https://api.github.com/users/marko-js/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/marko-js/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/marko-js/subscriptions",
      "organizations_url": "https://api.github.com/users/marko-js/orgs",
      "repos_url": "https://api.github.com/users/marko-js/repos",
      "events_url": "https://api.github.com/users/marko-js/events{/privacy}",
      "received_events_url": "https://api.github.com/users/marko-js/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 41,
    "subscribers_count": 32
  }
}
```