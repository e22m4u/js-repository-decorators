import {expect} from 'chai';
import {mapEntries} from './map-entries.js';

describe('mapEntries', function () {
  it('should return an array of tuples for a non-empty Map', function () {
    const testMap = new Map<string, number>([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const expected = [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ];
    expect(mapEntries(testMap)).to.deep.equal(expected);
  });

  it('should return an empty array for an empty Map', function () {
    const testMap = new Map<string, number>();
    expect(mapEntries(testMap)).to.deep.equal([]);
  });

  it('should return undefined when undefined is passed', function () {
    expect(mapEntries(undefined)).to.be.undefined;
  });

  it('should correctly handle a Map containing various data types', function () {
    const testMap = new Map<unknown, unknown>([
      [1, 'one'],
      ['two', 2],
      [true, false],
    ]);
    const expected = [
      [1, 'one'],
      ['two', 2],
      [true, false],
    ];
    expect(mapEntries(testMap)).to.deep.equal(expected);
  });

  it('should return an array of tuples when a Map contains objects', function () {
    const obj1 = {id: 1};
    const obj2 = {id: 2};
    const testMap = new Map<string, object>([
      ['key1', obj1],
      ['key2', obj2],
    ]);
    const expected = [
      ['key1', obj1],
      ['key2', obj2],
    ];
    expect(mapEntries(testMap)).to.deep.equal(expected);
  });

  it('should correctly handle null values as keys or values', function () {
    const testMap = new Map<unknown, unknown>([
      [null, 'null_value'],
      ['key_with_null', null],
    ]);
    const expected = [
      [null, 'null_value'],
      ['key_with_null', null],
    ];
    expect(mapEntries(testMap)).to.deep.equal(expected);
  });

  it('should correctly handle undefined values as keys or values', function () {
    const testMap = new Map<unknown, unknown>([['undefined_key', undefined]]);
    const expected = [['undefined_key', undefined]];
    expect(mapEntries(testMap)).to.deep.equal(expected);
  });
});
