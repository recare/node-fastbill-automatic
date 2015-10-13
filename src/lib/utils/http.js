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

import http from 'http';
import https from 'https';
import url from 'url';
import bb from 'bluebird';
import Error from './errors';

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

export function post(options) {
    return new Promise(function (resolve, reject) {
        let params;
        let request;

        options.uri = options.uri || '';
        params = url.parse(options.uri);
        params.method = 'POST';
        params.headers = options.headers;

        request = (params.protocol === 'https:' ? https : http).request(
            params,
            function onResponse(response) {
                let body = '';

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
