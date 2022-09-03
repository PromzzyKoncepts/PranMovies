import { enableFetchMocks } from 'jest-fetch-mock';
import { movieApi } from '../__mocks__/mocks.js';

enableFetchMocks();

const contCount = (arr) => arr.length;
describe('returns the movie Count', () => {
  test('compares the length of the MovieApi and the movie count', async () => {
    const arr = await movieApi();
    expect(contCount(arr)).toBe(3);
  });
});