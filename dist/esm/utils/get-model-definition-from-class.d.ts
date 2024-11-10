import { Constructor } from '../types.js';
import { ModelDefinition } from '@e22m4u/js-repository';
/**
 * Get model definition from class.
 *
 * @param ctor
 */
export declare function getModelDefinitionFromClass<T extends object>(ctor: Constructor<T>): ModelDefinition;
