import { Prototype } from '../../types.js';
import { RelationMetadata } from './relation-metadata.js';
/**
 * Relation decorator.
 *
 * @param metadata
 */
export declare function relation<T extends object>(metadata: RelationMetadata): (target: Prototype<T>, propertyKey: string) => void;
