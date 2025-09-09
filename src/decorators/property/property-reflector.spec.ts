import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {DataType} from '@e22m4u/js-repository';
import {mapEntries} from '../../utils/map-entries.js';
import {PropertyReflector} from './property-reflector.js';
import {PROPERTIES_METADATA_KEY} from './property-metadata.js';

const MD1 = {type: DataType.STRING};
const MD2 = {type: DataType.NUMBER};

describe('PropertyReflector', function () {
  describe('setMetadata', function () {
    it('should add a property metadata to a target class', function () {
      class Target {
        prop1?: string;
        prop2?: number;
      }
      PropertyReflector.setMetadata(MD1, Target, 'prop1');
      PropertyReflector.setMetadata(MD2, Target, 'prop2');
      const res = Reflector.getMetadata(PROPERTIES_METADATA_KEY, Target);
      expect(mapEntries(res)).to.be.eql([
        ['prop1', MD1],
        ['prop2', MD2],
      ]);
    });

    it('should extend a target metadata that inherits from a parent class', function () {
      class BaseTarget {
        prop1?: string;
      }
      class Target extends BaseTarget {
        prop2?: number;
      }
      PropertyReflector.setMetadata(MD1, BaseTarget, 'prop1');
      PropertyReflector.setMetadata(MD2, Target, 'prop2');
      const res = Reflector.getMetadata(PROPERTIES_METADATA_KEY, Target);
      expect(mapEntries(res)).to.be.eql([
        ['prop1', MD1],
        ['prop2', MD2],
      ]);
    });

    it('should not affect a parent metadata', function () {
      class BaseTarget {
        prop1?: string;
      }
      class Target extends BaseTarget {
        prop2?: number;
      }
      PropertyReflector.setMetadata(MD1, BaseTarget, 'prop1');
      const res1 = Reflector.getMetadata(PROPERTIES_METADATA_KEY, BaseTarget);
      expect(mapEntries(res1)).to.be.eql([['prop1', MD1]]);
      PropertyReflector.setMetadata(MD2, Target, 'prop2');
      const res2 = Reflector.getMetadata(PROPERTIES_METADATA_KEY, Target);
      const res3 = Reflector.getMetadata(PROPERTIES_METADATA_KEY, BaseTarget);
      expect(mapEntries(res2)).to.be.eql([
        ['prop1', MD1],
        ['prop2', MD2],
      ]);
      expect(mapEntries(res1)).to.be.eql(mapEntries(res3));
    });
  });

  describe('getMetadata', function () {
    it('should return an empty map if no metadata', function () {
      class Target {}
      const res = PropertyReflector.getMetadata(Target);
      expect(res).to.be.instanceof(Map);
      expect(res).to.be.empty;
    });

    it('should return a target metadata', function () {
      class Target {
        prop1?: string;
        prop2?: number;
      }
      PropertyReflector.setMetadata(MD1, Target, 'prop1');
      PropertyReflector.setMetadata(MD2, Target, 'prop2');
      const res = PropertyReflector.getMetadata(Target);
      expect(mapEntries(res)).to.be.eql([
        ['prop1', MD1],
        ['prop2', MD2],
      ]);
    });

    it('should return a parent metadata if a target have no metadata', function () {
      class BaseTarget {
        prop?: string;
      }
      class Target extends BaseTarget {}
      PropertyReflector.setMetadata(MD1, BaseTarget, 'prop');
      const res = PropertyReflector.getMetadata(Target);
      expect(mapEntries(res)).to.be.eql([['prop', MD1]]);
    });
  });
});
