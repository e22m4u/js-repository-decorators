import { DecoratorTargetType } from '@e22m4u/ts-reflector';
import { RelationReflector } from './relation-reflector.js';
import { getDecoratorTargetType } from '@e22m4u/ts-reflector';
/**
 * Relation decorator.
 *
 * @param metadata
 */
export function relation(metadata) {
    return function (target, propertyKey) {
        const decoratorType = getDecoratorTargetType(target, propertyKey);
        if (decoratorType !== DecoratorTargetType.INSTANCE_PROPERTY)
            throw new Error('@relation decorator is only supported on an instance property.');
        RelationReflector.setMetadata(metadata, target.constructor, propertyKey);
    };
}
