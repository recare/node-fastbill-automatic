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

var util = require('util');

var mandatory = require('mandatory');

var FastbillAPI = require('./fastbill_api');

exports.instantiate = function instantiate (credentials) {
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

function Subscription (credentials) {
    this.$scope = 'subscription.';

    FastbillAPI.call(this, credentials);
}

util.inherits(Subscription, FastbillAPI);

/**
 * Subscription#get
 *
 * Requests the details from one or more subscriptions.
 *
 * If no filter has been passed, 10 subscriptions will be shown.
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
 *     node-fastbill-automatic.subscription.get(1, function (err, subscriptions) {
 *         if (err) {
 *             return console.error(err, null);
 *         }
 *
 *         console.log(subscriptions);
 *     });
 *
 * @param {object} options Possible request options (see above)
 * @param {function} callback Error-first callback (err, subscriptions)
 *
 */


Subscription.prototype.get = function get (options, callback) {

    function onResult (err, resultset) {
        if (err) {
            return callback(err);
        }

        callback(null, resultset.SUBSCRIPTIONS);
    }

    options = options || {};

    mandatory(options).is('object', 'Subscription::get - Please provide a valid options object.');
    mandatory(callback).is('function', 'Subscription::get - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'get',
        filter: options.filter,
        limit: options.limit,
        offset: options.offset
    }, onResult);
};

/**
 * Subscription#create
 *
 * Creates a new subscription
 *
 * Returns the created subscription's id to the callback function.
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
 *     node-fastbill-automatic.subscription.create(subscription, function (err, id) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log(id);
 *     });
 *
 * @param {object} subscription The subscription that should be created.
 * @param {function} callback Error-first callback (err, subscriptionId)
 *
 */
Subscription.prototype.create = function create (subscription, callback) {

    function onResult (err, results) {
        if (err) {
            return callback(err);
        }

        callback(null, results.SUBSCRIPTION_ID);
    }

    subscription = subscription || {};

    mandatory(subscription).is('object', 'Subscription::create - Please provide a valid subscription object.');
    mandatory(callback).is('function', 'Subscription::create - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'create',
        data: subscription
    }, onResult);
};

/**
 * Subscription#update
 *
 * Updates the next payment date of a subscription.
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
 *     node-fastbill-automatic.subscription.update(1, modification, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the subscription that should be updated.
 * @param {object} modification The modifications.
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.update = function update (id, modification, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Subscription::update - Please provide a valid id of the subscription that should be updated.');
    mandatory(modification).is('object', 'Subscription::update - Please provide a valid object with modifications.');
    mandatory(callback).is('function', 'Subscription::update - Please provide a valid callback function.');

    modification.SUBSCRIPTION_ID = id;

    this.$request({
        service: this.$scope + 'update',
        data: modification
    }, onResult);
};

/**
 * Subscription#set_usage_data
 *
 * Sets the usage data for the next invoice.
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
 *     node-fastbill-automatic.subscription.update(1, usage, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 *
 * @param {number} id The id of the subscription that should be updated.
 * @param {object} usage The modifications.
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.set_usage_data = function set_usage_data (id, usage, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Subscription::set_usage_data - Please provide a valid id of the subscription that should be updated.');
    mandatory(usage).is('object', 'Subscription::set_usage_data - Please provide a valid object with modifications.');
    mandatory(callback).is('function', 'Subscription::set_usage_data - Please provide a valid callback function.');

    usage.SUBSCRIPTION_ID = id;

    this.$request({
        service: this.$scope + 'setusagedata',
        data: usage
    }, onResult);
};

/**
 * Subscription#change_article
 *
 * Change article in subscription of a customer.
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
 *
 *     node-fastbill-automatic.subscription.update(1, modification, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 *
 * @param {number} id The id of the subscription that should be updated.
 * @param {object} modification The modifications.
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.change_article = function change_article (id, modification, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Subscription::change_article - Please provide a valid id of the subscription that should be updated.');
    mandatory(modification).is('object', 'Subscription::change_article - Please provide a valid object with modifications.');
    mandatory(callback).is('function', 'Subscription::change_article - Please provide a valid callback function.');

    modification.SUBSCRIPTION_ID = id;

    this.$request({
        service: this.$scope + 'changearticle',
        data: modification
    }, onResult);
};

/**
 * Subscription#get_usage_data
 *
 * Request of usage dependent bookings of an abonnement.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.get_usage_data
 *
 * Usage example:
 *
 *     var start = Date.now()-10,
 *         end = Date.now(),
 *     };
 *
 *     node-fastbill-automatic.subscription.update(1, start, end, function (err, result) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log('Recorded usage for next payment:' + result);
 *     });
 *
 *
 * @param {number} id The id of the subscription that should be updated.
 * @param {timestamp} start The modifications.
 * @param {timestamp} end The modifications.
 * @param {function} callback Error-first callback (err, result)
 *
 */
Subscription.prototype.get_usage_data = function get_usage_data (id, start, end, callback) {

    function onResult (err, result) {
        if (err) {
            return callback(err, null);
        }

        callback(null, result);
    }

    mandatory(id).is('number', 'Subscription::get_usage_data - Please provide a valid id of the subscription that should be updated.');
    mandatory(start).is('date', 'Subscription::get_usage_data - Please provide a valid start date.');
    mandatory(end).is('date', 'Subscription::get_usage_data - Please provide a valid end date.');
    mandatory(callback).is('function', 'Subscription::get_usage_data - Please provide a valid callback function.');

    var usage = {};

    usage.SUBSCRIPTION_ID = id;
    usage.START = start;
    usage.END = end;

    this.$request({
        service: this.$scope + 'getusagedata',
        data: usage
    }, onResult);
};


/**
 * Subscription#delete_usage_data
 *
 * Deletion of a booking dependent of usage.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.deleteusagedata
 *
 * Usage example:
 *
 *
 *     node-fastbill-automatic.subscription.delete_usage_data(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log('Succesfully deleted usage data');
 *     });
 *
 *
 * @param {number} usage_id The id of the subscription that should be updated.
 * @param {function} callback Error-first callback (err)
 *
 */

Subscription.prototype.delete_usage_data = function delete_usage_data(usage_id, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(usage_id).is('number', 'Subscription::update - Please provide a valid id of the subscription that should be updated.');
    mandatory(callback).is('function', 'Subscription::update - Please provide a valid callback function.');

    var usage = {};

    usage.USAGEDATA_ID = usage_id;

    this.$request({
        service: this.$scope + 'deleteusagedata',
        data: usage
    }, onResult);
};


/**
 * Subscription#delete
 *
 * Deletes a subscription.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.delete
 *
 * Usage example:
 *
 *     node-fastbill-automatic.subscription.delete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log('successfully deleted subscription');
 *     });
 *
 * @param {number} id The id of the subscription that should be deleted.
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.delete = function del (id, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Subscription::delete - Please provide a valid id of the subscription that should be deleted');
    mandatory(callback).is('function', 'Subscription::delete - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'delete',
        data: {SUBSCRIPTION_ID: id}
    }, onResult);
};


/**
 * Subscription#reactivate
 *
 *  Reactivates a cancelled subscription.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.reactivate
 *
 * Usage example:
 *
 *     node-fastbill-automatic.subscription.reactivate(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log('succesfully reactivated subscription');
 *     });
 *
 * @param {number} id The id of the subscription that should be deleted.
 * @param {function} callback Error-first callback (err, id)
 *
 */
Subscription.prototype.reactivate = function reactivate (id, callback) {

    function onResult (err, id) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }


    mandatory(id).is('number', 'Subscription::reactivate - Please provide a valid id of the subscription that should be reactivated');
    mandatory(callback).is('function', 'Subscription::reactivate - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'reactivate',
        data: {SUBSCRIPTION_ID: id}
    }, onResult);
};


/**
 * Subscription#cancel
 *
 * Cancels a running subscription. The cancellation date (after the payment of the last running payment period)
 * will be returned.
 *
 * http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.cancel
 *
 * Usage example:
 *
 *     node-fastbill-automatic.subscription.delete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the subscription that should be deleted.
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.cancel = function cancel (id, callback) {

    function onResult (err, data) {
        if (err) {
            return callback(err);
        }

        callback(null, data.CANCELLATION_DATE);
    }

    mandatory(id).is('number', 'Subscription::cancel - Please provide a valid id of the subscription that should be cancelled');
    mandatory(callback).is('function', 'Subscription::cancel - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'cancel',
        data: {SUBSCRIPTION_ID: id}
    }, onResult);
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
 *     node-fastbill-automatic.subscription.get_upcoming_amount(filters, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log('Receiving '+total+' within the next subscription cycle in Germany.');
 *     });
 *
 * @param {object} filters The filter object
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.get_upcoming_amount = function get_upcoming_amount (filters, callback) {

    function onResult (err, response) {
        if (err) {
            return callback(err);
        }

        callback(null, response.TOTAL);
    }


    mandatory(filters).is('object', 'Subscription::get_upcoming_amount - Please provide a valid filter object.');
    mandatory(callback).is('function', 'Subscription::get_upcoming_amount - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'getupcomingamount',
        data: filters
    }, onResult);
};

/**
 * Subscription#renew
 *
 * Renews a subscription.
 *
 * See: http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.renew
 *
 * Usage example:
 *
 *     node-fastbill-automatic.subscription.renew(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log('succesfully renewed subscription');
 *     });
 *
 * @param {number} id The id of the subscription that should be deleted.
 * @param {function} callback Error-first callback (err)
 *
 */
Subscription.prototype.renew = function renew (id, callback) {

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

    mandatory(id).is('number', 'Subscription::renew - Please provide a valid id of the subscription that should be renewed.');
    mandatory(callback).is('function', 'Subscription::renew - Please provide a valid callback function.');

    this.$request({
        service: this.$scope + 'cancel',
        data: {SUBSCRIPTION_ID: id}
    }, onResult);
};

/**
 * Subscription#setaddon
 *
 * Sets an addon to an existing subscription.
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
 *     node-fastbill-automatic.subscription.delete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 *     SUBSCRIPTION_ID	A specific subscription ID
 ARTICLE_NUMBER	Article number
 QUANTITY	Amount
 TITLE	Title
 UNIT_PRICE	Unit price
 DESCRIPTION	Description
 *
 * @param {number} id The id of the subscription that should be deleted.
 * @param {function} callback Error-first callback (err)
 *
 */

Subscription.prototype.setaddon = function setaddon (id, addon, callback) {

    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    mandatory(id).is('number', 'Subscription::delete - Please provide a valid id of the subscription that should be deleted');
    mandatory(addon).is('object', 'Subscription::setaddon - Please provide the addon object.');
    mandatory(callback).is('function', 'Subscription::delete - Please provide a valid callback function.');

    addon.SUBSCRIPTION_ID = id;

    this.$request({
        service: this.$scope + 'setaddon',
        data: addon
    }, onResult);
};