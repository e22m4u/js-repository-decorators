import { ModelReflector } from '../decorators/index.js';
import { NotAModelClassError } from '../errors/index.js';
import { RelationReflector } from '../decorators/index.js';
import { PropertyReflector } from '../decorators/index.js';
/**
 * Get model definition from class.
 *
 * @param ctor
 */
export function getModelDefinitionFromClass(ctor) {
    const modelMd = ModelReflector.getMetadata(ctor);
    if (!modelMd)
        throw new NotAModelClassError(ctor);
    const propsMd = PropertyReflector.getMetadata(ctor);
    const relsMd = RelationReflector.getMetadata(ctor);
    const propDefs = Object.fromEntries(propsMd);
    const relDefs = Object.fromEntries(relsMd);
    const modelDef = { ...modelMd };
    if (Object.keys(propDefs).length)
        modelDef.properties = propDefs;
    if (Object.keys(relDefs).length)
        modelDef.relations = relDefs;
    return modelDef;
}
