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

var util = require('util');

var mandatory = require('mandatory');

var FastbillAPI = require('./fastbill_api');

exports.instantiate = function instantiate (credentials) {
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
function Customer (credentials) {
    this.$scope = 'customer.';

    FastbillAPI.call(this, credentials);
}

util.inherits(Customer, FastbillAPI);

/**
 * Customer#get
 *
 * Requests a set of (filtered) Customer objects from the Fastbill API. *
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
 * @param {function} callback Error-first callback (err, customers)
 * 
 */
Customer.prototype.get = function get (options, callback) {

    function onResult (err, resultset) {

        if (err) {
            return callback(err, null);
        }

        callback(null, resultset.CUSTOMERS);
    }

    if ('function' === typeof options) {
        callback = options;
        options = undefined;
    }

    options = options || {};

    mandatory(options).is('object', 'Customer::get - Please provide a proper options object.');
    mandatory(callback).is('function', 'Customer::get - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'get',
        filter: options.filter,
        limit: options.limit,
        offset: options.offset
    }, onResult);
};

/**
 * Customer#create
 *
 * Creates a new customer
 * 
 * The customer id of the newly created customer will be passed
 * to the callback function.
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
 *     fastbill.customer.create(customer, function (err, id) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log(id);
 *     });
 * 
 * @param {object} customer The customer that should be created.
 * @param {function} callback Error-first callback (err, customerId)
 * 
 */

Customer.prototype.create = function create (customer, callback) {

    function onResult (err, results) {

        if (err) {
            return callback(err, null);
        }

        callback(null, results.CUSTOMER_ID);
    }

    if ('function' === typeof customer) {
        callback = customer;
        customer = undefined;
    }

    customer = customer || {};


    mandatory(customer).is('object', 'Customer::create - Please provide a proper customer object.');
    mandatory(callback).is('function', 'Customer::create - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'create',
        data: customer
    }, onResult);
};

/**
 * Customer#update
 *
 * Updates the information of a customer.
 * 
 * See: * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.update
 * 
 * Usage example:
 * 
 *     var modification = {
 *         FIRST_NAME: 'André'
 *     };
 *
 *     node-fastbill-automatic.customer.update(1, modification, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 *
 * @param {number} id The id of the customer that should be updated.
 * @param {object} modification The modifications.
 * @param {function} callback Error-first callback (err)
 *
 */
Customer.prototype.update = function update (id, modification, callback) {
    
    function onResult (err) {
        if (err) {
            return callback(err, null);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Customer::update - Please provide a proper id of the customer that should be updated.');
    mandatory(modification).is('object', 'Customer::update - Please provide a proper object with modifications.');
    mandatory(callback).is('function', 'Customer::update - Please provide a proper callback function.');

    modification.CUSTOMER_ID = id;
    
    this.$request({
        service: this.$scope + 'update',
        data: modification
    }, onResult);
};

/**
 * Customer#delete
 *
 * Deletes a customer.
 * 
 * See: http://www.node-fastbill-automatic.com/api/en/customer.html#customer.delete
 * 
 * Usage example:
 *
 *     node-fastbill-automatic.customer.delete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the customer that should be deleted.
 * @param {function} callback Error-first callback (err)
 * 
 */
Customer.prototype.delete = function del (id, callback) {
    
    function onResult (err) {
        if (err) {
            return callback(err, null);
        }
    
        callback(null);
    }

    if ('function' === typeof id) {
        callback = id;
        id = undefined;
    }

    mandatory(id).is('number', 'Customer::delete - Please provide a proper id of the customer that should be deleted');
    mandatory(callback).is('function', 'Customer::delete - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'delete',
        data: {CUSTOMER_ID: id}
    }, onResult);
};