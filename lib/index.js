/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 *
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 *
 */

'use strict';

const
    mandatory = require('mandatory'),
    Customer = require('./customer'),
    Invoice = require('./invoice'),
    Subscription = require('./subscription');

/**
 * Creates a FastBill communication object that provides the access to all
 * available API services.
 * 
 * Usage example:
 * 
 *     var FastBill = require('node-fastbill-automatic');
 * 
 *     var fastbill = FastBill.instantiate({email: '', apikey: ''});
 * 
 *     fastbill.customer.get(...);
 * 
 * @param {object} credentials E-Mail address and the API key.
 * 
 * @returns {object}
 * 
 */

exports.instantiate = function instantiate (credentials) {

    mandatory(credentials).is('object', 'Please provide the proper credentials for the FastBill API.');

    return {
        customer: Customer.instantiate(credentials),
        invoice: Invoice.instantiate(credentials),
        subscription: Subscription.instantiate(credentials)
    };
};