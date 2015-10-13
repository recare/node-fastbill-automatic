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

/**
 * Generic Error class wrapper
 */

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtendableError = (function (_Error) {
    _inherits(ExtendableError, _Error);

    function ExtendableError(message) {
        _classCallCheck(this, ExtendableError);

        _get(Object.getPrototypeOf(ExtendableError.prototype), 'constructor', this).call(this);
        this.message = message;
        this.stack = new Error().stack;
        this.name = this.constructor.name;
    }

    /**
     * Create subclasses of internal Error class to reflect
     */

    return ExtendableError;
})(Error);

var FastbillError = (function (_ExtendableError) {
    _inherits(FastbillError, _ExtendableError);

    function FastbillError(message) {
        _classCallCheck(this, FastbillError);

        _get(Object.getPrototypeOf(FastbillError.prototype), 'constructor', this).call(this, message);
    }

    return FastbillError;
})(ExtendableError);

exports.FastbillError = FastbillError;

var FastbilValueError = (function (_ExtendableError2) {
    _inherits(FastbilValueError, _ExtendableError2);

    function FastbilValueError(message) {
        _classCallCheck(this, FastbilValueError);

        _get(Object.getPrototypeOf(FastbilValueError.prototype), 'constructor', this).call(this, message);
    }

    return FastbilValueError;
})(ExtendableError);

exports.FastbilValueError = FastbilValueError;

var FastbillTypeError = (function (_ExtendableError3) {
    _inherits(FastbillTypeError, _ExtendableError3);

    function FastbillTypeError(message) {
        _classCallCheck(this, FastbillTypeError);

        _get(Object.getPrototypeOf(FastbillTypeError.prototype), 'constructor', this).call(this, message);
    }

    return FastbillTypeError;
})(ExtendableError);

exports.FastbillTypeError = FastbillTypeError;

var FastbillConnectionError = (function (_ExtendableError4) {
    _inherits(FastbillConnectionError, _ExtendableError4);

    function FastbillConnectionError(message) {
        _classCallCheck(this, FastbillConnectionError);

        _get(Object.getPrototypeOf(FastbillConnectionError.prototype), 'constructor', this).call(this, message);
    }

    return FastbillConnectionError;
})(ExtendableError);

exports.FastbillConnectionError = FastbillConnectionError;

var FastbillInvalidRequestError = (function (_ExtendableError5) {
    _inherits(FastbillInvalidRequestError, _ExtendableError5);

    function FastbillInvalidRequestError(message) {
        _classCallCheck(this, FastbillInvalidRequestError);

        _get(Object.getPrototypeOf(FastbillInvalidRequestError.prototype), 'constructor', this).call(this, message);
    }

    return FastbillInvalidRequestError;
})(ExtendableError);

exports.FastbillInvalidRequestError = FastbillInvalidRequestError;