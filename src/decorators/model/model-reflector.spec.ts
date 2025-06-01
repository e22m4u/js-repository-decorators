import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {ModelReflector} from './model-reflector.js';
import {MODEL_METADATA_KEY} from './model-metadata.js';

describe('ModelReflector', function () {
  describe('setMetadata', function () {
    it('sets a given value as target metadata', function () {
      class Target {}
      const md = {name: 'Target', datasource: 'myDatasource'};
      ModelReflector.setMetadata(md, Target);
      const res = Reflector.getOwnMetadata(MODEL_METADATA_KEY, Target);
      expect(res).to.be.eq(md);
    });

    it('overrides existing metadata', function () {
      class Target {}
      const md1 = {name: 'Target', datasource: 'datasource1'};
      const md2 = {name: 'Target', datasource: 'datasource2'};
      ModelReflector.setMetadata(md1, Target);
      const res1 = Reflector.getOwnMetadata(MODEL_METADATA_KEY, Target);
      expect(res1).to.be.eq(md1);
      ModelReflector.setMetadata(md2, Target);
      const res2 = Reflector.getOwnMetadata(MODEL_METADATA_KEY, Target);
      expect(res2).to.be.eq(md2);
    });
  });

  describe('getMetadata', function () {
    it('returns an existing metadata of the target', function () {
      class Target {}
      const md = {name: 'Target', datasource: 'myDatasource'};
      Reflector.defineMetadata(MODEL_METADATA_KEY, md, Target);
      const res = ModelReflector.getMetadata(Target);
      expect(res).to.be.eq(md);
    });

    it('returns undefined if no metadata', function () {
      class Target {}
      const res = ModelReflector.getMetadata(Target);
      expect(res).to.be.undefined;
    });
  });
});
