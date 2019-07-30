'use strict';
const fs = require('fs'),
    config = require('config')
const superagent = require('superagent');
module.exports = app => {
    app.conf = config;
    global.api  = buildUpstreamApp(app.conf.get('targets.appApi.baseUrl'));
    function buildUpstreamApp(baseUrl) {
        let upstreamApp = (ctx) => {
            let httpClient={};
            ['get', 'post', 'delete', 'put'].forEach((method) => {
                httpClient[method] = async (url, data) => {
                    let methodFn = superagent[method];
                    let responsePromise = methodFn.call(null, baseUrl + url, data).set('Content-Type',"application/json;charset=UTF-8");
                    try {
                        let response = await responsePromise;
                        return response.body;

                    } catch (e) {
                        return {
                            err: url +'/'+ e.Error
                        }
                    };

                }
            })
            return httpClient
        }
        return upstreamApp
    }

};