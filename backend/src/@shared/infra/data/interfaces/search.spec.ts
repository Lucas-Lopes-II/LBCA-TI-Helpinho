import { SearchParams, SearchResult } from '@shared/infra/data';

describe('Search unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const sut = new SearchParams();
      expect(sut.page).toEqual(1);
      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ];
      params.forEach((param) => {
        expect(new SearchParams({ page: param.page }).page).toBe(
          param.expected,
        );
      });
    });

    it('perPage prop', () => {
      const sut = new SearchParams();
      expect(sut.perPage).toEqual(10);
      const params = [
        { perPage: null as any, expected: 10 },
        { perPage: undefined as any, expected: 10 },
        { perPage: '' as any, expected: 10 },
        { perPage: 'test' as any, expected: 10 },
        { perPage: 0, expected: 10 },
        { perPage: -1, expected: 10 },
        { perPage: 5.5, expected: 10 },
        { perPage: true, expected: 10 },
        { perPage: false, expected: 10 },
        { perPage: {}, expected: 10 },
        { perPage: 1, expected: 1 },
        { perPage: 2, expected: 2 },
        { perPage: 25, expected: 25 },
      ];
      params.forEach((param) => {
        expect(new SearchParams({ perPage: param.perPage }).perPage).toBe(
          param.expected,
        );
      });
    });
  });

  describe('SearchResult tests', () => {
    it('constructor props', () => {
      let sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
      });
      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
      });
      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
      });
      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
      });
      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
      });
      expect(sut.lastPage).toBe(1);
      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
      });
      expect(sut.lastPage).toBe(6);
    });
  });
});
