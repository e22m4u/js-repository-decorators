import {Flatten} from '../../types.js';
import {PartialBy} from '../../types.js';
import {Constructor} from '../../types.js';
import {ModelMetadata} from './model-metadata.js';
import {ModelReflector} from './model-reflector.js';
import {DecoratorTargetType} from '@e22m4u/ts-reflector';
import {getDecoratorTargetType} from '@e22m4u/ts-reflector';
import {getTableNameByModelName} from '../../utils/index.js';

/**
 * Model options.
 */
export type ModelOptions = Flatten<PartialBy<ModelMetadata, 'name'>>;

/**
 * Model decorator.
 *
 * @param options
 */
export function model<T extends object>(options?: ModelOptions) {
  return function (target: Constructor<T>) {
    const decoratorType = getDecoratorTargetType(target);
    if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
      throw new Error('@model decorator is only supported on a class.');
    options = options ?? {};
    const modelName = options.name ?? target.name;
    const metadata = {
      ...options,
      name: modelName,
      tableName: options.tableName ?? getTableNameByModelName(modelName),
    };
    ModelReflector.setMetadata(metadata, target);
  };
}
