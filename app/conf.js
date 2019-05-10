'use strict';
var fs = require('fs'),
    config = require('config')

module.exports = function (app) {
    app.conf = config;
    app.conf.baseDir = __dirname;
    // caCerts.push(fs.readFileSync(__dirname + '/cacert/AlphaSSLCA.cer'));
    // app.baseUrl = app.conf.get('targets.app.baseUrl');
    // Upstream backend app
    // global.bam = _buildUpstreamApp(app.conf.get('targets.bam.baseUrl'));

};