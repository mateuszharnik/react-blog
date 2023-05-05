import { generatePath, getQuery, parseQuery } from './index';

describe('routerUtils', () => {
  describe('generatePath', () => {
    it('should return path with replaced params', () => {
      expect(generatePath('')).toStrictEqual('');
      expect(generatePath('/')).toStrictEqual('/');
      expect(generatePath('test')).toStrictEqual('test');
      expect(generatePath('/test')).toStrictEqual('/test');

      expect(generatePath('/:id')).toStrictEqual('/:id');
      expect(generatePath('/id', { params: { id: 123 } })).toStrictEqual('/id');
      expect(generatePath('/:id', { params: { test: 123 } })).toStrictEqual('/:id');
      expect(generatePath('/:id/', { params: { id: 123 } })).toStrictEqual('/123');
      expect(generatePath('/:id/test', { params: { id: 123 } })).toStrictEqual('/123/test');
      expect(generatePath('/:id/:test', { params: { id: 123, test: 'foo' } })).toStrictEqual('/123/foo');

      expect(generatePath('/:id', {
        query: { name: 'John' },
      })).toStrictEqual('/:id?name=John');
      expect(generatePath('/:id', {
        params: { id: 123 },
        query: { name: 'John', age: 23, array: [1, 2] },
      })).toStrictEqual('/123?age=23&array=1&array=2&name=John');
    });
  });

  describe('getQuery', () => {
    it('should return query object', () => {
      expect(getQuery('')).toMatchObject({});
      expect(getQuery('?test=1')).toMatchObject({ test: '1' });
      expect(getQuery('?a=1&b=test&c=1&c=2')).toMatchObject({ a: '1', b: 'test', c: ['1', '2'] });
    });
  });

  describe('parseQuery', () => {
    it('should return query string', () => {
      expect(parseQuery({})).toStrictEqual('');
      expect(parseQuery({ test: '1' })).toStrictEqual('?test=1');
      expect(parseQuery({ a: '1', b: 'test', c: ['1', '2'] })).toStrictEqual('?a=1&b=test&c=1&c=2');
    });
  });
});
