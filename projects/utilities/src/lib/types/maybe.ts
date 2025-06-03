/**
 * Represents a value that may or may not be present.
 *
 * The `Maybe<T>` type is a lightweight abstraction used to express
 * optionality, allowing a value to be either:
 * - A valid value of type `T`
 * - `null`, representing explicit emptiness
 * - `undefined`, representing implicit absence
 *
 * This is useful when a function might not return a result, but you want
 * to encode that possibility in the type system without using exceptions.
 *
 * @template T - The underlying type of the value that may be present.
 */
export type Maybe<T> = T | null | undefined;
