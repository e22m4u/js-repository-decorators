import { Flatten } from '../../types.js';
import { PartialBy } from '../../types.js';
import { Constructor } from '../../types.js';
import { ModelMetadata } from './model-metadata.js';
/**
 * Model options.
 */
export type ModelOptions = Flatten<PartialBy<ModelMetadata, 'name'>>;
/**
 * Model decorator.
 *
 * @param options
 */
export declare function model<T extends object>(options?: ModelOptions): (target: Constructor<T>) => void;
