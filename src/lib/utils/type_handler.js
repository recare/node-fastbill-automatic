'use strict';

import {FastbillTypeError} from './errors';

export function typeOf(param) {
    return {
        mustBe: function (type) {
            if (typeof param !== type) {
                throw new FastbillTypeError(`${param} is not of expected type ${type}`);
            } else {
                return true
            }
        }
    };
}