import { Reflector } from '@e22m4u/ts-reflector';
import { PROPERTIES_METADATA_KEY } from './property-metadata.js';
/**
 * Property reflector.
 */
export class PropertyReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata, target, propertyKey) {
        const oldMap = Reflector.getOwnMetadata(PROPERTIES_METADATA_KEY, target);
        const newMap = new Map(oldMap);
        newMap.set(propertyKey, metadata);
        Reflector.defineMetadata(PROPERTIES_METADATA_KEY, newMap, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        const metadata = Reflector.getOwnMetadata(PROPERTIES_METADATA_KEY, target);
        return metadata ?? new Map();
    }
}
