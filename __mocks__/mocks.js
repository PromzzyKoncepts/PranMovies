const movieApi = () => Promise.resolve([
  {
    title: 'Under the Doom',
    duration: 60,
    summary: 'lorem ipsum dolor sit',
  },
  {
    title: 'Inside the Doom',
    duration: 50,
    summary: 'lorem ipsum dolor sit',
  },
  {
    title: 'swallowed by the Doom',
    duration: 100,
    summary: 'lorem ipsum dolor sit',
  },
]);

const getComments = () => Promise.resolve([
  {
    id: 1,
    name: 'Anas',
    comment: 'lorem ipsum dolor sit',
  },
  {
    id: 2,
    name: 'Promise',
    comment: 'lorem ipsum dolor sit',
  },
  {
    id: 3,
    name: 'Nicholas',
    comment: 'lorem ipsum dolor sit',
  },
]);
export { movieApi, getComments };