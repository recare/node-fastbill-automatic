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

describe('The FastbillAPIs Customer Interface', function () {
    
    var fastbill = FastBill.instantiate({});

    describe('Customer.get', function(){
        it('should be defined', function(){
            expect(fastbill.customer.hasOwnProperty('get')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.customer.get();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.get(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.get({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.get([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('Customer.create', function(){
        it('should be defined', function(){
            expect(fastbill.customer.hasOwnProperty('create')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.customer.create();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.create(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.create({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.create([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('Customer.delete', function(){
        it('should be defined', function(){
            expect(fastbill.customer.hasOwnProperty('delete')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.customer.delete();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.delete(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.delete({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.customer.delete([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });
});