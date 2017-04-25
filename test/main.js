const expect = require( 'chai' ).expect;
const contracts = require( '../lib/contracts' );

const {
    assert
} = contracts;

describe( 'Main', () => {
    it( 'first test', () => {
        expect( assert.assertType() ).to.be.equal( 42 );
    } );
} );