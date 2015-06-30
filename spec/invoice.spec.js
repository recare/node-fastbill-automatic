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


var FastBill = require('../'),
    nock = require('nock'),
    expect = require('chai').expect,
    assert = require('chai').assert;


describe('The FastbillAPIs Invoice Interface', function () {

    var fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Invoice.get', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.get();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.get(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.get({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.get([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a list of invoices', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('', function(body){
                    return body.service == 'invoice.get';
                })
                .reply(200, {
                    RESPONSE:{
                        INVOICES: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            var options = {some: 'object'};

            fastbill.invoice.get(options, function(err, invoices){
                expect(err).to.equal(null);
                console.log(invoices);
                //assert.isArray(invoices, 'Returns a list of invoice objects.');
            });

        });
    });

    describe('Invoice.create', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.create();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.create(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.create({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.create([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a fastbill invoice id', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        INVOICE_ID: 1,
                        ERRORS: null
                    },
                    INVOICE_ID: 1
                });

            var newInvoice = {
                ITEMS: ['test'],
                CUSTOMER_ID: 1
            };

            fastbill.invoice.create(newInvoice, function(err, invoiceId){
                expect(err).to.equal(null);
                assert.typeOf(invoiceId, 'number', 'Returns a invoice_id.');
            });

        });

    });

    describe('Invoice.update', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.update();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.update(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.update({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.update([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

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

            fastbill.invoice.update(id, modification, function(err){
                assert.equal(err, null, 'Error is null.');
            });

        })

    });

    describe('Invoice.delete', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('delete')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.delete();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.delete(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.delete({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.delete([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id= 1;

            fastbill.invoice.delete(id, function(err){
                assert.equal(err, null, 'Error is null.');
            });

        });
    });

    describe('Invoice.complete', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('complete')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.complete();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.complete(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.complete({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.complete([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an invoice number', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }
                });

            var id= 1;

            fastbill.invoice.complete(id, function(err){
                assert.equal(err, null, 'Error is null.');
            });

        });
    });

    describe('Invoice.cancel', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('cancel')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.cancel();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.cancel(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.cancel({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.cancel([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }

                });

            var id= 1;

            fastbill.invoice.cancel(id, function(err){
                assert.equal(err, null, 'Error is null.');
            });

        });
    });

    describe('Invoice.sign', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('sign')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.invoice.sign();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.sign(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.sign({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.sign([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with the number of remaining credits on the account', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        REMAINING_CREDITS: 10,
                        ERRORS: null
                    }

                });

            var id= 1;

            fastbill.invoice.cancel(id, function(err, credits){
                assert.equal(err, null, 'Error is null.');
                assert.typeOf(credits, 'number', 'Responds with an credits.')
            });

        });
    });

    describe('Invoice.setpaid', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.constructor.prototype.hasOwnProperty('setpaid')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {


            try {
                fastbill.invoice.setpaid();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.setpaid(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.setpaid({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.invoice.setpaid([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with an invoice number', function(){

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }

                });

            var id= 1;

            fastbill.invoice.cancel(id, function(err, invoiceNumber){
                assert.equal(err, null, 'Error is null.');
                assert.typeOf(invoiceNumber, 'number', 'Responds with an invoice number.')
            });

        });
    });
});