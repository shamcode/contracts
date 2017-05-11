# contracts
Library for https://en.wikipedia.org/wiki/Design_by_contract

## Example

```js
import { asserts, decorators, contract } from 'contracts';

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

new Robot( 42 ); // Throw exception '[ContractError]: Expected string, but given "42", with type "number". Robot#constructor'
( new Robot( 'Logo' ) ).goTo( 'south', 10 ) // Throw exception '[ContractError]: Robot#goTo direction'
( new Robot( 'Logo' ) ).goTo( 'up', -1 ) // Throw exception '[ContractError]: Robot#goTo distance'
( new Robot( 'Logo' ) ).goTo( 'up', 11 ) // Throw exception '[ContractError]: Distance must be < 10'
( new Robot( 'Logo' ) ).goTo( 'down', 7 ) // Return 42
```

## Install

## API

### Precondition

```js
import { decorators } from 'contracts';
@decorators.pre( 'Message', () => { ... } )
```