import { Reflector } from '@e22m4u/ts-reflector';
import { MODEL_METADATA_KEY } from './model-metadata.js';
/**
 * Model reflector.
 */
export class ModelReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata, target) {
        return Reflector.defineMetadata(MODEL_METADATA_KEY, metadata, target);
    }
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target) {
        return Reflector.getOwnMetadata(MODEL_METADATA_KEY, target);
    }
}
