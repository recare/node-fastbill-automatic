'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.typeOf = typeOf;

var _errors = require('./errors');

function typeOf(param) {
    return {
        mustBe: function mustBe(type) {
            if (typeof param !== type) {
                throw new _errors.FastbillTypeError(param + ' is not of expected type ' + type);
            } else {
                return true;
            }
        }
    };
}