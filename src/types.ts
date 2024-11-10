/* eslint @typescript-eslint/no-explicit-any: 0 */

/**
 * Callable type with the "new" operator
 * that allows class and constructor types.
 */
export interface Constructor<T = unknown> {
  new (...args: any[]): T;
}

/**
 * Object prototype that excludes
 * function and scalar values.
 */
export type Prototype<T = unknown> = T &
  object & {bind?: never} & {call?: never} & {prototype?: object};

/**
 * Make a specific property as optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * A part of the Flatten type.
 */
export type Identity<T> = T;

/**
 * Makes T more human-readable.
 */
export type Flatten<T> = Identity<{[k in keyof T]: T[k]}>;
