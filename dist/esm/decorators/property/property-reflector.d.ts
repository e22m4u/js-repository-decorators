import { Constructor } from '../../types.js';
import { PropertyMetadata } from './property-metadata.js';
import { PropertyMetadataMap } from './property-metadata.js';
/**
 * Property reflector.
 */
export declare class PropertyReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: PropertyMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): PropertyMetadataMap;
}
