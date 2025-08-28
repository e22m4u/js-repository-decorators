import {expect} from 'chai';
import {model} from './model-decorator.js';
import {ModelReflector} from './model-reflector.js';

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
});
