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


describe('The FastbillAPIs Subscription Interface', function () {

    var fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Subscription.get', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.get();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a list of subscriptions', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('', function(body){
                    return body.service == 'subscription.get';
                })
                .reply(200, {
                    RESPONSE:{
                        SUBSCRIPTIONS: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            var options = {some: 'object'};

            fastbill.subscription.get(options, function(err, subscriptions){
                expect(err).to.equal(null);
                assert.isArray(subscriptions, 'Returns a list of subscription objects.');
            });

        });
    });

    describe('Subscription.create', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.create();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.create(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.create({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.create([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a fastbill subscription id', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        SUBSCRIPTION_ID: 1,
                        ERRORS: null
                    }
                });

            var newSubscription = {
                ITEMS: ['test'],
                CUSTOMER_ID: 1
            };

            fastbill.subscription.create(newSubscription, function(err, subscriptionId){
                expect(err).to.equal(null);
                assert.typeOf(subscriptionId, 'number', 'Returns a subscription_id.');
            });

        });

    });

    describe('Subscription.update', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.update();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.update(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.update({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.update([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

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

            fastbill.subscription.update(id, modification, function(err){
                expect(err).to.equal(null);
            });

        })

    });

    describe('Subscription.delete', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('delete')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.delete();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.delete(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.delete({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.delete([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            var id= 1;

            fastbill.subscription.delete(id, function(err){
                expect(err).to.equal(null);
            });

        });
    });

    describe('Subscription.set_usage_data', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('set_usage_data')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.set_usage_data();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.set_usage_data(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.set_usage_data({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.set_usage_data([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        ERRORS: null
                    }
                });

            var id= 1,
                usage = {some: 'usage'};

            fastbill.subscription.set_usage_data(id, usage, function(err){
                expect(err).to.equal(null);
            });

        });
    });
    
    describe('Subscription.change_article', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('change_article')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.change_article();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.change_article(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.change_article({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.change_article([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        ERRORS: null
                    }

                });

            var id = 1,
                modification = {some: 'modification'};

            fastbill.subscription.change_article(id, modification, function(err){
                expect(err).to.equal(null);
            });

        });
    });

    describe('Subscription.get_usage_data', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get_usage_data')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.get_usage_data();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get_usage_data(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get_usage_data({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get_usage_data([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with the a usage data object', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        USAGEDATA_ID: 1,
                        CUSTOMER_ID: 1,
                        SUBSCRIPTION_ID: 1
                    }

                });

            var id= 1,
                startDate = Date.now(),
                endDate = Date.now();

            fastbill.subscription.get_usage_data(id, startDate, endDate, function(err, usage){
                expect(err).to.equal(null);
                assert.typeOf(usage, 'object', 'Responds with an object.')
            });

        });
    });

    describe('Subscription.delete_usage_data', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('delete_usage_data')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.delete_usage_data();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.delete_usage_data(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.delete_usage_data({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.delete_usage_data([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(done){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        ERRORS: null
                    }
                });

            var id= 1;

            fastbill.subscription.delete_usage_data(id, function(err){
                expect(err).to.equal(null);
                done();
            });

        });
    });

    describe('Subscription.reactivate', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('reactivate')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.reactivate();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.reactivate(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.reactivate({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.reactivate([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        INVOICE_NUMBER: 1,
                        ERRORS: null
                    }
                });

            var id= 1;

            fastbill.subscription.reactivate(id, function(err){
                expect(err).to.equal(null);
            });

        });
    });

    describe('Subscription.cancel', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('cancel')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.cancel();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.cancel(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.cancel({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.cancel([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('responds with a cancellation date', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        CANCELLATION_DATE: Date.now(),
                        ERRORS: null
                    }
                });

            var id= 1;

            fastbill.subscription.cancel(id, function(err, cancellationDate){
                expect(err).to.equal(null);
                assert.typeOf(cancellationDate, 'number', 'Responds with an subscription number.')
            });

        });
    });

    describe('Subscription.get_upcoming_amount', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('get_upcoming_amount')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.get_upcoming_amount();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get_upcoming_amount(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get_upcoming_amount({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.get_upcoming_amount([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should respond with a total amount due', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        TOTAL: 200.0
                    }
                });

            var filters = {some: 'filters'};

            fastbill.subscription.get_upcoming_amount(filters, function(err, total){
                expect(err).to.equal(null);
                assert.typeOf(total, 'number', 'Responds with total amount due.')
            });

        });
    });

    describe('Subscription.renew', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('renew')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.renew();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.renew(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.renew({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.renew([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        ERRORS: null
                    }
                });

            var id = 1;

            fastbill.subscription.renew(id, function(err, total){
                 expect(err).to.equal(null);
            });

        });
    });

    describe('Subscription.setaddon', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.constructor.prototype.hasOwnProperty('setaddon')).to.equal(true);
        });

        it('should throw errors on invalid arguments', function () {

            try {
                fastbill.subscription.setaddon();
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.setaddon(0, function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.setaddon({});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }

            try {
                fastbill.subscription.setaddon([], function () {});
            } catch (e) {
                expect(e).to.not.be.undefined;
            }
        });

        it('should not respond with an error', function(){

            // set up mock response
            nock(fastbill.subscription.$uri)
                .post('')
                .reply(200, {
                    RESPONSE:{
                        TOTAL: 200.0
                    }
                });

            var id = 1,
                addon = {some: 'addon'};


            fastbill.subscription.setaddon(id, addon, function(err, total){
                expect(err).to.equal(null);
            });

        });
    });
});