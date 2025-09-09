import {expect} from 'chai';
import {DataType} from '@e22m4u/js-repository';
import {Reflector} from '@e22m4u/ts-reflector';
import {property} from './property-decorator.js';
import {mapEntries} from '../../utils/map-entries.js';
import {PROPERTIES_METADATA_KEY} from './property-metadata.js';

const MD1 = {type: DataType.STRING};
const MD2 = {type: DataType.NUMBER};

describe('property', function () {
  it('should set a given metadata to a property', function () {
    class Target {
      @property(MD1)
      prop1?: string;
      @property(MD2)
      prop2?: number;
    }
    const res = Reflector.getMetadata(PROPERTIES_METADATA_KEY, Target);
    expect(mapEntries(res)).to.be.eql([
      ['prop1', MD1],
      ['prop2', MD2],
    ]);
  });

  it('should extend a target metadata that inherits from a parent class', function () {
    class BaseTarget {
      @property(MD1)
      prop1?: string;
    }
    class Target extends BaseTarget {
      @property(MD2)
      prop2?: number;
    }
    const res = Reflector.getMetadata(PROPERTIES_METADATA_KEY, Target);
    expect(mapEntries(res)).to.be.eql([
      ['prop1', MD1],
      ['prop2', MD2],
    ]);
  });

  it('should not affect a parent metadata', function () {
    class BaseTarget {
      @property(MD1)
      prop1?: string;
    }
    const res1 = Reflector.getMetadata(PROPERTIES_METADATA_KEY, BaseTarget);
    expect(mapEntries(res1)).to.be.eql([['prop1', MD1]]);
    class Target extends BaseTarget {
      @property(MD2)
      prop2?: number;
    }
    const res2 = Reflector.getMetadata(PROPERTIES_METADATA_KEY, BaseTarget);
    expect(mapEntries(res2)).to.be.eql([['prop1', MD1]]);
    const res3 = Reflector.getMetadata(PROPERTIES_METADATA_KEY, Target);
    expect(mapEntries(res3)).to.be.eql([
      ['prop1', MD1],
      ['prop2', MD2],
    ]);
  });
});
