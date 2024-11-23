import {expect} from 'chai';
import {model} from './model-decorator.js';
import {ModelReflector} from './model-reflector.js';

describe('model', function () {
  it('does not require arguments', function () {
    @model()
    class Target {}
    const res = ModelReflector.getMetadata(Target);
    expect(res).to.be.eql({name: 'Target'});
  });

  it('sets given options to the target metadata', function () {
    @model({
      tableName: 'MyTable',
      datasource: 'myDatasource',
    })
    class Target {}
    const res = ModelReflector.getMetadata(Target);
    expect(res).to.be.eql({
      name: 'Target',
      tableName: 'MyTable',
      datasource: 'myDatasource',
    });
  });

  it('allows to override model name', function () {
    @model({
      name: 'MyModel',
      datasource: 'myDatasource',
    })
    class Target {}
    const res = ModelReflector.getMetadata(Target);
    expect(res).to.be.eql({
      name: 'MyModel',
      datasource: 'myDatasource',
    });
  });
});
