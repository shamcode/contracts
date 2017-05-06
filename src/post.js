import { ERROR_PREFIX } from './asserts';

/**
 * @param {String} message
 * @param {Function} callback
 * @return {*}
 */
export function post( message, callback ) {
    return function( target, name, descriptor ) {
        if ( 'function' !== typeof descriptor.value ) {
            throw new SyntaxError( 'Only functions can be decorate with pre' );
        }
        return {
            ...descriptor,
            value: function() {
                const result = descriptor.value.apply( this, arguments );
                const args = [ result, ...arguments ];
                if ( !callback.apply( this, args ) ) {
                    throw new Error( `${ERROR_PREFIX} ${message}` );
                }
                return result;
            }
        }
    };
}