import {expect} from 'chai';
import {model} from './model-decorator.js';
import {ModelReflector} from './model-reflector.js';

describe('model', function () {
  it('should set the given "name" option to the class metadata', function () {
    @model({name: 'FooBar'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({name: 'FooBar', tableName: 'fooBars'});
  });

  it('should set the given "base" option to the class metadata', function () {
    @model({base: 'BaseModel'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({
      name: 'MyModel',
      base: 'BaseModel',
      tableName: 'myModels',
    });
  });

  it('should set the given "datasource" option to the class metadata', function () {
    @model({datasource: 'myDatasource'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({
      name: 'MyModel',
      datasource: 'myDatasource',
      tableName: 'myModels',
    });
  });

  it('should set the given "tableName" option to the class metadata', function () {
    @model({tableName: 'myTable'})
    class MyModel {}
    const res = ModelReflector.getMetadata(MyModel);
    expect(res).to.be.eql({name: 'MyModel', tableName: 'myTable'});
  });

  it('should set the "tableName" option by the class name in camel case', function () {
    @model()
    class FooBar {}
    const res = ModelReflector.getMetadata(FooBar);
    expect(res).to.be.eql({name: 'FooBar', tableName: 'fooBars'});
  });

  describe('the "Model" postfix in class name', function () {
    it('should set the "tableName" option by the "Model" class name in lower case', function () {
      @model()
      class Model {}
      const res = ModelReflector.getMetadata(Model);
      expect(res).to.be.eql({name: 'Model', tableName: 'models'});
    });

    it('should cut the "Model" postfix from the "tableName" option if it came from the class name', function () {
      @model()
      class TargetModel {}
      const res = ModelReflector.getMetadata(TargetModel);
      expect(res).to.be.eql({name: 'TargetModel', tableName: 'targets'});
    });

    it('should preserve the "Model" postfix in the given "tableName" option', function () {
      @model({tableName: 'customModel'})
      class Model {}
      const res = ModelReflector.getMetadata(Model);
      expect(res).to.be.eql({name: 'Model', tableName: 'customModel'});
    });
  });
});
