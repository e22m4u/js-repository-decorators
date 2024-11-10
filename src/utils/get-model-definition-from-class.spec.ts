import {expect} from 'chai';
import {model} from '../decorators/index.js';
import {DataType} from '@e22m4u/js-repository';
import {property} from '../decorators/index.js';
import {relation} from '../decorators/index.js';
import {RelationType} from '@e22m4u/js-repository';
import {ModelDefinition} from '@e22m4u/js-repository';
import {NotAModelClassError} from '../errors/index.js';
import {PropertyDefinition} from '@e22m4u/js-repository';
import {RelationDefinition} from '@e22m4u/js-repository';
import {getModelDefinitionFromClass} from './get-model-definition-from-class.js';

describe('getModelDefinitionFromClass', function () {
  it('requires the model metadata', function () {
    class MyModel {}
    const throwable = () => getModelDefinitionFromClass(MyModel);
    expect(throwable).to.throw(NotAModelClassError);
  });

  it('returns model definition from a given class', function () {
    const modelDef: ModelDefinition = {
      base: 'MyBaseModel',
      name: 'MyModelName',
      tableName: 'myTableName',
      datasource: 'myDatasource',
    };
    const propDef1: PropertyDefinition = {
      type: DataType.STRING,
      default: 'myValue',
    };
    const propDef2: PropertyDefinition = {
      type: DataType.NUMBER,
      default: 10,
    };
    const relDef1: RelationDefinition = {
      type: RelationType.BELONGS_TO,
      model: 'TargetModel1',
    };
    const relDef2: RelationDefinition = {
      type: RelationType.HAS_MANY,
      model: 'TargetModel2',
      foreignKey: 'foreignId',
    };
    @model(modelDef)
    class MyModel {
      @property(propDef1)
      prop1?: string;
      @property(propDef2)
      prop2?: number;
      @relation(relDef1)
      rel1?: object;
      @relation(relDef2)
      rel2?: object;
    }
    const res = getModelDefinitionFromClass(MyModel);
    expect(res).to.be.eql({
      ...modelDef,
      properties: {
        prop1: propDef1,
        prop2: propDef2,
      },
      relations: {
        rel1: relDef1,
        rel2: relDef2,
      },
    });
  });
});
