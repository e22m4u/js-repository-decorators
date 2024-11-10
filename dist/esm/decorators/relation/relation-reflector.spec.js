import { expect } from 'chai';
import { Reflector } from '@e22m4u/ts-reflector';
import { RelationType } from '@e22m4u/js-repository';
import { RelationReflector } from './relation-reflector.js';
import { RELATIONS_METADATA_KEY } from './relation-metadata.js';
describe('RelationReflector', function () {
    describe('setMetadata', function () {
        it('sets a given value as property metadata', function () {
            class Target {
                prop1;
                prop2;
            }
            const md1 = {
                type: RelationType.BELONGS_TO,
                model: 'myModel',
            };
            const md2 = {
                type: RelationType.HAS_MANY,
                model: 'myModel',
                foreignKey: 'myKey',
            };
            RelationReflector.setMetadata(md1, Target, 'prop1');
            RelationReflector.setMetadata(md2, Target, 'prop2');
            const res = Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, Target);
            expect(res.size).to.be.eq(2);
            expect(res.get('prop1')).to.be.eq(md1);
            expect(res.get('prop2')).to.be.eq(md2);
        });
    });
    describe('getMetadata', function () {
        it('returns an empty map if no metadata', function () {
            class Target {
            }
            const res = RelationReflector.getMetadata(Target);
            expect(res).to.be.instanceof(Map);
            expect(res).to.be.empty;
        });
        it('returns an existing metadata of the target', function () {
            class Target {
                prop1;
                prop2;
            }
            const md1 = {
                type: RelationType.BELONGS_TO,
                model: 'myModel',
            };
            const md2 = {
                type: RelationType.HAS_MANY,
                model: 'myModel',
                foreignKey: 'myKey',
            };
            RelationReflector.setMetadata(md1, Target, 'prop1');
            RelationReflector.setMetadata(md2, Target, 'prop2');
            const res = RelationReflector.getMetadata(Target);
            expect(res.size).to.be.eq(2);
            expect(res.get('prop1')).to.be.eq(md1);
            expect(res.get('prop2')).to.be.eq(md2);
        });
    });
});
