import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {ModelReflector} from './model-reflector.js';
import {MODEL_METADATA_KEY} from './model-metadata.js';

const MD1 = {name: 'Target1', datasource: 'datasource1'};
const MD2 = {name: 'Target2', datasource: 'datasource2'};

describe('ModelReflector', function () {
  describe('setMetadata', function () {
    it('should set a given metadata to a target', function () {
      class Target {}
      ModelReflector.setMetadata(MD1, Target);
      const res = Reflector.getMetadata(MODEL_METADATA_KEY, Target);
      expect(res).to.be.eq(MD1);
    });

    it('should override existing metadata', function () {
      class Target {}
      ModelReflector.setMetadata(MD1, Target);
      const res1 = Reflector.getMetadata(MODEL_METADATA_KEY, Target);
      expect(res1).to.be.eq(MD1);
      ModelReflector.setMetadata(MD2, Target);
      const res2 = Reflector.getMetadata(MODEL_METADATA_KEY, Target);
      expect(res2).to.be.eq(MD2);
    });

    it('should override a target metadata that inherits from a parent class', function () {
      class BaseTarget {}
      class Target extends BaseTarget {}
      ModelReflector.setMetadata(MD1, BaseTarget);
      const res1 = Reflector.getMetadata(MODEL_METADATA_KEY, BaseTarget);
      expect(res1).to.be.eq(MD1);
      const res2 = Reflector.getMetadata(MODEL_METADATA_KEY, Target);
      expect(res2).to.be.eq(MD1);
      ModelReflector.setMetadata(MD2, Target);
      const res3 = Reflector.getMetadata(MODEL_METADATA_KEY, Target);
      expect(res3).to.be.eq(MD2);
    });

    it('should not affect a parent metadata', function () {
      class BaseTarget {}
      class Target extends BaseTarget {}
      ModelReflector.setMetadata(MD1, BaseTarget);
      const res1 = Reflector.getMetadata(MODEL_METADATA_KEY, BaseTarget);
      expect(res1).to.be.eq(MD1);
      ModelReflector.setMetadata(MD2, Target);
      const res2 = Reflector.getMetadata(MODEL_METADATA_KEY, Target);
      expect(res2).to.be.eq(MD2);
      expect(res1).to.be.eq(MD1);
    });
  });

  describe('getMetadata', function () {
    it('should return a target metadata', function () {
      class Target {}
      Reflector.defineMetadata(MODEL_METADATA_KEY, MD1, Target);
      const res = ModelReflector.getMetadata(Target);
      expect(res).to.be.eq(MD1);
    });

    it('should return undefined if no metadata', function () {
      class Target {}
      const res = ModelReflector.getMetadata(Target);
      expect(res).to.be.undefined;
    });

    it('should return a parent metadata if a target have no metadata', function () {
      class BaseTarget {}
      class Target extends BaseTarget {}
      Reflector.defineMetadata(MODEL_METADATA_KEY, MD1, BaseTarget);
      const res = ModelReflector.getMetadata(Target);
      expect(res).to.be.eq(MD1);
    });
  });
});
