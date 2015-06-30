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
    FastBill = require('../'),
    nock = require('nock'),
    expect = require('chai').expect,
    assert = require('chai').assert;


describe('The FastbillAPIs Invoice Interface', function () {

    var fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Invoice.get', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });



        it('should respond with a list of invoices', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('', function (body) {
                    return body.service == 'invoice.get';
                })
                .reply(200, {
                    RESPONSE: {
                        INVOICES: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            var options = {some: 'object'};
            var promise = fastbill.invoice.get(options);

            promise.then(function (result) {
                assert.typeOf(result, 'array', 'Returns a list of objects.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Invoice.create', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });


        it('should respond with a fastbill invoice id', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        INVOICE_ID: 1,
                        ERRORS: null
                    },
                    INVOICE_ID: 1
                });

            var newInvoice = {
                ITEMS: ['test'],
                CUSTOMER_ID: 1
            };
            var promise = fastbill.invoice.create(newInvoice);

            promise.then(function (result) {
                assert.typeOf(result, 'number', 'Returns a invoice_id.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });

    });

    describe('Invoice.update', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });

        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id = 1,
                modification = {CURRENCY: 'EUR'};
            var promise = fastbill.invoice.update(id, modification);

            promise.then(function (result) {
                expect(result).to.equal(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });

    });


    describe('Invoice.delete', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('delete')).to.equal(true);
        });


        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.invoice.delete(id);

            promise.then(function (result) {
                expect(result).to.equal(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });


        });
    });

    describe('Invoice.complete', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('complete')).to.equal(true);
        });



        it('should not respond with an invoice number', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.invoice.complete(id);

            promise.then(function (result) {
                expect(result).to.equal(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });

        });
    });

    describe('Invoice.cancel', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('cancel')).to.equal(true);
        });


        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }

                });

            var id = 1;
            var promise = fastbill.invoice.cancel(id);

            promise.then(function (result) {
                expect(result).to.equal(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Invoice.sign', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('sign')).to.equal(true);
        });



        it('should respond with the number of remaining credits on the account', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        REMAINING_CREDITS: 10,
                        ERRORS: null
                    }

                });

            var id = 1;
            var promise = fastbill.invoice.sign(id);

            promise.then(function (result) {
                assert.typeOf(result, 'number', 'Responds with a number of credits.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Invoice.setpaid', function () {
        it('should be defined', function () {
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('setpaid')).to.equal(true);
        });



        it('should respond with an invoice number', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.invoice.setpaid(id, new Date().now());

            promise.then(function (result) {
                assert.typeOf(result, 'number', 'Responds with an invoice number.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

});