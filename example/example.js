/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 * This example demonstrates how to use node-fastbill-automatic.
 *
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 *
 */

'use strict';

var
    config = require('./config'),
    fastbill = require('../index').instantiate(
        {
            email: config.fastbillEmail,
            apikey: config.fastbillApiKey
        }
    );

// 1. create a customer

fastbill.customer.create(
    {
        CUSTOMER_NUMBER: '1',
        CUSTOMER_TYPE: 'consumer',
        FIRST_NAME: 'Max',
        LAST_NAME: 'Michael'
    }, function(err, data){
        if (err) throw new Error('Customer creation failed');

        // 2. create an invoice
       //TODO: continue example

    });



