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

import {customerFactory} from './customer';
import {invoiceFactory} from './invoice';
import {subscriptionFactory} from './subscription';
import {typeOf} from './utils/type_handler';

/**
 * Creates a FastBill communication object that provides the access to all
 * available API services.
 *
 * Usage example:
 *
 *      var FastBill = require('node-fastbill-automatic');
 *      var fastbill = FastBill.instantiate({email: '', apikey: ''});
 *      fastbill.customer.get(...);
 *
 * @param {object} credentials E-Mail address and the API key.
 * @returns {object}
 *
 */

export function instantiate(credentials) {

    typeOf(credentials).mustBe('object');

    return {
        customer: customerFactory(credentials),
        invoice: invoiceFactory(credentials),
        subscription: subscriptionFactory(credentials)
    };
}
