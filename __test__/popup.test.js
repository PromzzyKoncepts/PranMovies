import { getComments } from '../__mocks__/mocks.js';

const countComments = (len) => len.length;

test('number should return 3', async () => {
  const len = await getComments();
  expect(countComments(len)).toBe(3);
});