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
    util = require('util'),
    mandatory = require('mandatory'),
    FastbillAPI = require('./fastbill_api'),
    Error = require('./utils/errors'),
    Promise = require('bluebird');

exports.instantiate = function instantiate(credentials) {
    return new Subscription(credentials);
};

/**
 * __init__
 *
 * The subscription broker which abstracts from the
 * subscription services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

function Subscription(credentials) {
    this.$scope = 'subscription.';

    FastbillAPI.call(this, credentials);
}

util.inherits(Subscription, FastbillAPI);

/**
 * Subscription#get
 *
 * Requests the details from one or more subscriptions.
 * If no filter has been passed, 10 subscriptions will be shown.
 * Returns an array of subscription objects on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.get
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


Subscription.prototype.get = function get(options) {
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
            console.log(resultset);
            resolve(resultset.SUBSCRIPTIONS);
        }

        options = options || {};
        mandatory(options).is('object', 'Subscription::get - Please provide a valid options object.');

        vm.$request({
            service: vm.$scope + 'get',
            filter: options.filter,
            limit: options.limit,
            offset: options.offset
        }, onResult);
    });
};

/**
 * Subscription#create
 *
 * Creates a new subscription
 * Returns the created subscription's id.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.create
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

Subscription.prototype.create = function create(subscription) {
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
            resolve(resultset.SUBSCRIPTION_ID);
        }

        subscription = subscription || {};
        mandatory(subscription).is('object', 'Subscription::create - Please provide a valid subscription object.');

        vm.$request({
            service: vm.$scope + 'create',
            data: subscription
        }, onResult);
    });
};

/**
 * Subscription#update
 *
 * Updates the next payment date of a subscription.
 * Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.update
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
Subscription.prototype.update = function update(id, modification) {
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

        mandatory(id).is('number', 'Subscription::update - Please provide a valid id of the subscription that should be updated.');
        mandatory(modification).is('object', 'Subscription::update - Please provide a valid object with modifications.');
        modification.SUBSCRIPTION_ID = id;

        vm.$request({
            service: vm.$scope + 'update',
            data: modification
        }, onResult);
    });
};

/**
 * Subscription#set_usage_data
 *
 * Sets the usage data for the next invoice.
 * Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.setusagedata
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

Subscription.prototype.set_usage_data = function set_usage_data(id, usage) {
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

        mandatory(id).is('number', 'Subscription::set_usage_data - Please provide a valid id of the subscription that should be updated.');
        mandatory(usage).is('object', 'Subscription::set_usage_data - Please provide a valid object with modifications.');
        usage.SUBSCRIPTION_ID = id;

        vm.$request({
            service: vm.$scope + 'setusagedata',
            data: usage
        }, onResult);
    });
};

/**
 * Subscription#change_article
 *
 * Change article in subscription of a customer.
 * Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.changearticle
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

Subscription.prototype.change_article = function change_article(id, modification) {
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

        mandatory(id).is('number', 'Subscription::change_article - Please provide a valid id of the subscription that should be updated.');
        mandatory(modification).is('object', 'Subscription::change_article - Please provide a valid object with modifications.');
        modification.SUBSCRIPTION_ID = id;

        vm.$request({
            service: vm.$scope + 'changearticle',
            data: modification
        }, onResult);
    });
};

/**
 * Subscription#get_usage_data
 *
 * Request of usage dependent bookings of an abonnement.
 * Returns an array of usage dependent bookings.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.get_usage_data
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

Subscription.prototype.get_usage_data = function get_usage_data(id, start, end) {
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
            resolve(resultset);
        }

        mandatory(id).is('number', 'Subscription::get_usage_data - Please provide a valid id of the subscription that should be updated.');
        mandatory(start).is('date', 'Subscription::get_usage_data - Please provide a valid start date.');
        mandatory(end).is('date', 'Subscription::get_usage_data - Please provide a valid end date.');
        mandatory(callback).is('function', 'Subscription::get_usage_data - Please provide a valid callback function.');

        var usage = {};

        usage.SUBSCRIPTION_ID = id;
        usage.START = start;
        usage.END = end;

        vm.$request({
            service: vm.$scope + 'getusagedata',
            data: usage
        }, onResult);
    });
};


/**
 * Subscription#delete_usage_data
 *
 * Deletion of a booking dependent of usage.
 * Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.deleteusagedata
 *
 * Usage example:
 *
 *
 *     node-fastbill-automatic.subscription.delete_usage_data(1).then(...).catch(...)
 *
 *
 * @param {number} usage_id The id of the subscription that should be updated.
 *
 */

Subscription.prototype.delete_usage_data = function delete_usage_data(usage_id) {
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

        var usage = {};
        mandatory(usage_id).is('number', 'Subscription::update - Please provide a valid id of the subscription that should be updated.');
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
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.delete
 *
 * Usage example:
 *
 *     fastbill.subscription.delete(1).then(...).catch(...)
 *
 * @param {number} id The id of the subscription that should be deleted.
 *
 */
Subscription.prototype.delete = function del(id) {
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

        mandatory(id).is('number', 'Subscription::delete - Please provide a valid id of the subscription that should be deleted');

        vm.$request({
            service: vm.$scope + 'delete',
            data: {SUBSCRIPTION_ID: id}
        }, onResult);
    });
};


/**
 * Subscription#reactivate
 *
 *  Reactivates a cancelled subscription.
 *  Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.reactivate
 *
 * Usage example:
 *
 *     fastbill.subscription.reactivate(1).then(...).catch(...)
 *
 * @param {number} id The id of the subscription that should be deleted.
 *
 */
Subscription.prototype.reactivate = function reactivate(id) {
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

        mandatory(id).is('number', 'Subscription::reactivate - Please provide a valid id of the subscription that should be reactivated');

        vm.$request({
            service: vm.$scope + 'reactivate',
            data: {SUBSCRIPTION_ID: id}
        }, onResult);
    });
};


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

Subscription.prototype.cancel = function cancel(id) {
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
            resolve(resultset.CANCELLATION_DATE);
        }

        mandatory(id).is('number', 'Subscription::cancel - Please provide a valid id of the subscription that should be cancelled');

        vm.$request({
            service: vm.$scope + 'cancel',
            data: {SUBSCRIPTION_ID: id}
        }, onResult);
    });
};

/**
 * Subscription#get_upcoming_amount
 *
 * Returns the overall amount received with the next payment cycle across all subscriptions given certain filters.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.getupcomingamount
 *
 * Usage example:
 *
 *     var filters = {
 *     ARTICLE_NUMBER: null,
 *     COUPON: null,
 *     COUNTRY_CODE: 'DE',
 *     ADDONS: null
 *     node-fastbill-automatic.subscription.get_upcoming_amount(filters).then(...).catch(...)
 *
 * @param {object} filters The filter object
 *
 */

Subscription.prototype.get_upcoming_amount = function get_upcoming_amount(filters) {
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
            resolve(resultset.TOTAL);
        }


        mandatory(filters).is('object', 'Subscription::get_upcoming_amount - Please provide a valid filter object.');

        vm.$request({
            service: vm.$scope + 'getupcomingamount',
            data: filters
        }, onResult);
    });
};

/**
 * Subscription#renew
 *
 * Renews a subscription.
 * Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.renew
 *
 * Usage example:
 *
 *     fastbill.subscription.renew(1).then(...).catch(...)
 *
 * @param {number} id The id of the subscription that should be deleted.
 *
 */

Subscription.prototype.renew = function renew(id) {
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

        mandatory(id).is('number', 'Subscription::renew - Please provide a valid id of the subscription that should be renewed.');

        vm.$request({
            service: vm.$scope + 'cancel',
            data: {SUBSCRIPTION_ID: id}
        }, onResult);
    });
};

/**
 * Subscription#setaddon
 *
 * Sets an addon to an existing subscription.
 * Returns true on success.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.setaddon
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

Subscription.prototype.setaddon = function setaddon(id, addon) {
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

        mandatory(id).is('number', 'Subscription::delete - Please provide a valid id of the subscription that should be deleted');
        mandatory(addon).is('object', 'Subscription::setaddon - Please provide the addon object.');
        mandatory(callback).is('function', 'Subscription::delete - Please provide a valid callback function.');

        addon.SUBSCRIPTION_ID = id;

        vm.$request({
            service: vm.$scope + 'setaddon',
            data: addon
        }, onResult);
    });
};