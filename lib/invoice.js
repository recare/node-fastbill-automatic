/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 */

'use strict';

const
    util = require('util'),
    mandatory = require('mandatory'),
    FastbillAPI = require('./fastbill_api'),
    Promise = require('bluebird');

exports.instantiate = function instantiate(credentials) {
    return new Invoice(credentials);
};

/**
 * The Invoice broker which abstracts from the
 * Invoice services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

function Invoice(credentials) {
    this.$scope = 'invoice.';

    FastbillAPI.call(this, credentials);

}

util.inherits(Invoice, FastbillAPI);

/**
 * Invoice#get
 *
 * Requests a set of Invoices from Fastbill
 *
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.get
 *
 * Possible options:
 *
 *     limit: Limits the result set
 *     offset: ResultSet offset
 *     filter: Filter parameter for restricting the result set
 *
 * If no filter is passed, all invoices will be returned.
 *
 * @param {object} options Request options including filter, limit, offset
 * @param {function} callback Error-first callback (err, Invoices)
 *
 */

Invoice.prototype.get = function get(options) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.INVOICES);
        }

        options = options || {};

        mandatory(options).is('object', 'Invoice::get - Please provide a proper options object.');

        vm.$request({
            service: vm.$scope + 'get',
            filter: options.filter,
            limit: options.limit,
            offset: options.offset
        }, onResult);
    });

};

/**
 * Invoice#create
 *
 * Creates a new Invoice
 *
 * The Invoice id of the newly created Invoice will be passed
 * to the callback function.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.create
 *
 * Usage example:
 *
 *     var Invoice = {
 *        CUSTOMER_ID: 1,
 *        CUSTOMER_COSTCENTER_ID: 2,
 *        CURRENCY_CODE: 3,
 *        TEMPLATE_ID: 4,
 *        INTROTEXT: "This is an introduction",
 *        INVOICE_TITLE:	"This is an invoice title",
 *        INVOICE_DATE: 	Date.now(),
 *        DELIVERY_DATE:	Date.now(),
 *        CASH_DISCOUNT_PERCENT: 	0,
 *        CASH_DISCOUNT_DAYS: 0,
 *        EU_DELIVERY: 1,
 *        ITEMS: [{
 *        ARTICLE_NUMBER: "DKADN123",
 *        DESCRIPTION: "Fancy sweater", // required
 *        QUANTITY: 2
 *        UNIT_PRICE: 12.5, // required
 *        VAT_PERCENT: 19.0, // required
 *        IS_GROSS: 1
 *        SORT_ORDER:
 *     }];
 *
 *     fastbill.Invoice.create(Invoice).then(...).catch(...)
 *
 * @param {object} invoice The Invoice that should be created.
 *
 */

Invoice.prototype.create = function create(invoice) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }

            resolve(resultset.INVOICE_ID);
        }

        invoice = invoice || {};

        mandatory(invoice).is('object', 'Invoice::create - Please provide a proper Invoice object.');
        mandatory(invoice.ITEMS).is('array', 'Invoice::create - Please provide a proper list of Items.');
        mandatory(invoice.CUSTOMER_ID).is('number', 'Invoice::create - Please provide a valid customer id.');

        vm.$request({
            service: vm.$scope + 'create',
            data: invoice
        }, onResult);
    });
};

/**
 * Invoice#update
 *
 * Updates the information of a Invoice.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.update
 *
 * Usage example:
 *
 *     var invoice = {
 *         FIRST_NAME: 'André'
 *     };
 *
 *     fastbill.Invoice.update(1, invoice).then(...).catch(...)
 *
 *
 * @param {number} id The id of the Invoice that should be updated.
 * @param {object} invoice The invoices.
 *
 */

Invoice.prototype.update = function update(id, invoice) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }

            resolve(true);
        }

        mandatory(id).is('number', 'Invoice::update - Please provide a proper id of the Invoice that should be updated.');
        mandatory(invoice).is('object', 'Invoice::update - Please provide a proper invoice object with updated content..');
        invoice.INVOICE_ID = id;

        vm.$request({
            service: vm.$scope + 'update',
            data: invoice
        }, onResult);
    });
};

/**
 * Invoice#delete
 *
 * Deletes an Invoice.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.delete
 *
 * Usage example:
 *
 *     fastbill.Invoice.delete(1).then(...).catch(...)
 *
 * @param {number} id The id of the Invoice that should be deleted.
 *
 */

Invoice.prototype.delete = function del(id) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }

            resolve(true);
        }

        mandatory(id).is('number', 'Invoice::delete - Please provide a proper id of the Invoice that should be deleted');
        vm.$request({
            service: vm.$scope + 'delete',
            data: {INVOICE_ID: id}
        }, onResult);
    });
};

/**
 * Invoice#complete
 *
 * Marks an Invoice as complete.
 * Returns the invoice's invoice number.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.get
 *
 * Usage example:
 *
 *     fastbill.Invoice.complete(1).then(...).catch(...);
 *
 * @param {number} id The id of the Invoice that should be marked as complete.
 * @param {function} callback Error-first callback (err)
 *
 */

Invoice.prototype.complete = function complete(id, callback) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(data.INVOICE_NUMBER);
        }

        if ('function' === typeof id) {
            callback = id;
            id = undefined;
        }

        mandatory(id).is('number', 'Invoice::complete - Please provide a proper id of the Invoice that should be deleted');

        vm.$request({
            service: vm.$scope + 'complete',
            data: {INVOICE_ID: id}
        }, onResult);
    });
};


/**
 * Invoice#cancel
 *
 * Cancels an Invoice.
 * Returns the invoice's invoice number.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.cancel
 *
 * Usage example:
 *
 *     fastbill.Invoice.cancel(1).then(...).catch(...)
 *
 * @param {number} id The id of the Invoice that should be canceled.
 *
 */
Invoice.prototype.cancel = function cancel(id) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.INVOICE_NUMBER);

        }

        mandatory(id).is('number', 'Invoice::cancel- Please provide a proper id of the Invoice that should be deleted');

        vm.$request({
            service: vm.$scope + 'cancel',
            data: {INVOICE_ID: id}
        }, onResult);
    });
};

/**
 * Invoice#sign
 *
 * Adds a qualified electronic signature to an invoice.
 * Requires paid credits on your fastbill account.
 *
 * Returns the number of credits left to sign invoices.
 *
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.sign
 *
 * Usage example:
 *
 *     fastbill.Invoice.sign(1).then(...).catch(...)
 *
 * @param {number} id The id of the Invoice that should be canceled.
 *
 */

Invoice.prototype.sign = function sign(id) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.REMAINING_CREDITS);
        }

        mandatory(id).is('number', 'Invoice::sign - Please provide a proper id of the Invoice that should be deleted');

        vm.$request({
            service: vm.$scope + 'sign',
            data: {INVOICE_ID: id}
        }, onResult);
    });
};

/**
 * Invoice#setpaid
 *
 * Sets an invoice to status paid.
 * Returns invoice number.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.setpaid
 *
 * Usage example:
 *
 *     fastbill.Invoice.setpaid(1).then(...).catch(...)
 *
 * @param {number} id The id of the Invoice that should be set to paid.
 * @param {date} paidDate the date when the invoice was paid
 */

Invoice.prototype.setpaid = function setpaid(id, paidDate) {
    var vm = this;
    return new Promise(function (resolve, reject) {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new Error.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.INVOICE_NUMBER);
        }

        mandatory(id).is('number', 'Invoice::setpaid - Please provide a proper id of the Invoice that should be set to paid.');

        paidDate = paidDate || null;

        vm.$request({
            service: vm.$scope + 'setpaid',
            data: {
                INVOICE_ID: id,
                PAID_DATE: paidDate
            }
        }, onResult);
    });
};