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
import { Reflector } from '@e22m4u/ts-reflector';
import { relation } from './relation-decorator.js';
import { RelationType } from '@e22m4u/js-repository';
import { RELATIONS_METADATA_KEY } from './relation-metadata.js';
describe('relation', function () {
    it('sets a given metadata to property', function () {
        const md1 = {
            type: RelationType.BELONGS_TO,
            model: 'myModel',
        };
        const md2 = {
            type: RelationType.HAS_MANY,
            model: 'myModel',
            foreignKey: 'myKey',
        };
        class Target {
            prop1;
            prop2;
        }
        __decorate([
            relation(md1),
            __metadata("design:type", String)
        ], Target.prototype, "prop1", void 0);
        __decorate([
            relation(md2),
            __metadata("design:type", Number)
        ], Target.prototype, "prop2", void 0);
        const res = Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, Target);
        expect(res.size).to.be.eq(2);
        expect(res.get('prop1')).to.be.eq(md1);
        expect(res.get('prop2')).to.be.eq(md2);
    });
});
