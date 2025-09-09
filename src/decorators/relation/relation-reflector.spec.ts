import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {RelationType} from '@e22m4u/js-repository';
import {mapEntries} from '../../utils/map-entries.js';
import {RelationDefinition} from '@e22m4u/js-repository';
import {RelationReflector} from './relation-reflector.js';
import {RELATIONS_METADATA_KEY} from './relation-metadata.js';

const MD1: RelationDefinition = {
  type: RelationType.BELONGS_TO,
  model: 'myModel',
};

const MD2: RelationDefinition = {
  type: RelationType.HAS_MANY,
  model: 'myModel',
  foreignKey: 'myKey',
};

describe('RelationReflector', function () {
  describe('setMetadata', function () {
    it('should add a property metadata to a target class', function () {
      class Target {
        rel1?: unknown;
        rel2?: unknown;
      }
      RelationReflector.setMetadata(MD1, Target, 'rel1');
      RelationReflector.setMetadata(MD2, Target, 'rel2');
      const res = Reflector.getMetadata(RELATIONS_METADATA_KEY, Target);
      expect(mapEntries(res)).to.be.eql([
        ['rel1', MD1],
        ['rel2', MD2],
      ]);
    });

    it('should extend a target metadata that inherits from a parent class', function () {
      class BaseTarget {
        rel1?: unknown;
      }
      class Target extends BaseTarget {
        rel2?: unknown;
      }
      RelationReflector.setMetadata(MD1, BaseTarget, 'rel1');
      RelationReflector.setMetadata(MD2, Target, 'rel2');
      const res = Reflector.getMetadata(RELATIONS_METADATA_KEY, Target);
      expect(mapEntries(res)).to.be.eql([
        ['rel1', MD1],
        ['rel2', MD2],
      ]);
    });

    it('should not affect a parent metadata', function () {
      class BaseTarget {
        rel1?: unknown;
      }
      class Target extends BaseTarget {
        rel2?: unknown;
      }
      RelationReflector.setMetadata(MD1, BaseTarget, 'rel1');
      const res1 = Reflector.getMetadata(RELATIONS_METADATA_KEY, BaseTarget);
      expect(mapEntries(res1)).to.be.eql([['rel1', MD1]]);
      RelationReflector.setMetadata(MD2, Target, 'rel2');
      const res2 = Reflector.getMetadata(RELATIONS_METADATA_KEY, Target);
      const res3 = Reflector.getMetadata(RELATIONS_METADATA_KEY, BaseTarget);
      expect(mapEntries(res2)).to.be.eql([
        ['rel1', MD1],
        ['rel2', MD2],
      ]);
      expect(mapEntries(res1)).to.be.eql(mapEntries(res3));
    });
  });

  describe('getMetadata', function () {
    it('should return an empty map if no metadata is set', function () {
      class Target {}
      const res = RelationReflector.getMetadata(Target);
      expect(res).to.be.instanceof(Map);
      expect(res).to.be.empty;
    });

    it('should return a target metadata', function () {
      class Target {
        rel1?: unknown;
        rel2?: unknown;
      }
      RelationReflector.setMetadata(MD1, Target, 'rel1');
      RelationReflector.setMetadata(MD2, Target, 'rel2');
      const res = RelationReflector.getMetadata(Target);
      expect(mapEntries(res)).to.be.eql([
        ['rel1', MD1],
        ['rel2', MD2],
      ]);
    });

    it('should return a parent metadata if a target have no metadata', function () {
      class BaseTarget {
        prop?: unknown;
      }
      class Target extends BaseTarget {}
      RelationReflector.setMetadata(MD1, BaseTarget, 'prop');
      const res = RelationReflector.getMetadata(Target);
      expect(mapEntries(res)).to.be.eql([['prop', MD1]]);
    });
  });
});
