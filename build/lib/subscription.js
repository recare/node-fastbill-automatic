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

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.subscriptionFactory = subscriptionFactory;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fastbill_api = require('./fastbill_api');

var _utilsType_handler = require('./utils/type_handler');

var _utilsErrors = require('./utils/errors');

function subscriptionFactory(credentials) {
    return new Subscription(credentials);
}

/**
 * __init__
 *
 * The subscription broker which abstracts from the
 * subscription services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

var Subscription = (function (_FastbillAPI) {
    _inherits(Subscription, _FastbillAPI);

    function Subscription(credentials) {
        _classCallCheck(this, Subscription);

        _get(Object.getPrototypeOf(Subscription.prototype), 'constructor', this).call(this, credentials);
        this.$scope = 'subscription.';
    }

    /**
     * Subscription#get
     *
     * Requests the details from one or more subscriptions.
     * If no filter has been passed, 10 subscriptions will be shown.
     * Returns an array of subscription objects on success.
     *
     * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.get
     *
     * Possible options:
     *
     *     limit: Limits the result set
     *     offset: ResultSet offset
     *     filter: Filter parameter for restricting the result set
     *
     * Usage example:
     *
     *
     *     fastbill.subscription.get(1).then(...).catch(...)
     *
     * @param {object} options Possible request options (see above)
     *
     */

    _createClass(Subscription, [{
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
                    resolve(resultset.SUBSCRIPTIONS);
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
         * Subscription#create
         *
         * Creates a new subscription
         * Returns the created subscription's id.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.create
         *
         * Usage example:
         *
         *     var subscription = {
         *      SUBSCRIPTION_EXT_UID: 'internal_subscription_1',
         *      ARTICLE_NUMBER: 'Service xy',
         *      COUPON: null,
         *      TITLE: 'Bla',
         *      UNIT_PRICE: '20.0',
         *      CURRENCY_CODE: 'EUR',
         *      DESCRIPTION: 'Paying for your service xyz',
         *      START_DATE: Date.now(),
         *      CANCELLATION_DATE: null,
         *      ADDONS: null
         *      }
         *
         *
         *     node-fastbill-automatic.subscription.create(subscription).then(...).catch(...)
         *
         * @param {object} subscription The subscription that should be created.
         *
         */

    }, {
        key: 'create',
        value: function create(subscription) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.SUBSCRIPTION_ID);
                }

                subscription = subscription || {};
                (0, _utilsType_handler.typeOf)(subscription).mustBe('object');

                vm.$request({
                    service: vm.$scope + 'create',
                    data: subscription
                }, onResult);
            });
        }
    }, {
        key: 'update',

        /**
         * Subscription#update
         *
         * Updates the next payment date of a subscription.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.update
         *
         *  Usage example:
         *
         *     var modification = {
         *         NEXT_EVENT: Date.now(),
         *         SUBSCRIPTION_EXT_UID: 'Internal_service_uid01',
         *         STATUS: 'good',
         *         X_ATTRIBUTES: []
         *     };
         *
         *     fastbill.subscription.update(1).then(...).catch(...)
         *
         * @param {number} id The id of the subscription that should be updated.
         * @param {object} modification The modifications.
         *
         */
        value: function update(id, modification) {
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
                (0, _utilsType_handler.typeOf)(modification).mustBe('object');
                modification.SUBSCRIPTION_ID = id;

                vm.$request({
                    service: vm.$scope + 'update',
                    data: modification
                }, onResult);
            });
        }
    }, {
        key: 'setUsageData',

        /**
         * Subscription#setUsageData
         *
         * Sets the usage data for the next invoice.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.setusagedata
         *
         * Usage example:
         *
         *     var usage = {
         *         ARTICLE_NUMBER: 'someservice',
         *         QUANTITY: 3,
         *         UNIT_PRICE: 10.0,
         *         DESCRIPTION: 'cool service',
         *         USAGE_DATE: Date.now(),
         *         CURRENCY_CODE: 'EUR'
         *     };
         *
         *
         *     fastbill.subscription.update(1, usage).then(...).catch(...)
         *
         *
         * @param {number} id The id of the subscription that should be updated.
         * @param {object} usage The modifications.
         *
         */

        value: function setUsageData(id, usage) {
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
                (0, _utilsType_handler.typeOf)(usage).mustBe('object');
                usage.SUBSCRIPTION_ID = id;

                vm.$request({
                    service: vm.$scope + 'setusagedata',
                    data: usage
                }, onResult);
            });
        }

        /**
         * Subscription#changeArticle
         *
         * Change article in subscription of a customer.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.changearticle
         *
         * Usage example:
         *
         *     var modification = {
         *         ARTICLE_NUMBER: 'ABC001',
         *         TITLE: 'Service X',
         *         UNIT_PRICE: 200.0,
         *         CURRENCY_CODE: 'EUR'
         *         };
         *
         *
         *     node-fastbill-automatic.subscription.update(1, modification).then(...).catch(...)
         *
         *
         * @param {number} id The id of the subscription that should be updated.
         * @param {object} modification The modifications.
         *
         */

    }, {
        key: 'changeArticle',
        value: function changeArticle(id, modification) {
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
                (0, _utilsType_handler.typeOf)(modification).mustBe('object');
                modification.SUBSCRIPTION_ID = id;

                vm.$request({
                    service: vm.$scope + 'changearticle',
                    data: modification
                }, onResult);
            });
        }

        /**
         * Subscription#getUsageData
         *
         * Request of usage dependent bookings of an abonnement.
         * Returns an array of usage dependent bookings.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.get_usage_data
         *
         * Usage example:
         *
         *     var start = Date.now()-10,
         *         end = Date.now(),
         *     };
         *
         *     node-fastbill-automatic.subscription.update(1, start, end).then(...).catch(..)
         *
         *
         * @param {number} id The id of the subscription that should be updated.
         * @param {timestamp} start The modifications.
         * @param {timestamp} end The modifications.
         *
         */

    }, {
        key: 'getUsageData',
        value: function getUsageData(id, start, end) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                if (start) {
                    (0, _utilsType_handler.typeOf)(start).mustBe('number');
                }

                if (end) {
                    (0, _utilsType_handler.typeOf)(end).mustBe('number');
                }

                var usage = {};

                usage.SUBSCRIPTION_ID = id;
                usage.START = start;
                usage.END = end;

                vm.$request({
                    service: vm.$scope + 'getusagedata',
                    data: usage
                }, onResult);
            });
        }

        /**
         * Subscription#deleteUsageData
         *
         * Deletion of a booking dependent of usage.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.deleteusagedata
         *
         * Usage example:
         *
         *
         *     node-fastbill-automatic.subscription.deleteUsageData(1).then(...).catch(...)
         *
         *
         * @param {number} usage_id The id of the subscription that should be updated.
         *
         */

    }, {
        key: 'deleteUsageData',
        value: function deleteUsageData(usage_id) {
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

                var usage = {};
                (0, _utilsType_handler.typeOf)(usage_id).mustBe('number');
                usage.USAGEDATA_ID = usage_id;

                vm.$request({
                    service: vm.$scope + 'deleteusagedata',
                    data: usage
                }, onResult);
            });
        }

        /**
         * Subscription#delete
         *
         * Deletes a subscription.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.delete
         *
         * Usage example:
         *
         *     fastbill.subscription.delete(1).then(...).catch(...)
         *
         * @param {number} id The id of the subscription that should be deleted.
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
                    data: { SUBSCRIPTION_ID: id }
                }, onResult);
            });
        }

        /**
         * Subscription#reactivate
         *
         *  Reactivates a cancelled subscription.
         *  Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.reactivate
         *
         * Usage example:
         *
         *     fastbill.subscription.reactivate(1).then(...).catch(...)
         *
         * @param {number} id The id of the subscription that should be deleted.
         *
         */
    }, {
        key: 'reactivate',
        value: function reactivate(id) {
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
                    service: vm.$scope + 'reactivate',
                    data: { SUBSCRIPTION_ID: id }
                }, onResult);
            });
        }

        /**
         * Subscription#cancel
         *
         * Cancels a running subscription.
         * The cancellation date (after the payment of the last running payment period)
         * will be returned.
         *
         * http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.cancel
         *
         * Usage example:
         *
         *     fastbill.subscription.delete(1).then(...).catch(...)
         *
         * @param {number} id The id of the subscription that should be deleted.
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
                    resolve(resultset.CANCELLATION_DATE);
                }

                (0, _utilsType_handler.typeOf)(id).mustBe('number');

                vm.$request({
                    service: vm.$scope + 'cancel',
                    data: { SUBSCRIPTION_ID: id }
                }, onResult);
            });
        }

        /**
         * Subscription#getUpcomingAmount
         *
         * Returns the overall amount received with the next payment cycle across all subscriptions given certain filters.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.getupcomingamount
         *
         * Usage example:
         *
         *     var filters = {
         *     ARTICLE_NUMBER: null,
         *     COUPON: null,
         *     COUNTRY_CODE: 'DE',
         *     ADDONS: null
         *     node-fastbill-automatic.subscription.getUpcomingAmount(filters).then(...).catch(...)
         *
         * @param {object} filters The filter object
         *
         */

    }, {
        key: 'getUpcomingAmount',
        value: function getUpcomingAmount(filters) {
            var vm = this;
            return new Promise(function (resolve, reject) {
                function onResult(err, resultset) {
                    if (err) {
                        return reject(new _utilsErrors.FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        }));
                    }
                    resolve(resultset.TOTAL);
                }

                (0, _utilsType_handler.typeOf)(filters).mustBe('object');

                vm.$request({
                    service: vm.$scope + 'getupcomingamount',
                    data: filters
                }, onResult);
            });
        }
    }, {
        key: 'renew',

        /**
         * Subscription#renew
         *
         * Renews a subscription.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.renew
         *
         * Usage example:
         *
         *     fastbill.subscription.renew(1).then(...).catch(...)
         *
         * @param {number} id The id of the subscription that should be deleted.
         *
         */

        value: function renew(id) {
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
                    service: vm.$scope + 'cancel',
                    data: { SUBSCRIPTION_ID: id }
                }, onResult);
            });
        }

        /**
         * Subscription#setaddon
         *
         * Sets an addon to an existing subscription.
         * Returns true on success.
         *
         * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.setaddon
         *
         * Usage example:
         *
         *      var addon = {
         *          ARTICLE_NUMBER: 'someservice',
         *          QUANTITY: 3,
         *          UNIT_PRICE: '10.0',
         *          DESCRIPTION: 'Cool service'
         *      }
         *
         *     fastbill.subscription.delete(1).then(...).catch(...)
         *
         * @param {number} id The id of the subscription that should be deleted.
         * @param {object} addon The add on to the subscription
         *
         */

    }, {
        key: 'setaddon',
        value: function setaddon(id, addon) {
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
                (0, _utilsType_handler.typeOf)(addon).mustBe('object');

                addon.SUBSCRIPTION_ID = id;

                vm.$request({
                    service: vm.$scope + 'setaddon',
                    data: addon
                }, onResult);
            });
        }
    }]);

    return Subscription;
})(_fastbill_api.FastbillAPI);