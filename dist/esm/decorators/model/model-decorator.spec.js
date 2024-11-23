var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { expect } from 'chai';
import { model } from './model-decorator.js';
import { ModelReflector } from './model-reflector.js';
describe('model', function () {
    it('does not require arguments', function () {
        let Target = class Target {
        };
        Target = __decorate([
            model()
        ], Target);
        const res = ModelReflector.getMetadata(Target);
        expect(res).to.be.eql({ name: 'Target' });
    });
    it('sets given options to the target metadata', function () {
        let Target = class Target {
        };
        Target = __decorate([
            model({
                tableName: 'MyTable',
                datasource: 'myDatasource',
            })
        ], Target);
        const res = ModelReflector.getMetadata(Target);
        expect(res).to.be.eql({
            name: 'Target',
            tableName: 'MyTable',
            datasource: 'myDatasource',
        });
    });
    it('allows to override model name', function () {
        let Target = class Target {
        };
        Target = __decorate([
            model({
                name: 'MyModel',
                datasource: 'myDatasource',
            })
        ], Target);
        const res = ModelReflector.getMetadata(Target);
        expect(res).to.be.eql({
            name: 'MyModel',
            datasource: 'myDatasource',
        });
    });
});
