# node-fastbill-automatic
A complete nodejs client for the fastbill automatic API

# quick start

    npm install node-fastbill-automatic

# first example

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
      // More stuff
    });


to-do:
- more examples
- more meaningful unit tests


inspired by:
https://www.npmjs.com/package/fastbill
