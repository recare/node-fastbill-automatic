/*
 *
 * Contains custom error classes to wrap errors and handle them better.
 * Adds logging functionality to errors.
 *
 * Strongly inspired by stripe-node, kudos
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 */

'use strict';

/**
 * Generic Error class wrapper
 */

class ExtendableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

/**
 * Create subclasses of internal Error class to reflect
 */

export class FastbillError extends ExtendableError{
    constructor(message) {
        super(message)
    }
}

export class FastbilValueError extends ExtendableError{
    constructor(message) {
        super(message)
    }
}

export class FastbillTypeError extends ExtendableError{
    constructor(message) {
        super(message)
    }
}

export class FastbillConnectionError extends ExtendableError{
    constructor(message) {
        super(message)
    }
}

export class FastbillInvalidRequestError extends ExtendableError{
    constructor(message) {
        super(message)
    }
}