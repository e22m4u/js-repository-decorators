import {MetadataKey} from '@e22m4u/ts-reflector';
import {RelationDefinition} from '@e22m4u/js-repository';

/**
 * Relation metadata.
 */
export type RelationMetadata = RelationDefinition;

/**
 * Relation metadata map.
 */
export type RelationMetadataMap = Map<string, RelationDefinition>;

/**
 * Relations metadata key.
 */
export const RELATIONS_METADATA_KEY = new MetadataKey<RelationMetadataMap>(
  'relationsMetadataKey',
);
