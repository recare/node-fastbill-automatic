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
    FastBill = require('../');

describe('The API Wrapper Object', function () {
    
    var credentials = {email: '', apikey: ''};
    
    it('should be instantiate as expected', function () {
        var fastbill = FastBill.instantiate(credentials);
        
        expect(fastbill).toBeDefined();
    });

    it('should have interfaces for Customers, Subscriptions and Invoices', function () {
        var fastbill = FastBill.instantiate(credentials);

        expect(fastbill.customer).toBeDefined();
        expect(fastbill.customer.constructor.name).toBe('Customer');

        expect(fastbill.invoice).toBeDefined();
        expect(fastbill.invoice.constructor.name).toBe('Invoice');

        expect(fastbill.subscription).toBeDefined();
        expect(fastbill.subscription.constructor.name).toBe('Subscription');
    });
    
    it('should throw an error when no credentials are passed for instantiation', function () {
        var fastbill;

        try {
            fastbill = FastBill.instantiate();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });
    

});