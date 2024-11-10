import {MetadataKey} from '@e22m4u/ts-reflector';
import {PropertyDefinition} from '@e22m4u/js-repository';

/**
 * Property metadata.
 */
export type PropertyMetadata = PropertyDefinition;

/**
 * Property metadata map.
 */
export type PropertyMetadataMap = Map<string, PropertyDefinition>;

/**
 * Properties metadata key.
 */
export const PROPERTIES_METADATA_KEY = new MetadataKey<PropertyMetadataMap>(
  'propertiesMetadataKey',
);
