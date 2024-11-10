var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { expect } from 'chai';
import { model } from '../decorators/index.js';
import { DataType } from '@e22m4u/js-repository';
import { property } from '../decorators/index.js';
import { relation } from '../decorators/index.js';
import { RelationType } from '@e22m4u/js-repository';
import { NotAModelClassError } from '../errors/index.js';
import { getModelDefinitionFromClass } from './get-model-definition-from-class.js';
describe('getModelDefinitionFromClass', function () {
    it('requires the model metadata', function () {
        class MyModel {
        }
        const throwable = () => getModelDefinitionFromClass(MyModel);
        expect(throwable).to.throw(NotAModelClassError);
    });
    it('returns model definition from a given class', function () {
        const modelDef = {
            base: 'MyBaseModel',
            name: 'MyModelName',
            tableName: 'myTableName',
            datasource: 'myDatasource',
        };
        const propDef1 = {
            type: DataType.STRING,
            default: 'myValue',
        };
        const propDef2 = {
            type: DataType.NUMBER,
            default: 10,
        };
        const relDef1 = {
            type: RelationType.BELONGS_TO,
            model: 'TargetModel1',
        };
        const relDef2 = {
            type: RelationType.HAS_MANY,
            model: 'TargetModel2',
            foreignKey: 'foreignId',
        };
        let MyModel = class MyModel {
            prop1;
            prop2;
            rel1;
            rel2;
        };
        __decorate([
            property(propDef1),
            __metadata("design:type", String)
        ], MyModel.prototype, "prop1", void 0);
        __decorate([
            property(propDef2),
            __metadata("design:type", Number)
        ], MyModel.prototype, "prop2", void 0);
        __decorate([
            relation(relDef1),
            __metadata("design:type", Object)
        ], MyModel.prototype, "rel1", void 0);
        __decorate([
            relation(relDef2),
            __metadata("design:type", Object)
        ], MyModel.prototype, "rel2", void 0);
        MyModel = __decorate([
            model(modelDef)
        ], MyModel);
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
