'use strict';

var chai = require('chai');
chai.config.includeStack = true;
var path = require('path');
var fs = require('fs');
var auth = null;

try {
    var token = fs.readFileSync(path.join(__dirname, '.auth/token.txt'));
    auth = {
        type: 'oauth',
        token: token
    };
} catch(e) {

}

describe('github-repo-meta', function() {
    it.only('should allow gathering data on a Node.js project (Marko)', function(done) {
        var inspector = require('../').createInspector({
            auth: auth
        });
        inspector.inspectRepo('marko-js/marko')
            .then(function(meta) {
                console.log('META:', JSON.stringify(meta, null, 2));
                done();
            })
            .catch(done);
    });

    it('should allow gathering data on a non-Node.js project (hadoop)', function(done) {
        var inspector = require('../').createInspector({
            auth: auth
        });
        inspector.inspectRepo('apache/hadoop')
            .then(function(meta) {
                console.log('META:', meta);
                done();
            })
            .catch(done);
    });
});