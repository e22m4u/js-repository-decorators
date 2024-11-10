import { ModelReflector } from './model-reflector.js';
import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Model decorator.
 *
 * @param options
 */
export function model(options) {
    return function (target) {
        const decoratorType = getDecoratorTargetType(target);
        if (decoratorType !== DecoratorTargetType.CONSTRUCTOR)
            throw new Error('@model decorator is only supported on a class.');
        const metadata = {
            ...options,
            name: options.name ?? target.name,
        };
        ModelReflector.setMetadata(metadata, target);
    };
}
