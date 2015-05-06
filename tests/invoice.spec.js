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

describe('The FastbillAPIs Invoice Interface', function () {

    var fastbill = FastBill.instantiate({});

    describe('Invoice#get', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.hasOwnProperty('get')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.invoice.get();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.get(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.get({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.get([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('Invoice#create', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.hasOwnProperty('create')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.invoice.create();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.create(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.create({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.create([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });

    describe('Invoice#delete', function(){
        it('should be defined', function(){
            expect(fastbill.invoice.hasOwnProperty('delete')).toBe(true);
        });

        it('should handle wrong arguments', function () {

            try {
                fastbill.invoice.delete();
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.delete(0, function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.delete({});
            } catch (e) {
                expect(e).toBeDefined();
            }

            try {
                fastbill.invoice.delete([], function () {});
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });
});