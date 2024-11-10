import { Constructor } from '../../types.js';
import { ModelMetadata } from './model-metadata.js';
/**
 * Model reflector.
 */
export declare class ModelReflector {
    /**
     * Set metadata.
     *
     * @param metadata
     * @param target
     */
    static setMetadata(metadata: ModelMetadata, target: Constructor): void;
    /**
     * Get metadata.
     *
     * @param target
     */
    static getMetadata(target: Constructor): ModelMetadata | undefined;
}
