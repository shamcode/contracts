import {
    assert,
    assertType,
    assertString,
    assertNumber,
    assertNull,
    assertBoolean,
    assertUndefined,
    assertFunction,
    assertArray,
    assertInstance,
    assertPrototype
} from './asserts';
import { pre } from './pre';
import { post } from './post';
import { invariant } from './invariant';

export const asserts = {
    assert,
    type: assertType,
    string: assertString,
    number: assertNumber,
    null: assertNull,
    boolean: assertBoolean,
    undefined: assertUndefined,
    "function": assertFunction,
    array: assertArray,
    instance: assertInstance,
    prototype: assertPrototype
};
export const decorators = {
    pre,
    post,
    invariant
};
export { default as contract } from './templates';