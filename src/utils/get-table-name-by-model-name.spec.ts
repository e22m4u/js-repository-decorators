import {expect} from 'chai';
import {getTableNameByModelName} from './get-table-name-by-model-name.js';

describe('getTableNameByModelName', function () {
  it('should correctly pluralize and remove the "Model" suffix for standard names', function () {
    expect(getTableNameByModelName('UserModel')).to.equal('users');
    expect(getTableNameByModelName('ArticleModel')).to.equal('articles');
  });

  it('should just pluralize names that do not have the "Model" suffix', function () {
    expect(getTableNameByModelName('Product')).to.equal('products');
  });

  it('should correctly handle different pluralization rules (like y -> ies)', function () {
    expect(getTableNameByModelName('CompanyModel')).to.equal('companies');
  });

  it('should correctly handle exceptions from pluralize (like status -> statuses)', function () {
    expect(getTableNameByModelName('StatusModel')).to.equal('statuses');
  });

  it('should handle edge cases where removing "Model" leaves a short word', function () {
    expect(getTableNameByModelName('MyModel')).to.equal('myModels');
    expect(getTableNameByModelName('DoModel')).to.equal('doModels');
  });

  it('should remove the "Model" suffix case-insensitively', function () {
    expect(getTableNameByModelName('Usermodel')).to.equal('users');
    expect(getTableNameByModelName('USERMODEL')).to.equal('users');
  });

  it('should handle names that contain "Model" but not at the end', function () {
    expect(getTableNameByModelName('RemodelAction')).to.equal('remodelActions');
  });
});
