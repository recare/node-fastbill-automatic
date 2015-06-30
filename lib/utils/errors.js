/*
 *
 * Contains custom error classes to wrap errors and handle them better.
 * Adds logging functionality to errors.
 *
 * Strongly inspired by stripe-node, kudos
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 */

'use strict';

const
    utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error class wrapper
 */

function _Error(raw) {
    this.populate.apply(this, arguments);
    this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);
_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function (type, message) {
    this.type = type;
    this.message = message;
};
_Error.extend = utils.protoExtend;

/**
 * Create subclasses of internal Error class to reflect
 */

var FastbillError = _Error.VeyoError = _Error.extend({
    type: 'FastbillError',
    populate: function (raw) {

        this.type = this.type; // so it appears in stringified object
        this.stack = (new Error(raw.message)).stack;
        this.rawType = raw.type;
        this.code = raw.code;
        this.param = raw.param;
        this.message = raw.message;
        this.detail = raw.detail;
        this.raw = raw;

    }
});

// Specific internal Error classes
_Error.FastbillValueError = FastbillError.extend({
    type: 'FastbillValueError'
});
_Error.FastbillTypeError = FastbillError.extend({
    type: 'FastbillTypeError'
});
_Error.FastbillValueError = FastbillError.extend({
    type: 'FastbillValueError'
});
_Error.FastbillConnectionError = FastbillError.extend({
    type: 'FastbillConnectionError'
});
_Error.FastbillInvalidRequestError = FastbillError.extend({
    type: 'FastbillInvalidRequestError'
});