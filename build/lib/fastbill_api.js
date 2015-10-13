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

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsHttp = require('./utils/http');

var _utilsErrors = require('./utils/errors');

var _utilsErrors2 = _interopRequireDefault(_utilsErrors);

var FastbillAPI = (function () {
    function FastbillAPI(credentials) {
        _classCallCheck(this, FastbillAPI);

        var auth = new Buffer(credentials.email + ':' + credentials.apikey).toString('base64');
        this.$uri = 'https://automatic.fastbill.com/api/1.0/api.php';
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

    _createClass(FastbillAPI, [{
        key: '$request',
        value: function $request(payload, callback) {
            var options = {
                uri: this.$uri,
                headers: this.$headers,
                data: payload && JSON.stringify(payload)
            };

            (0, _utilsHttp.post)(options).then(function (data) {
                try {
                    data = JSON.parse(data).RESPONSE;
                } catch (e) {
                    return callback(new _utilsErrors2['default'].FastbillInvalidRequestError({
                        message: 'Unable to parse response',
                        detail: e
                    }));
                }

                // Check if the FastBill API responds with errors
                // If so, create an error object with the first available error message.
                if (data.ERRORS) {
                    return callback(new _utilsErrors2['default'](data.ERRORS[0]));
                }
                callback(null, data);
            })['catch'](function (err) {
                return callback(err, null);
            });
        }
    }]);

    return FastbillAPI;
})();

exports.FastbillAPI = FastbillAPI;