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
    util = require('util'),
    mandatory = require('mandatory'),
    FastbillAPI = require('./fastbill_api'),
    Error = require('utils/errors'),
    Promise = require('bluebird');

exports.instantiate = function instantiate(credentials) {
    return new Customer(credentials);
};

/**
 * __init__
 *
 * Defines the Customer API object which inherits from the Fastbill API object.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */
function Customer(credentials) {
    this.$scope = 'customer.';
    FastbillAPI.call(this, credentials);
}

util.inherits(Customer, FastbillAPI);

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
Customer.prototype.get = function get(options) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.CUSTOMERS);
        }

        options = options || {};
        mandatory(options).is('object', 'Customer::get - Please provide a proper options object.');

        vm.$request({
            service: vm.$scope + 'get',
            filter: options.filter,
            limit: options.limit,
            offset: options.offset
        }, onResult);
    });
};

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
 *     var customer = {
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

Customer.prototype.create = function create(customer) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.CUSTOMER_ID);
        }

        customer = customer || {};
        mandatory(customer).is('object', 'Customer::create - Please provide a proper customer object.');

        vm.$request({
            service: vm.$scope + 'create',
            data: customer
        }, onResult);
    });
};

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
 *     var modification = {
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

Customer.prototype.update = function update(id, modification) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        mandatory(id).is('number', 'Customer::update - Please provide a proper id of the customer that should be updated.');
        mandatory(modification).is('object', 'Customer::update - Please provide a proper object with modifications.');
        modification.CUSTOMER_ID = id;

        vm.$request({
            service: vm.$scope + 'update',
            data: modification
        }, onResult);
    });
};

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

Customer.prototype.delete = function del(id) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        mandatory(id).is('number', 'Customer::delete - Please provide a proper id of the customer that should be deleted');

        vm.$request({
            service: vm.$scope + 'delete',
            data: {CUSTOMER_ID: id}
        }, onResult);
    });
};