/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 *
 */

'use strict';

const http = require('http'),
    https = require('https'),
    url = require('url'),
    Promise = require('bluebird'),
    Error = require('./errors');

/**
 * Comfortable wrapper for performing a HTTP POST request.
 * 
 * Possible options:
 * 
 *     uri: {string}
 *     headers: {object}
 *     data: {string}
 * 
 * @param {object} options Possible request options
 * 
 */

function post (options) {
    return new Promise(function (resolve, reject) {
        var params;
        var request;

        options.uri = options.uri || '';
        params = url.parse(options.uri);
        params.method = 'POST';
        params.headers = options.headers;

        request = ('https:' === params.protocol ? https : http).request(
            params,
            function onResponse(response) {
                var body = '';

                response.on('data', function onData(data) {
                    body = body + data.toString();
                });

                response.on('end', function onEnd() {
                    body = body || {ERRORS: null};
                    resolve(body);
                });
            }
        );

        request.on('error', function onError(err) {
            console.log(err);
            return reject(
                new Error.FastbillConnectionError({
                    message: 'Communication error.',
                    detail: err
                })
            );
        });
        request.write(options.data || '');
        request.end();
    });
}

module.exports = {
    post : post
};