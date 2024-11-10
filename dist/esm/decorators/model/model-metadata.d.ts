import { MetadataKey } from '@e22m4u/ts-reflector';
import { ModelDefinition } from '@e22m4u/js-repository';
/**
 * Model metadata.
 */
export type ModelMetadata = Omit<ModelDefinition, 'properties' | 'relations'>;
/**
 * Model metadata key.
 */
export declare const MODEL_METADATA_KEY: MetadataKey<ModelMetadata>;
