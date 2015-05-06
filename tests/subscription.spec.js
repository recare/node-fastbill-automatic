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

/* global: ,describe,it,expect,beforeEach,afterEach */

var FastBill = require('../');

describe('The FastbillAPIs Subscription Interface', function () {

    var fastbill = FastBill.instantiate({});

    describe('Subscription#get', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.hasOwnProperty('get')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.subscription.get();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.get(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.get({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.get([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('Subscription#create', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.hasOwnProperty('create')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.subscription.create();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.create(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.create({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.create([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('Subscription#delete', function(){
        it('should be defined', function(){
            expect(fastbill.subscription.hasOwnProperty('delete')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.subscription.delete();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.delete(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.delete({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.subscription.delete([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });
});