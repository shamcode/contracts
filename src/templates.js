import { ERROR_PREFIX } from './asserts';

export default function( strings, ...values ) {
    const failIndex = values.findIndex( ( value ) => !value );
    const message = strings.join( '' );
    if ( -1 !== failIndex ) {
        throw new Error( `${ERROR_PREFIX} ${message}` );
    }
    return message;
}