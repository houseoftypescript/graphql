import { API } from '..';

describe('environments', () => {
  describe('API', () => {
    it('should be localhost', () => {
      expect(API).toEqual('http://localhost:8080/api');
    });
  });
});
