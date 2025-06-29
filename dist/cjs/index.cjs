"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  MODEL_METADATA_KEY: () => MODEL_METADATA_KEY,
  ModelReflector: () => ModelReflector,
  NotAModelClassError: () => NotAModelClassError,
  PROPERTIES_METADATA_KEY: () => PROPERTIES_METADATA_KEY,
  PropertyReflector: () => PropertyReflector,
  RELATIONS_METADATA_KEY: () => RELATIONS_METADATA_KEY,
  RelationReflector: () => RelationReflector,
  getModelDefinitionFromClass: () => getModelDefinitionFromClass,
  model: () => model,
  property: () => property,
  relation: () => relation
});
module.exports = __toCommonJS(index_exports);

// dist/esm/decorators/model/model-metadata.js
var import_ts_reflector = require("@e22m4u/ts-reflector");
var MODEL_METADATA_KEY = new import_ts_reflector.MetadataKey("modelMetadataKey");

// dist/esm/decorators/model/model-reflector.js
var import_ts_reflector2 = require("@e22m4u/ts-reflector");
var _ModelReflector = class _ModelReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   */
  static setMetadata(metadata, target) {
    return import_ts_reflector2.Reflector.defineMetadata(MODEL_METADATA_KEY, metadata, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    return import_ts_reflector2.Reflector.getOwnMetadata(MODEL_METADATA_KEY, target);
  }
};
__name(_ModelReflector, "ModelReflector");
var ModelReflector = _ModelReflector;

// dist/esm/decorators/model/model-decorator.js
var import_ts_reflector3 = require("@e22m4u/ts-reflector");
var import_ts_reflector4 = require("@e22m4u/ts-reflector");
function model(options) {
  return function(target) {
    const decoratorType = (0, import_ts_reflector4.getDecoratorTargetType)(target);
    if (decoratorType !== import_ts_reflector3.DecoratorTargetType.CONSTRUCTOR)
      throw new Error("@model decorator is only supported on a class.");
    options = options ?? {};
    const metadata = {
      ...options,
      name: options.name ?? target.name
    };
    ModelReflector.setMetadata(metadata, target);
  };
}
__name(model, "model");

// dist/esm/decorators/property/property-metadata.js
var import_ts_reflector5 = require("@e22m4u/ts-reflector");
var PROPERTIES_METADATA_KEY = new import_ts_reflector5.MetadataKey("propertiesMetadataKey");

// dist/esm/decorators/property/property-reflector.js
var import_ts_reflector6 = require("@e22m4u/ts-reflector");
var _PropertyReflector = class _PropertyReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    const oldMap = import_ts_reflector6.Reflector.getOwnMetadata(PROPERTIES_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    import_ts_reflector6.Reflector.defineMetadata(PROPERTIES_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector6.Reflector.getOwnMetadata(PROPERTIES_METADATA_KEY, target);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_PropertyReflector, "PropertyReflector");
var PropertyReflector = _PropertyReflector;

// dist/esm/decorators/property/property-decorator.js
var import_ts_reflector7 = require("@e22m4u/ts-reflector");
var import_ts_reflector8 = require("@e22m4u/ts-reflector");
function property(metadata) {
  return function(target, propertyKey) {
    const decoratorType = (0, import_ts_reflector8.getDecoratorTargetType)(target, propertyKey, void 0);
    if (decoratorType !== import_ts_reflector7.DecoratorTargetType.INSTANCE_PROPERTY)
      throw new Error("@property decorator is only supported on an instance property.");
    PropertyReflector.setMetadata(metadata, target.constructor, propertyKey);
  };
}
__name(property, "property");

// dist/esm/decorators/relation/relation-metadata.js
var import_ts_reflector9 = require("@e22m4u/ts-reflector");
var RELATIONS_METADATA_KEY = new import_ts_reflector9.MetadataKey("relationsMetadataKey");

// dist/esm/decorators/relation/relation-reflector.js
var import_ts_reflector10 = require("@e22m4u/ts-reflector");
var _RelationReflector = class _RelationReflector {
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    const oldMap = import_ts_reflector10.Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, target);
    const newMap = new Map(oldMap);
    newMap.set(propertyKey, metadata);
    import_ts_reflector10.Reflector.defineMetadata(RELATIONS_METADATA_KEY, newMap, target);
  }
  /**
   * Get metadata.
   *
   * @param target
   */
  static getMetadata(target) {
    const metadata = import_ts_reflector10.Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, target);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};
__name(_RelationReflector, "RelationReflector");
var RelationReflector = _RelationReflector;

// dist/esm/decorators/relation/relation-decorator.js
var import_ts_reflector11 = require("@e22m4u/ts-reflector");
var import_ts_reflector12 = require("@e22m4u/ts-reflector");
function relation(metadata) {
  return function(target, propertyKey) {
    const decoratorType = (0, import_ts_reflector12.getDecoratorTargetType)(target, propertyKey);
    if (decoratorType !== import_ts_reflector11.DecoratorTargetType.INSTANCE_PROPERTY)
      throw new Error("@relation decorator is only supported on an instance property.");
    RelationReflector.setMetadata(metadata, target.constructor, propertyKey);
  };
}
__name(relation, "relation");

// dist/esm/errors/not-a-model-class-error.js
var import_js_format = require("@e22m4u/js-format");
var _NotAModelClassError = class _NotAModelClassError extends import_js_format.Errorf {
  /**
   * Constructor.
   *
   * @param value
   */
  constructor(value) {
    super("%v is not a model class.", value);
  }
};
__name(_NotAModelClassError, "NotAModelClassError");
var NotAModelClassError = _NotAModelClassError;

// dist/esm/utils/get-model-definition-from-class.js
function getModelDefinitionFromClass(ctor) {
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
__name(getModelDefinitionFromClass, "getModelDefinitionFromClass");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MODEL_METADATA_KEY,
  ModelReflector,
  NotAModelClassError,
  PROPERTIES_METADATA_KEY,
  PropertyReflector,
  RELATIONS_METADATA_KEY,
  RelationReflector,
  getModelDefinitionFromClass,
  model,
  property,
  relation
});
