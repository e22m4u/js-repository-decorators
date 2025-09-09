import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {ModelMetadata} from './model-metadata.js';
import {MODEL_METADATA_KEY} from './model-metadata.js';

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
  static setMetadata(metadata: ModelMetadata, target: Constructor) {
    return Reflector.defineMetadata(MODEL_METADATA_KEY, metadata, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): ModelMetadata | undefined {
    return Reflector.getMetadata(MODEL_METADATA_KEY, target);
  }
}
