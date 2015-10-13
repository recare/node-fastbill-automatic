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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.customerFactory = customerFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fastbill_api = require('./fastbill_api');

var _utilsErrors = require('./utils/errors');

var _utilsErrors2 = _interopRequireDefault(_utilsErrors);

var _utilsType_handler = require('./utils/type_handler');

function customerFactory(credentials) {
    return new Customer(credentials);
}

/**
 * __init__
 *
 * Defines the Customer API object which inherits from the Fastbill API object.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

var Customer = (function (_FastbillAPI) {
    _inherits(Customer, _FastbillAPI);

    function Customer(credentials) {
        _classCallCheck(this, Customer);

        _get(Object.getPrototypeOf(Customer.prototype), 'constructor', this).call(this, credentials);
        this.$scope = 'customer.';
    }

    /**
     * Customer#get
     *
     * Requests a set of (filtered) Customer objects from the Fastbill API.
     * Returns an array of customer objects.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.get
     *
     * Possible options:
     *
     *     limit: Limits the result set
     *     offset: ResultSet offset
     *     filter: Filter parameter for restricting the result set
     *
     * @param {object} options Possible request options (see above)
     *
     */

    _createClass(Customer, [{
        key: 'get',
        value: function get(options) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.CUSTOMERS);
                }

                options = options || {};
                (0, _utilsType_handler.typeOf)(options).mustBe('object');

                vm.$request({
                    service: vm.$scope + 'get',
                    filter: options.filter,
                    limit: options.limit,
                    offset: options.offset
                }, onResult);
            });
        }

        /**
         * Customer#create
         *
         * Creates a new customer
         *
         * The customer id of the newly created customer will be passed
         * to the callback function.
         * Returns the customer's customer id on success.
         *
         * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.create
         *
         * Usage example:
         *
         *     let customer = {
         *            CUSTOMER_NUMBER: 'my-id-123'
         *            CUSTOMER_TYPE: 'consumer',
         *            FIRST_NAME:'test,
         *            LAST_NAME: 'test'
         *     };
         *
         *     fastbill.customer.create(customer).then(...).catch(...)
         *
         * @param {object} customer The customer that should be created.
         *
         */

    }, {
        key: 'create',
        value: function create(customer) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.CUSTOMER_ID);
                }

                customer = customer || {};
                (0, _utilsType_handler.typeOf)(customer).mustBe('object');

                vm.$request({
                    service: vm.$scope + 'create',
                    data: customer
                }, onResult);
            });
        }

        /**
         * Customer#update
         *
         * Updates the information of a customer.
         * Returns true on success.
         *
         * See: * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.update
         *
         * Usage example:
         *
         *     let modification = {
         *         FIRST_NAME: 'André'
         *     };
         *
         *     node-fastbill-automatic.customer.update(1, modification).then(...).catch(...)
         *
         *
         * @param {number} id The id of the customer that should be updated.
         * @param {object} modification The modifications.
         *
         */

    }, {
        key: 'update',
        value: function update(id, modification) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(true);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');
                (0, _utilsType_handler.typeOf)(modification).mustBe('object');

                modification.CUSTOMER_ID = id;

                vm.$request({
                    service: vm.$scope + 'update',
                    data: modification
                }, onResult);
            });
        }

        /**
         * Customer#delete
         *
         * Deletes a customer.
         * Returns true on success.
         *
         * See: http://www.node-fastbill-automatic.com/api/en/customer.html#customer.delete
         *
         * Usage example:
         *
         *     node-fastbill-automatic.customer.delete(1).catch(...).then(...)
         *
         * @param {number} id The id of the customer that should be deleted.
         *
         */

    }, {
        key: 'remove',
        value: function remove(id) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(true);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                vm.$request({
                    service: vm.$scope + 'delete',
                    data: { CUSTOMER_ID: id }
                }, onResult);
            });
        }
    }]);

    return Customer;
})(_fastbill_api.FastbillAPI);