import { expect } from 'chai';
import { Reflector } from '@e22m4u/ts-reflector';
import { DataType } from '@e22m4u/js-repository';
import { PropertyReflector } from './property-reflector.js';
import { PROPERTIES_METADATA_KEY } from './property-metadata.js';
describe('PropertyReflector', function () {
    describe('setMetadata', function () {
        it('sets a given value as property metadata', function () {
            class Target {
                prop1;
                prop2;
            }
            const md1 = { type: DataType.STRING };
            const md2 = { type: DataType.NUMBER };
            PropertyReflector.setMetadata(md1, Target, 'prop1');
            PropertyReflector.setMetadata(md2, Target, 'prop2');
            const res = Reflector.getOwnMetadata(PROPERTIES_METADATA_KEY, Target);
            expect(res.size).to.be.eq(2);
            expect(res.get('prop1')).to.be.eq(md1);
            expect(res.get('prop2')).to.be.eq(md2);
        });
    });
    describe('getMetadata', function () {
        it('returns an empty map if no metadata', function () {
            class Target {
            }
            const res = PropertyReflector.getMetadata(Target);
            expect(res).to.be.instanceof(Map);
            expect(res).to.be.empty;
        });
        it('returns an existing metadata of the target', function () {
            class Target {
                prop1;
                prop2;
            }
            const md1 = { type: DataType.STRING };
            const md2 = { type: DataType.NUMBER };
            PropertyReflector.setMetadata(md1, Target, 'prop1');
            PropertyReflector.setMetadata(md2, Target, 'prop2');
            const res = PropertyReflector.getMetadata(Target);
            expect(res.size).to.be.eq(2);
            expect(res.get('prop1')).to.be.eq(md1);
            expect(res.get('prop2')).to.be.eq(md2);
        });
    });
});
