import {expect} from 'chai';
import {model} from './model-decorator.js';
import {ModelReflector} from './model-reflector.js';

const MD1 = {name: 'Target1', datasource: 'datasource1'};
const MD2 = {name: 'Target2', datasource: 'datasource2'};

describe('model', function () {
  it('should set the given "name" option to the class metadata', function () {
    @model({name: 'FooBar'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({name: 'FooBar'});
  });

  it('should set the given "base" option to the class metadata', function () {
    @model({base: 'BaseModel'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({name: 'MyModel', base: 'BaseModel'});
  });

  it('should set the given "datasource" option to the class metadata', function () {
    @model({datasource: 'myDatasource'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({name: 'MyModel', datasource: 'myDatasource'});
  });

  it('should set the given "tableName" option to the class metadata', function () {
    @model({tableName: 'myTable'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({name: 'MyModel', tableName: 'myTable'});
  });

  it('should override a target metadata that inherits from a parent class', function () {
    @model(MD1)
    class BaseTarget {}
    @model(MD2)
    class Target extends BaseTarget {}
    const res = ModelReflector.getMetadata(Target);
    expect(res).to.be.eql(MD2);
  });

  it('should not affect a parent metadata', function () {
    @model(MD1)
    class BaseTarget {}
    const res1 = ModelReflector.getMetadata(BaseTarget);
    expect(res1).to.be.eql(MD1);
    @model(MD2)
    class Target extends BaseTarget {}
    const res2 = ModelReflector.getMetadata(BaseTarget);
    expect(res2).to.be.eql(MD1);
    const res3 = ModelReflector.getMetadata(Target);
    expect(res3).to.be.eql(MD2);
  });
});
