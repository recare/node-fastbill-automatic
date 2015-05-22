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

var util = require('util');

var mandatory = require('mandatory');

var FastbillAPI = require('./fastbill_api');

exports.instantiate = function instantiate (credentials) {
    return new Invoice(credentials);
};

/**
 * The Invoice broker which abstracts from the
 * Invoice services of the FastBill API.
 * 
 * @param {object} credentials The email and api key tupel.
 * 
 */
function Invoice (credentials) {
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
Invoice.prototype.get = function get (options, callback) {

    function onResult (err, resultset) {
        if (err) {
            return callback(err);
        }

        callback(null, resultset.INVOICES);
    }

    if ('function' === typeof options) {
        callback = options;
        options = undefined;
    }

    options = options || {};

    mandatory(options).is('object', 'Invoice::get - Please provide a proper options object.');
    mandatory(callback).is('function', 'Invoice::get - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'get',
        filter: options.filter,
        limit: options.limit,
        offset: options.offset
    }, onResult);
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
 *     fastbill.Invoice.create(Invoice, function (err, id) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log(id);
 *     });
 * 
 * @param {object} Invoice The Invoice that should be created.
 * @param {function} callback Error-first callback (err, InvoiceId)
 * 
 */

Invoice.prototype.create = function create (invoice, callback) {

    function onResult (err, results) {
        if (err) {
            return callback(err, results);
        }

        callback(null, results.INVOICE_ID);
    }

    if ('function' === typeof Invoice) {
        callback = Invoice;
        invoice = undefined;
    }

    invoice = invoice || {};

    mandatory(invoice).is('object', 'Invoice::create - Please provide a proper Invoice object.');
    mandatory(invoice.ITEMS).is('list', 'Invoice::create - Please provide a proper list of Items.');
    mandatory(invoice.CUSTOMER_ID).is('number', 'Invoice::create - Please provide a valid customer id.');
    mandatory(callback).is('function', 'Invoice::create - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'create',
        data: invoice
    }, onResult);
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
 *     fastbill.Invoice.update(1, invoice, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 *
 * @param {number} id The id of the Invoice that should be updated.
 * @param {object} invoice The invoices.
 * @param {function} callback Error-first callback (err)
 *
 */
Invoice.prototype.update = function update (id, invoice, callback) {
    
    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Invoice::update - Please provide a proper id of the Invoice that should be updated.');
    mandatory(invoice).is('object', 'Invoice::update - Please provide a proper invoice object with updated content..');
    mandatory(callback).is('function', 'Invoice::update - Please provide a proper callback function.');

    invoice.INVOICE_ID = id;
    
    this.$request({
        service: this.$scope + 'update',
        data: invoice
    }, onResult);
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
 *     fastbill.Invoice.delete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the Invoice that should be deleted.
 * @param {function} callback Error-first callback (err)
 * 
 */
Invoice.prototype.delete = function del (id, callback) {
    
    function onResult (err) {
        if (err) {
            return callback(err);
        }
    
        callback(null);
    }

    if ('function' === typeof id) {
        callback = id;
        id = undefined;
    }

    mandatory(id).is('number', 'Invoice::delete - Please provide a proper id of the Invoice that should be deleted');
    mandatory(callback).is('function', 'Invoice::delete - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'delete',
        data: {INVOICE_ID: id}
    }, onResult);
};

/**
 * Invoice#complete
 * 
 * Marks an Invoice as complete.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.get
 *
 * Usage example:
 *
 *     fastbill.Invoice.complete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the Invoice that should be marked as complete.
 * @param {function} callback Error-first callback (err)
 *
 */
Invoice.prototype.complete = function complete (id, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    if ('function' === typeof id) {
        callback = id;
        id = undefined;
    }

    mandatory(id).is('number', 'Invoice::complete - Please provide a proper id of the Invoice that should be deleted');
    mandatory(callback).is('function', 'Invoice::complete - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'complete',
        data: {INVOICE_ID: id}
    }, onResult);
};


/**
 * Invoice#cancel
 *
 * Cancels an Invoice.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.cancel
 *
 * Usage example:
 *
 *     fastbill.Invoice.cancel(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the Invoice that should be canceled.
 * @param {function} callback Error-first callback (err)
 *
 */
Invoice.prototype.cancel = function cancel (id, callback) {

    function onResult (err, resultset) {

        if (err) {
            return callback(err, resultset.INVOICE_NUMBER);
        }

        callback(null);

    }

    mandatory(id).is('number', 'Invoice::cancel- Please provide a proper id of the Invoice that should be deleted');
    mandatory(callback).is('function', 'Invoice::cancel - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'cancel',
        data: {INVOICE_ID: id}
    }, onResult);
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
 *     fastbill.Invoice.sign(1, function (err, credits) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log(credits+' credits remaining.');
 *
 *     });
 *
 * @param {number} id The id of the Invoice that should be canceled.
 * @param {function} callback Error-first callback (err)
 *
 */

Invoice.prototype.sign = function sign (id, callback) {

    function onResult (err, resultset) {
        if (err) {
            return callback(err);
        }
        callback(null, resultset.REMAINING_CREDITS);
    }

    if ('function' === typeof id) {
        callback = id;
        id = undefined;
    }

    mandatory(id).is('number', 'Invoice::sign - Please provide a proper id of the Invoice that should be deleted');
    mandatory(callback).is('function', 'Invoice::sign - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'sign',
        data: {INVOICE_ID: id}
    }, onResult);
};

/**
 * Invoice#setpaid
 *
 * Sets an invoice to status paid.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.setpaid
 *
 * Usage example:
 *
 *     fastbill.Invoice.setpaid(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *         console.log('A paid invoice! woohoo!');
 *     });
 *
 * @param {number} id The id of the Invoice that should be set to paid.
 * @param {function} callback Error-first callback (err)
 *
 */
Invoice.prototype.setpaid = function setpaid (id, callback) {

    function onResult (err, resultset) {

        if (err) {
            return callback(err, resultset.INVOICE_NUMBER);
        }

        callback(null, resultset.INVOICE_NUMBER);

    }

    mandatory(id).is('number', 'Invoice::setpaid - Please provide a proper id of the Invoice that should be set to paid.');
    mandatory(callback).is('function', 'Invoice::cancel - Please provide a proper callback function.');

    this.$request({
        service: this.$scope + 'setpaid',
        data: {INVOICE_ID: id}
    }, onResult);
};