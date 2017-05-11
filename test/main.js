import chai from 'chai';
import { asserts, decorators, contract } from '../lib/contracts';

const {
    expect
} = chai;

describe( 'Asserts', () => {
    //:::::::::::::::::::::::::::::
    // asserts.assert
    //:::::::::::::::::::::::::::::
    it( 'assert throw exception', () => {
        expect( () => asserts.assert( 'Foo message', false ) ).to.throw( '[ContractError]: Foo message' );
    } );
    it( 'assert not throw exception', () => {
        expect( asserts.assert( 'Foo message', true ) ).to.undefined;
    } );


    //:::::::::::::::::::::::::::::
    // asserts.type
    //:::::::::::::::::::::::::::::
    it( 'assert.type throw exception', () => {
        expect( () => asserts.type( 'Foo message', 'number', 'bar' ) ).to.throw( '[ContractError]: Expected type "number", but given "string". Foo message' );
    } );
    it( 'assert.type not throw exception (string)', () => {
        expect( asserts.type( 'Foo message', 'string', 'bar' ) ).to.undefined;
    } );
    it( 'assert.type not throw exception (number)', () => {
        expect( asserts.type( 'Foo message', 'number', 42 ) ).to.undefined;
    } );
    it( 'assert.type not throw exception (object)', () => {
        expect( asserts.type( 'Foo message', 'object', {} ) ).to.undefined;
    } );
    it( 'assert.type not throw exception (undefined)', () => {
        expect( asserts.type( 'Foo message', 'undefined', undefined ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.string
    //:::::::::::::::::::::::::::::
    it( 'assert.string throw exception', () => {
        expect( () => asserts.string( 'Foo message', 42 ) ).to.throw( '[ContractError]: Expected string, but given "42", with type "number". Foo message' );
    } );
    it( 'assert.string not throw exception', () => {
        expect( asserts.string( 'Foo message', 'bar' ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.number
    //:::::::::::::::::::::::::::::
    it( 'assert.number throw exception', () => {
        expect( () => asserts.number( 'Foo message', 'foo' ) ).to.throw( '[ContractError]: Expected number, but given "foo", with type "string". Foo message' );
    } );
    it( 'assert.number not throw exception', () => {
        expect( asserts.number( 'Foo message', 42 ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.null
    //:::::::::::::::::::::::::::::
    it( 'assert.null throw exception', () => {
        expect( () => asserts.null( 'Foo message', 'foo' ) ).to.throw( '[ContractError]: Expected null, but given "foo", with type "string". Foo message' );
    } );
    it( 'assert.null not throw exception', () => {
        expect( asserts.null( 'Foo message', null ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.undefined
    //:::::::::::::::::::::::::::::
    it( 'assert.undefined throw exception', () => {
        expect( () => asserts.undefined( 'Foo message', 'foo' ) ).to.throw( '[ContractError]: Expected undefined, but given "foo", with type "string". Foo message' );
    } );
    it( 'assert.undefined not throw exception', () => {
        expect( asserts.undefined( 'Foo message', undefined ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.boolean
    //:::::::::::::::::::::::::::::
    it( 'assert.boolean throw exception', () => {
        expect( () => asserts.boolean( 'Foo message', 'foo' ) ).to.throw( '[ContractError]: Expected boolean, but given "foo", with type "string". Foo message' );
    } );
    it( 'assert.null not throw exception (true)', () => {
        expect( asserts.boolean( 'Foo message', true ) ).to.undefined;
    } );
    it( 'assert.null not throw exception (false)', () => {
        expect( asserts.boolean( 'Foo message', false ) ).to.undefined;
    } );


    //:::::::::::::::::::::::::::::
    // asserts.function
    //:::::::::::::::::::::::::::::
    it( 'assert.function throw exception', () => {
        expect( () => asserts.function( 'Foo message', 'foo' ) ).to.throw( '[ContractError]: Expected function, but given "foo", with type "string". Foo message' );
    } );
    it( 'assert.function not throw exception', () => {
        expect( asserts.function( 'Foo message', () => {} ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.array
    //:::::::::::::::::::::::::::::
    it( 'assert.array throw exception', () => {
        expect( () => asserts.array( 'Foo message', 'foo' ) ).to.throw( '[ContractError]: Expected array, but given "foo", with type "string". Foo message' );
    } );
    it( 'assert.array not throw exception', () => {
        expect( asserts.array( 'Foo message', [] ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.instance
    //:::::::::::::::::::::::::::::
    it( 'assert.instance throw exception', () => {
        function Foo() {}
        function Bar() {}
        expect( () => asserts.instance( 'Foo message', Foo, new Bar() ) ).to.throw( '[ContractError]: Expected instance of "function Foo() {}", but given "[object Object]" with type "object. Foo message' );
    } );
    it( 'assert.instance not throw exception', () => {
        function Foo() {}
        expect( asserts.instance( 'Foo message', Foo, new Foo() ) ).to.undefined;
    } );

    //:::::::::::::::::::::::::::::
    // asserts.prototype
    //:::::::::::::::::::::::::::::
    it( 'assert.prototype throw exception', () => {
        function Foo() {}
        Foo.prototype.foo = function() {};
        function Bar() {
            Foo.apply( this, arguments );
        }
        Bar.prototype = Object.create( Foo.prototype );
        Bar.prototype.constructor = Bar;
        expect( () => asserts.prototype( 'Foo message', Bar, Foo ) ).to.throw( '[ContractError]: Expected prototype of "function Bar() {\n            Foo.apply(this, arguments);\n        }", but given "function Foo() {}' );
    } );
    it( 'assert.prototype not throw exception', () => {
        function Fee() {}
        function Fi() {}
        Fi.prototype = new Fee();
        function Fo() {}
        Fo.prototype = new Fi();
        function Fum() {}
        Fum.prototype = new Fo();
        var fum = new Fum();
        expect( asserts.prototype( 'Foo message', Fi.prototype, fum ) ).to.undefined;
    } );
} );


describe( 'decorators', () => {
    //:::::::::::::::::::::::::::::
    // decorators.pre
    //:::::::::::::::::::::::::::::
    it( 'decorators.pre throw exceptions', () => {
        class Foo {
            @decorators.pre( 'Foo message', ( a ) => a !== 42 )
            foo( a ) {
                return a;
            }
        }
        const bar = new Foo();

        expect( () => bar.foo( 42 ) ).to.throw( '[ContractError]: Foo message' );
    } );

    it( 'decorators.pre', () => {
        var enter = false;
        class Foo {
            @decorators.pre( 'Foo', ( a ) => { enter = true; return a === 42; } )
            foo( a ) {
                return a;
            }
        }
        const bar = new Foo();

        expect( bar.foo( 42 ) ).to.be.equal( 42 );
        expect( enter ).to.be.true;
    } );

    //:::::::::::::::::::::::::::::
    // decorators.post
    //:::::::::::::::::::::::::::::
    it( 'decorators.post throw exceptions', () => {
        class Foo {
            @decorators.post( 'Foo message', ( result ) => result !== 42 )
            foo( a ) {
                return a;
            }
        }
        const bar = new Foo();

        expect( () => bar.foo( 42 ) ).to.throw( '[ContractError]: Foo message' );
    } );

    it( 'decorators.post', () => {
        var enter = false;
        class Foo {
            @decorators.post( 'Foo', ( result, a ) => { enter = true; return 84 === result && a === 42; } )
            foo( a ) {
                return 2 * a;
            }
        }
        const bar = new Foo();

        expect( bar.foo( 42 ) ).to.be.equal( 84 );
        expect( enter ).to.be.true;
    } );

    //:::::::::::::::::::::::::::::
    // decorators.invariant
    //:::::::::::::::::::::::::::::
    it( 'decorators.invariant throw exceptions', () => {
        class Foo {
            @decorators.invariant( 'Foo message', ( a ) => a !== 42 )
            foo( a ) {
                return a;
            }
        }
        const bar = new Foo();

        expect( () => bar.foo( 42 ) ).to.throw( '[ContractError]: Foo message' );
    } );

    it( 'decorators.invariant', () => {
        var enter = false;
        class Foo {
            @decorators.invariant( 'Foo', ( a ) => { enter = true; return a === 42; } )
            foo( a ) {
                return a;
            }
        }
        const bar = new Foo();

        expect( bar.foo( 42 ) ).to.be.equal( 42 );
        expect( enter ).to.be.true;
    } );
} );

describe( 'template string', () => {
    it( 'contract throw exceptions', () => {
        expect( () => {
            contract`Foo message ${ false } location: bar module`;
        } ).to.throw( '[ContractError]: Foo message  location: bar module' );
    } );

    it( 'contract', () => {
        expect( contract`Foo message ${true} location: bar module` ).to.be.equal( 'Foo message  location: bar module' );
    } );
} );


describe( 'example', () => {
    class Robot {
        constructor( name ) {
            asserts.string( 'Robot#constructor', name );
            this.name = name;
        }

        @decorators.post( 'Robot#say length', x => x.length > 0 )
        say() {
            return `Hi! My name is ${this.name}`;
        }

        @decorators.pre( 'Robot#goTo direction', direction => [ 'up', 'down', 'left', 'right' ].includes( direction ) )
        @decorators.pre( 'Robot#goTo distance', ( x, distance ) => distance > 0 )
        goTo( direction, distance ) {
            contract`Distance must be < 10${ distance < 10}`;
            return 42;
        }
    }

    it( 'bad name', () => {
        expect( () => new Robot( 42 ) ).to.throw( '[ContractError]: Expected string, but given "42", with type "number". Robot#constructor' );
    } );

    it( 'bad direction', () => {
        expect( () => ( new Robot( 'Logo' ) ).goTo( 'south' ) ).to.throw( '[ContractError]: Robot#goTo direction' );
    } );

    it( 'bad distance', () => {
        expect( () => ( new Robot( 'Logo' ) ).goTo( 'up', -1 ) ).to.throw( '[ContractError]: Robot#goTo distance' );
    } );

    it( 'bad distance (more 10)', () => {
        expect( () => ( new Robot( 'Logo' ) ).goTo( 'up', 11 ) ).to.throw( '[ContractError]: Distance must be < 10' );
    } );

    it( 'good', () => {
        expect( ( new Robot( 'Logo' ) ).goTo( 'down', 7 ) ).to.be.equal( 42 );
    } );
} );
