import { Reflector } from '@e22m4u/ts-reflector';
import { RELATIONS_METADATA_KEY } from './relation-metadata.js';
/**
 * Relation reflector.
 */
export class RelationReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata, target, propertyKey) {
        const oldMap = Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, target);
        const newMap = new Map(oldMap);
        newMap.set(propertyKey, metadata);
        Reflector.defineMetadata(RELATIONS_METADATA_KEY, newMap, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        const metadata = Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, target);
        return metadata ?? new Map();
    }
}
