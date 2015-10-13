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

import chai from 'chai';
import nock from 'nock';

const FastBill = require('../index');
const expect = chai.expect;
const assert = chai.assert;


describe('The FastbillAPIs Customer Interface', function () {

    var fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Customer.get', function () {
        it('should be defined', function () {
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });

        it('should respond with a list of customers', function (done) {
            // set up mock response
            nock(fastbill.customer.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        CUSTOMERS: ['object', 'object', 'object'],
                        ERRORS: null
                    }

                });

            var options = {};
            fastbill.customer.get(options)
                .then(customers =>
                {
                    console.log(customers);
                    assert.isArray(customers, 'Returns a list of customer objects.');
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

    });

    describe('Customer.create', function () {
        it('should be defined', function () {
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });


        it('should respond with a fastbill customer id', function (done) {

            // set up mock response
            nock(fastbill.customer.$uri)
                .post('', function (body) {
                    return body.service === 'customer.create';
                })
                .reply(200, {
                    RESPONSE: {
                        CUSTOMER_ID: 1,
                        ERRORS: null
                    }

                });

            var customer = {some: 'customerdata'};
            var promise = fastbill.customer.create(customer);

            promise.then(function (customer) {
                assert.typeOf(customer, 'number', 'Returns a customer_id.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Customer.update', function () {
        it('should be defined', function () {
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });


        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.customer.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        ERRORS: null,
                        STATUS: 'success'
                    }
                });

            var id = 1,
                modification = {FIRST_NAME: 'max'};

            var promise = fastbill.customer.update(id, modification);
            promise.then(function (result) {
                assert.equal(result, true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Customer.remove', function () {
        it('should be defined', function () {
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('remove')).to.equal(true);
        });


        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.customer.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id = 1;

            var promise = fastbill.customer.remove(id);
            promise.then(function (result) {
                assert.equal(result, true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

});