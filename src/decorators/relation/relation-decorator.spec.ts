import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {relation} from './relation-decorator.js';
import {RelationType} from '@e22m4u/js-repository';
import {mapEntries} from '../../utils/map-entries.js';
import {RelationDefinition} from '@e22m4u/js-repository';
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

describe('relation', function () {
  it('sets a given metadata to property', function () {
    const md1: RelationDefinition = {
      type: RelationType.BELONGS_TO,
      model: 'myModel',
    };
    const md2: RelationDefinition = {
      type: RelationType.HAS_MANY,
      model: 'myModel',
      foreignKey: 'myKey',
    };
    class Target {
      @relation(md1)
      rel1?: unknown;
      @relation(md2)
      rel2?: unknown;
    }
    const res = Reflector.getMetadata(RELATIONS_METADATA_KEY, Target);
    expect(mapEntries(res)).to.be.eql([
      ['rel1', md1],
      ['rel2', md2],
    ]);
  });

  it('should extend a target metadata that inherits from a parent class', function () {
    class BaseTarget {
      @relation(MD1)
      rel1?: unknown;
    }
    class Target extends BaseTarget {
      @relation(MD2)
      rel2?: unknown;
    }
    const res = Reflector.getMetadata(RELATIONS_METADATA_KEY, Target);
    expect(mapEntries(res)).to.be.eql([
      ['rel1', MD1],
      ['rel2', MD2],
    ]);
  });

  it('should not affect a parent metadata', function () {
    class BaseTarget {
      @relation(MD1)
      rel1?: unknown;
    }
    const res1 = Reflector.getMetadata(RELATIONS_METADATA_KEY, BaseTarget);
    expect(mapEntries(res1)).to.be.eql([['rel1', MD1]]);
    class Target extends BaseTarget {
      @relation(MD2)
      rel2?: unknown;
    }
    const res2 = Reflector.getMetadata(RELATIONS_METADATA_KEY, BaseTarget);
    expect(mapEntries(res2)).to.be.eql([['rel1', MD1]]);
    const res3 = Reflector.getMetadata(RELATIONS_METADATA_KEY, Target);
    expect(mapEntries(res3)).to.be.eql([
      ['rel1', MD1],
      ['rel2', MD2],
    ]);
  });
});
