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

import {FastbillAPI} from './fastbill_api';
import {typeOf} from './utils/type_handler';

import {
    FastbillConnectionError,
    FastbillInvalidRequestError,
    FastbilValueError,
    FastbillTypeError
    } from './utils/errors';


export function subscriptionFactory (credentials) {
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

class Subscription extends FastbillAPI{
    constructor(credentials){
        super(credentials);
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


    get(options) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            console.log(resultset);
            resolve(resultset.SUBSCRIPTIONS);
        }

        options = options || {};
        typeOf(options).mustBe('object');

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

    create(subscription) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.SUBSCRIPTION_ID);
        }

        subscription = subscription || {};
        typeOf(subscription).mustBe('object');

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
    update(id, modification) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');
        typeOf(modification).mustBe('object');
        modification.SUBSCRIPTION_ID = id;

        vm.$request({
            service: vm.$scope + 'update',
            data: modification
        }, onResult);
    });
};

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

    setUsageData(id, usage) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');
        typeOf(usage).mustBe('object');
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

    changeArticle(id, modification) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');
        typeOf(modification).mustBe('object');
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

    getUsageData(id, start, end) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset);
        }

        typeOf(id).mustBe('number');
        typeOf(start).mustBe('number');
        typeOf(end).mustBe('number');

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

    deleteUsageData(usage_id) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        var usage = {};
        typeOf(usage_id).mustBe('number');
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
    remove(id) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');

        vm.$request({
            service: vm.$scope + 'delete',
            data: {SUBSCRIPTION_ID: id}
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
    reactivate(id) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');

        vm.$request({
            service: vm.$scope + 'reactivate',
            data: {SUBSCRIPTION_ID: id}
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

    cancel(id) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.CANCELLATION_DATE);
        }

        typeOf(id).mustBe('number');

        vm.$request({
            service: vm.$scope + 'cancel',
            data: {SUBSCRIPTION_ID: id}
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

    getUpcomingAmount(filters) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(resultset.TOTAL);
        }


        typeOf(filters).mustBe('object');

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
     * @see http://www.fastbill-automatic.com/api/automatic/en/subscription.html#subscription.renew
     *
     * Usage example:
     *
     *     fastbill.subscription.renew(1).then(...).catch(...)
     *
     * @param {number} id The id of the subscription that should be deleted.
     *
     */

    renew(id) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');

        vm.$request({
            service: vm.$scope + 'cancel',
            data: {SUBSCRIPTION_ID: id}
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

    setaddon(id, addon) {
    var vm = this;
    return new Promise((resolve, reject) => {
        function onResult(err, resultset) {
            if (err) {
                return reject(
                    new FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    })
                );
            }
            resolve(true);
        }

        typeOf(id).mustBe('number');
        typeOf(addon).mustBe('object');

        addon.SUBSCRIPTION_ID = id;

        vm.$request({
            service: vm.$scope + 'setaddon',
            data: addon
        }, onResult);
    });
}

}


