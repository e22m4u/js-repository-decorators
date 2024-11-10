import {expect} from 'chai';
import {Reflector} from '@e22m4u/ts-reflector';
import {relation} from './relation-decorator.js';
import {RelationType} from '@e22m4u/js-repository';
import {RelationDefinition} from '@e22m4u/js-repository';
import {RELATIONS_METADATA_KEY} from './relation-metadata.js';

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
      prop1?: string;
      @relation(md2)
      prop2?: number;
    }
    const res = Reflector.getOwnMetadata(RELATIONS_METADATA_KEY, Target);
    expect(res!.size).to.be.eq(2);
    expect(res!.get('prop1')).to.be.eq(md1);
    expect(res!.get('prop2')).to.be.eq(md2);
  });
});
