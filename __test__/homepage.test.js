import {movieApi} from "../__mocks__/mocks.js";
// import { contCount } from '../modules/homepage.js';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()

const contCount = (arr) => {
  return arr.length
}
describe('returns the movie Count', () => {
  test('compares the length of the MovieApi and the movie count', async () => {
    const arr = await movieApi();
    expect(contCount(arr)).toBe(3)
  })
})