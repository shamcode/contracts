import { ERROR_PREFIX } from './asserts';

/**
 * @param {String} message
 * @param {Function} callback
 * @return {*}
 */
export function pre( message, callback ) {
    return function( target, name, descriptor ) {
        if ( 'function' !== typeof descriptor.value ) {
            throw new SyntaxError( 'Only functions can be decorate with pre' );
        }
        return {
            ...descriptor,
            value: function() {
                if ( !callback.apply( this, arguments ) ) {
                    throw new Error( `${ERROR_PREFIX} ${message}` );
                }
                return descriptor.value.apply( this, arguments );
            }
        }
    };
}