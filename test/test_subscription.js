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

let fastbill = FastBill.instantiate({
    email: "test@test.com",
    apikey: "abc123"
});

describe('The FastbillAPIs Subscription Interface', function () {

    afterEach( cb => {
        nock.cleanAll();
        cb();
    });

    describe('Subscription.get', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });


        it('should respond with a list of subscriptions', function (done) {

            // set up mock response
            let scope = nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        SUBSCRIPTIONS: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            let options = {some: 'object'};
            let promise = fastbill.subscription.get(options);
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

            let newSubscription = {
                ITEMS: ['test'],
                CUSTOMER_ID: 1
            };
            let promise = fastbill.subscription.create(newSubscription);
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

            let id = 1,
                modification = {CURRENCY: 'EUR'};
            let promise = fastbill.subscription.update(id, modification);
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

    describe('Subscription.remove', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('remove')).to.equal(true);
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

            let id = 1;
            let promise = fastbill.subscription.remove(id);
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

    describe('Subscription.setUsageData', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('setUsageData')).to.equal(true);
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

            let id = 1,
                usage = {some: 'usage'};
            let promise = fastbill.subscription.setUsageData(id, usage);
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

    describe('Subscription.changeArticle', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('changeArticle')).to.equal(true);
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

            let id = 1,
                modification = {some: 'modification'};
            let promise = fastbill.subscription.changeArticle(id, modification);
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

    describe('Subscription.getUsageData', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('getUsageData')).to.equal(true);
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

            let id = 1;

            fastbill.subscription.getUsageData(id)
                .then(function (result) {
                    console.log(result);
                    assert.typeOf(result, 'object', 'Responds with an object.')
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    });

    describe('Subscription.delete_usage_data', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('deleteUsageData')).to.equal(true);
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

            let id = 1;
            fastbill.subscription.deleteUsageData(id)
                .then(result => {
                    expect(result).to.equal(true);
                    done();
                })
                .catch(err => {
                    done(err);
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

            let id = 1;
            fastbill.subscription.reactivate(id)
                .then(function (result) {
                    expect(result).to.equal(true);
                    done();
                }).catch(err => {
                    done(err);
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

            let id = 1;
            fastbill.subscription.cancel(id)
                .then(function (cancellationDate) {
                    assert.typeOf(cancellationDate, 'number', 'Responds with a cancellation date.');
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    });

    describe('Subscription.getUpcomingAmount', function () {
        it('should be defined', function () {
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('getUpcomingAmount')).to.equal(true);
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

            let filters = {some: 'filters'};
            fastbill.subscription.getUpcomingAmount(filters)
                .then(function (total) {
                    assert.typeOf(total, 'number', 'Responds with total amount due.')
                    done();
                }).catch(err => {
                    done(err);
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

            let id = 1;
            fastbill.subscription.renew(id).then(function (result) {
                expect(result).to.equal(true);
                done();
            }).catch(err => {
                done(err);
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

            let id = 1,
                addon = {some: 'addon'};

            fastbill.subscription.setaddon(id, addon)
                .then(function (result) {
                    expect(result).to.equal(true);
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    });
});