import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { PropertyReflector } from './property-reflector.js';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Property decorator.
 *
 * @param metadata
 */
export function property(metadata) {
    return function (target, propertyKey) {
        const decoratorType = getDecoratorTargetType(target, propertyKey, undefined);
        if (decoratorType !== DecoratorTargetType.INSTANCE_PROPERTY)
            throw new Error('@property decorator is only supported on an instance property.');
        PropertyReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
