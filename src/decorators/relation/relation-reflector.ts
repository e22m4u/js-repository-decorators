import {Constructor} from '../../types.js';
import {Reflector} from '@e22m4u/ts-reflector';
import {RelationMetadata} from './relation-metadata.js';
import {RelationMetadataMap} from './relation-metadata.js';
import {RELATIONS_METADATA_KEY} from './relation-metadata.js';

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
  static setMetadata(
    metadata: RelationMetadata,
    target: Constructor,
    propertyKey: string,
  ) {
    const oldMap = Reflector.getMetadata(RELATIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    Reflector.defineMetadata(RELATIONS_METADATA_KEY, newMap, target);
  }

  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target: Constructor): RelationMetadataMap {
    const metadata = Reflector.getMetadata(RELATIONS_METADATA_KEY, target);
    return metadata ?? new Map();
  }
}
