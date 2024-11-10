import { Prototype } from '../../types.js';
import { PropertyMetadata } from './property-metadata.js';
/**
 * Property decorator.
 *
 * @param metadata
 */
export declare function property<T extends object>(metadata: PropertyMetadata): (target: Prototype<T>, propertyKey: string) => void;
