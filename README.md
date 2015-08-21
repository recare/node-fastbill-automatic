# node-fastbill-automatic
A complete nodejs client for the fastbill automatic API

Now uses Promises.


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
    })
    .then(function(result){
        console.log(result);
        })
    .catch(function(err){
        if (err) throw new Error('Customer creation failed');
      // More stuff
    });
    


to-do:
- more examples
- more unit tests
