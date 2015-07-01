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

const
    http = require('./utils/http'),
    Error = require('./utils/errors');

module.exports = FastbillAPI;

function FastbillAPI(credentials) {
    var auth = new Buffer(credentials.email + ':' + credentials.apikey)
<<<<<<< HEAD
        .toString('base64');
    this.$uri = 'https://automatic.fastbill.com/api/1.0/api.php';
=======
            .toString('base64');

    this.$uri = 'https://fastbill-automatic.com/api/1.0/api.php';

>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
    this.$headers = {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
    };
}

/**
 * Performs a HTTP request against the FastBill API.
 *
 * @param {object} payload The request pattern (e.g. filter, data, service, etc.)
 * @param {function} callback Error-first callback (err, parsedResultSet)
 *
 */

FastbillAPI.prototype.$request = function $request(payload, callback) {
    var options = {
        uri: this.$uri,
        headers: this.$headers,
        data: payload && JSON.stringify(payload)
    };
<<<<<<< HEAD

    http.post(options)
        .then(function(data){
            console.log(data);
            try {
                data = JSON.parse(data).RESPONSE;
            } catch (e) {
                return callback(new Error.FastbillInvalidRequestError({
                    message: 'Unable to parse response',
                    detail: e
                }));
            }
=======
    
    function onResponse (err, data) {

        if (err) return callback(err, null);

        try {
            data = JSON.parse(data).RESPONSE;
        } catch (e) {
            return callback(new Error('Unable to parse response'));
        }

        // Check if the FastBill API responds with errors
        // If so, create an error object with the first available error message.
        if (data.ERRORS){
            return callback(new Error(data.ERRORS[0]));
        }


        callback(null, data);
    }
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc

            // Check if the FastBill API responds with errors
            // If so, create an error object with the first available error message.
            if (data.ERRORS) {
                return callback(new Error(data.ERRORS[0]));
            }
            callback(null, data);
        })
        .catch(function(err){
            return callback(err, null);
        });
};