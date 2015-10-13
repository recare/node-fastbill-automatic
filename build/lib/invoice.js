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

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.invoiceFactory = invoiceFactory;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fastbill_api = require('./fastbill_api');

var _utilsType_handler = require('./utils/type_handler');

var _utilsErrors = require('./utils/errors');

function invoiceFactory(credentials) {
    return new Invoice(credentials);
}

/**
 * The Invoice broker which abstracts from the
 * Invoice services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

var Invoice = (function (_FastbillAPI) {
    _inherits(Invoice, _FastbillAPI);

    function Invoice(credentials) {
        _classCallCheck(this, Invoice);

        _get(Object.getPrototypeOf(Invoice.prototype), 'constructor', this).call(this, credentials);
        this.$scope = 'invoice.';
    }

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
     *
     */

    _createClass(Invoice, [{
        key: 'get',
        value: function get(options) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.INVOICES);
                }

                options = options || {};

                (0, _utilsType_handler.typeOf)(options).mustBe('object');

                vm.$request({
                    service: vm.$scope + 'get',
                    filter: options.filter,
                    limit: options.limit,
                    offset: options.offset
                }, onResult);
            });
        }

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

    }, {
        key: 'create',
        value: function create(invoice) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }

                    resolve(resultset.INVOICE_ID);
                }

                invoice = invoice || {};

                (0, _utilsType_handler.typeOf)(invoice).mustBe('object');
                (0, _utilsType_handler.typeOf)(invoice.ITEMS).mustBe('object');
                (0, _utilsType_handler.typeOf)(invoice.CUSTOMER_ID).mustBe('number');

                vm.$request({
                    service: vm.$scope + 'create',
                    data: invoice
                }, onResult);
            });
        }

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

    }, {
        key: 'update',
        value: function update(id, invoice) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }

                    resolve(true);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');
                (0, _utilsType_handler.typeOf)(invoice).mustBe('object');
                invoice.INVOICE_ID = id;

                vm.$request({
                    service: vm.$scope + 'update',
                    data: invoice
                }, onResult);
            });
        }

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

    }, {
        key: 'remove',
        value: function remove(id) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }

                    resolve(true);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                vm.$request({
                    service: vm.$scope + 'delete',
                    data: { INVOICE_ID: id }
                }, onResult);
            });
        }

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

    }, {
        key: 'complete',
        value: function complete(id, callback) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.INVOICE_NUMBER);
                }

                vm.$request({
                    service: vm.$scope + 'complete',
                    data: { INVOICE_ID: id }
                }, onResult);
            });
        }

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
    }, {
        key: 'cancel',
        value: function cancel(id) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.INVOICE_NUMBER);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                vm.$request({
                    service: vm.$scope + 'cancel',
                    data: { INVOICE_ID: id }
                }, onResult);
            });
        }

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

    }, {
        key: 'sign',
        value: function sign(id) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.REMAINING_CREDITS);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                vm.$request({
                    service: vm.$scope + 'sign',
                    data: { INVOICE_ID: id }
                }, onResult);
            });
        }

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

    }, {
        key: 'setpaid',
        value: function setpaid(id, paidDate) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.INVOICE_NUMBER);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                paidDate = paidDate || null;

                vm.$request({
                    service: vm.$scope + 'setpaid',
                    data: {
                        INVOICE_ID: id,
                        PAID_DATE: paidDate
                    }
                }, onResult);
            });
        }
    }]);

    return Invoice;
})(_fastbill_api.FastbillAPI);