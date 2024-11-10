import {expect} from 'chai';
import {DataType} from '@e22m4u/js-repository';
import {Reflector} from '@e22m4u/ts-reflector';
import {property} from './property-decorator.js';
import {PROPERTIES_METADATA_KEY} from './property-metadata.js';

describe('property', function () {
  it('sets a given metadata to property', function () {
    const md1 = {type: DataType.STRING};
    const md2 = {type: DataType.NUMBER};
    class Target {
      @property(md1)
      prop1?: string;
      @property(md2)
      prop2?: number;
    }
    const res = Reflector.getOwnMetadata(PROPERTIES_METADATA_KEY, Target);
    expect(res!.size).to.be.eq(2);
    expect(res!.get('prop1')).to.be.eq(md1);
    expect(res!.get('prop2')).to.be.eq(md2);
  });
});
