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


<<<<<<< HEAD
const
    FastBill = require('../'),
=======
var FastBill = require('../'),
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
    nock = require('nock'),
    expect = require('chai').expect,
    assert = require('chai').assert;


describe('The FastbillAPIs Customer Interface', function () {

    var fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

<<<<<<< HEAD
    describe('Customer.get', function () {
        it('should be defined', function () {
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });

        it('should respond with a list of customers', function (done) {
=======
    describe('Customer.get', function(){
        it('should be defined', function(){
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.customer.get();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.get(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.get({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.get([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a list of customers', function(){


>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
            // set up mock response
            nock(fastbill.customer.$uri)
                .post('')
                .reply(200, {
<<<<<<< HEAD
                    RESPONSE: {
=======
                    RESPONSE:{
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
                        CUSTOMERS: ['object', 'object', 'object'],
                        ERRORS: null
                    }

                });

            var options = {};
<<<<<<< HEAD
            var promise = fastbill.customer.get(options);

            promise.then(function (customers) {
                assert.isArray(customers, 'Returns a list of customer objects.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
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
=======

            fastbill.customer.get(options, function(err, customers){
                assert.equal(err, null, 'Error is null.');
                assert.isArray(customers, 'Returns a list of customer objects.');
            });

        });
    });

    describe('Customer.create', function(){
        it('should be defined', function(){
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.customer.create();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.create(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {

                // set up mock response
                nock(fastbill.customer.$uri)
                    .post('')
                    .reply(200, {
                        RESPONSE:{
                            CUSTOMER_ID: 1
                        }

                    });
                fastbill.customer.create({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {

                // set up mock response
                nock(fastbill.customer.$uri)
                    .post('')
                    .reply(200, {
                        RESPONSE:{
                            CUSTOMER_ID: 1
                        }

                    });
                fastbill.customer.create([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a fastbill customer id', function(){

            // set up mock response
            nock(fastbill.customer.$uri)
                .post('', function(body){
                    return body.service === 'customer.create';
                })
                .reply(200, {
                    RESPONSE:{
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
                        CUSTOMER_ID: 1,
                        ERRORS: null
                    }

                });

            var customer = {some: 'customerdata'};
<<<<<<< HEAD
            var promise = fastbill.customer.post(customer);

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
=======

            fastbill.customer.create(customer, function(err, customer){
                expect(err).to.equal(null);
                assert.typeOf(customer, 'number', 'Returns a customer_id.');
            });

        });

    });

    describe('Customer.update', function(){
        it('should be defined', function(){
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.customer.update();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.update(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.update({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.update([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc

            // set up mock response
            nock(fastbill.customer.$uri)
                .post('')
                .reply(200, {
<<<<<<< HEAD
                    RESPONSE: {
                        ERRORS: null,
                        STATUS: 'success'
                    }
=======
                    RESPONSE: {ERRORS: null,
                        STATUS: 'success'}
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
                });

            var id = 1,
                modification = {FIRST_NAME: 'max'};

<<<<<<< HEAD
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

    describe('Customer.delete', function () {
        it('should be defined', function () {
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('delete')).to.equal(true);
        });


        it('should not respond with an error', function (done) {
=======

            fastbill.customer.update(id, modification, function(err){
                assert.equal(err, null, 'Error is null.');
            });

        })

    });
    describe('Customer.delete', function(){
        it('should be defined', function(){
            expect(fastbill.customer.constructor.prototype.hasOwnProperty('delete')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.customer.delete();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.delete(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.delete({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.customer.delete([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc

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

<<<<<<< HEAD
            var promise = fastbill.customer.delete(id);
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

=======
            fastbill.customer.delete(id, function(err){
                assert.equal(err, null, 'Error is null.');
            });

        });
    });
>>>>>>> 18a14ebeca804a8fc58572bdb9da627d78626dcc
});