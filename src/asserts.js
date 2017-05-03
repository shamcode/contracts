export const ERROR_PREFIX = '[ContractError]:';

/**
 * @param {String} message
 * @param {String} result
 */
export function assert( message, result ) {
    if ( !result ) {
        throw new Error( `${ERROR_PREFIX} ${message}` );
    }
}

/**
 * @param {String} loc
 * @param {*} expectedType
 * @param {*} original
 */
export function assertType( loc, expectedType, original ) {
    if ( expectedType !== typeof original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected type "${expectedType}", but given "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {String} original
 */
export function assertString( loc, original ) {
    if ( 'string' !== typeof original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected string, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {Number} original
 */
export function assertNumber( loc, original ) {
    if ( 'number' !== typeof original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected number, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {null} original
 */
export function assertNull( loc, original ) {
    if ( null !== original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected null, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {Boolean} original
 */
export function assertBoolean( loc, original ) {
    if ( true !== original && false !== original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected boolean, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {undefined} original
 */
export function assertUndefined( loc, original ) {
    if ( undefined !== original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected undefined, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {Function} original
 */
export function assertFunction( loc, original ) {
    if ( 'function' !== typeof original ) {
        throw new Error(
            `${ERROR_PREFIX} Expected function, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {Array} original
 */
export function assertArray( loc, original ) {
    if ( !Array.isArray( original ) ) {
        throw new Error(
            `${ERROR_PREFIX} Expected array, but given "${original}", with type "${typeof original}". ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {Function} Constructor
 * @param {String} original
 */
export function assertInstance( loc, Constructor, original ) {
    if ( !( original instanceof Constructor ) ) {
        const expectedName = Constructor.toString ? Constructor.toString() : Constructor;
        const originalName = null !== original && undefined !== original && original.toString ?
            original.toString() :
            original;
        throw new Error(
            `${ERROR_PREFIX} Expected instance of "${expectedName}", but given "${originalName}" with type "${typeof original}. ${loc}`
        )
    }
}

/**
 * @param {String} loc
 * @param {*} Prototype
 * @param {*} original
 */
export function assertPrototype( loc, Prototype, original ) {
    if ( !( Prototype && Prototype.isPrototypeOf( original ) ) ) {
        const prototypeName = Prototype.toString ? Prototype.toString() : Prototype;
        const originalName = null !== original && undefined !== original && original.toString ? original.toString() : original;
        throw new Error(
            `${ERROR_PREFIX} Expected prototype of "${prototypeName}", but given "${originalName}". ${loc}`
        );
    }
}