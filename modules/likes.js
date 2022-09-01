const tvId = 'MjgCDPvMKfBMbwFq4McF';

const fetchLikeApi = async () => {
  const getLikeResult = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`).then((res) => res.json());
  // console.log(getLikeResult)
  return getLikeResult;
}
fetchLikeApi()

const submitNewLike = async (id) => {
   const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
   });
  //  console.log(res, ' rttbtbwrthbr')
   //   const data = await res.text()
   //   return data;
  }

export { fetchLikeApi, submitNewLike }
