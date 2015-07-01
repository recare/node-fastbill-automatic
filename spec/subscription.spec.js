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


describe('The FastbillAPIs Subscription Interface', function () {

    var fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Subscription.get', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });


        it('should respond with a list of subscriptions', function (done) {

            // set up mock response
            var scope = nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        SUBSCRIPTIONS: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            console.log(scope.pendingMocks());

            var options = {some: 'object'};
            var promise = fastbill.subscription.get(options);
            promise.then(function (subscriptions) {
                assert.isArray(subscriptions, 'Returns a list of subscription objects.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });


        });
    });

    describe('Subscription.create', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });


        it('should respond with a fastbill subscription id', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        SUBSCRIPTION_ID: 1,
                        ERRORS: null
                    },
                    SUBSCRIPTION_ID: 1
                });

            var newSubscription = {
                ITEMS: ['test'],
                CUSTOMER_ID: 1
            };
            var promise = fastbill.subscription.create(newSubscription);
            promise.then(function (subscriptionId) {
                assert.typeOf(subscriptionId, 'number', 'Returns a subscription_id.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });

        });

    });

    describe('Subscription.update', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });



        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id = 1,
                modification = {CURRENCY: 'EUR'};
            var promise = fastbill.subscription.update(id, modification);
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

    describe('Subscription.delete', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('delete')).to.equal(true);
        });


        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.subscription.delete(id);
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

    describe('Subscription.set_usage_data', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('set_usage_data')).to.equal(true);
        });



        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        ERRORS: null
                    }
                });

            var id = 1,
                usage = {some: 'usage'};
            var promise = fastbill.subscription.set_usage_data(id, usage);
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

    describe('Subscription.change_article', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('change_article')).to.equal(true);
        });


        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        ERRORS: null
                    }

                });

            var id = 1,
                modification = {some: 'modification'};
            var promise = fastbill.subscription.change_article(id, modification);
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

    describe('Subscription.get_usage_data', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get_usage_data')).to.equal(true);
        });



        it('should respond with the a usage data object', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        USAGEDATA_ID: 1,
                        CUSTOMER_ID: 1,
                        SUBSCRIPTION_ID: 1
                    }

                });

            var id = 1;
            var promise = fastbill.subscription.get_usage_data(id);
            promise.then(function (result) {
                assert.typeOf(result, 'object', 'Responds with an object.')
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Subscription.delete_usage_data', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('delete_usage_data')).to.equal(true);
        });



        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        SUBSCRIPTION_NUMBER: 1,
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.subscription.delete_usage_data(id);
            promise.then(function (result) {
                assert.typeOf(result, 'number', 'Responds with a subscription number.')
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });

        });
    });

    describe('Subscription.reactivate', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('reactivate')).to.equal(true);
        });

        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        SUBSCRIPTION_NUMBER: 1,
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.subscription.reactivate(id);
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

    describe('Subscription.cancel', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('cancel')).to.equal(true);
        });

        it('responds with a cancellation date', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        CANCELLATION_DATE: Date.now(),
                        ERRORS: null
                    }
                });

            var id = 1;
            var promise = fastbill.subscription.cancel(id);
            promise.then(function (cancellationDate) {
                assert.typeOf(cancellationDate, 'float', 'Responds with a cancellation date.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Subscription.get_upcoming_amount', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get_upcoming_amount')).to.equal(true);
        });



        it('should respond with a total amount due', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        TOTAL: 200.0
                    }
                });

            var filters = {some: 'filters'};
            var promise = fastbill.subscription.get_upcoming_amount(filters);
            promise.then(function (total) {
                assert.typeOf(total, 'number', 'Responds with total amount due.')
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Subscription.renew', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('renew')).to.equal(true);
        });

        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri).post('').reply(200, {
                RESPONSE: {
                    ERRORS: null
                }
            });

            var id = 1;
            var promise = fastbill.subscription.get_upcoming_amount(id);
            promise.then(function (result) {
                expect(result).to.equa(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

    describe('Subscription.setaddon', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('setaddon')).to.equal(true);
        });

        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        TOTAL: 200.0
                    }
                });

            var id = 1,
                addon = {some: 'addon'};
            var promise = fastbill.subscription.setaddon(id, addon);
            promise.then(function (result) {
                expect(result).to.equa(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });
});