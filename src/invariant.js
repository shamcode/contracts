import { ERROR_PREFIX } from './asserts';

/**
 * @param {String} message
 * @param {Function} callback
 * @return {*}
 */
export function invariant( message, callback ) {
    return function( target, name, descriptor ) {
        if ( 'function' !== typeof descriptor.value ) {
            throw new SyntaxError( 'Only functions can be decorate with pre' );
        }
        return {
            ...descriptor,
            value: function() {
                if ( !callback( ...arguments ) ) {
                    throw new Error( `${ERROR_PREFIX} ${message}` );
                }
                const result = descriptor.value.apply( this, arguments );
                if ( !callback( ...arguments ) ) {
                    throw new Error( `${ERROR_PREFIX} ${message}` );
                }
                return result;
            }
        }
    };
}