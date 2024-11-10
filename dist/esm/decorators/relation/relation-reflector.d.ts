import { Constructor } from '../../types.js';
import { RelationMetadata } from './relation-metadata.js';
import { RelationMetadataMap } from './relation-metadata.js';
/**
 * Relation reflector.
 */
export declare class RelationReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     * @param propertyKey
     */
    static setMetadata(metadata: RelationMetadata, target: Constructor, propertyKey: string): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): RelationMetadataMap;
}
