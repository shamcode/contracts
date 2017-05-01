
/**
 * @param {Function} callback
 * @return {*}
 */
export function pre( callback ) {
    return function( target, name, descriptor ) {
        if ( 'function' !== typeof descriptor.value ) {
            throw new SyntaxError( 'Only functions can be decorate with pre' );
        }
        return {
            ...descriptor,
            value: function() {
                callback.apply( this, arguments );
                return descriptor.value.apply( this, arguments );
            }
        }
    };
}