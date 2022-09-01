import { fetchLikeApi, submitNewLike } from './likes.js'
const movieApi = async () => {
  const fetchResult = await fetch('https://api.tvmaze.com/shows');
  const ShowResult = await fetchResult.json();
  return ShowResult.slice(0, 12);
};
movieApi();

const movieList = async () => {
  const allMovies = await movieApi();
  const fetchLikes = await fetchLikeApi();

  const movieLength = document.querySelector(".movielength")
  movieLength.innerText = `(${allMovies.length})`;

  allMovies.forEach((card) => {

    let cardLikes = fetchLikes.find((like) => like.item_id === card.id);
    const id = card.id;


 

    const CardContainer = document.querySelector('.card-container');
    const cardUL = document.createElement('ul');
    const cardLI = document.createElement('li');
    cardLI.className = 'movie-cards';
    cardLI.innerHTML = '';
    cardLI.innerHTML = `<div>
                          <img src=${card.image.original} alt=${card.name}>
                        </div>
                        <a href="${card.officialSite}" class="movie-title">${card.name}</a>
                        <div class="movie-info">
                          <p>${card.weight}mb</p>
                          <i class="fa fa-heart" id = "${card.id}" aria-hidden="true"></i>
                          <p class = "totalLikes">${cardLikes?.likes} likes</p>
                        </div>
                        <button>Comments</button>`;
    
    let cardLikeNum = +cardLikes?.likes;
    const liveCount = (e) => {
      // let cardLikeNum = parseInt(cardLikeNum, 10)
      cardLikeNum++
       if (e.target.id === id) {
        const totalLikes = document.querySelector('.totalLikes')
        totalLikes.innerHTML = cardLikeNum
      }      
      const totalLikes = document.querySelector('.totalLikes')
      totalLikes.innerHTML = cardLikeNum
      console.log('>>>>', typeof (cardLikeNum));
    }
    
    
    // const likeButton = cardLI.getElementsByClassName('fa-heart')[0];
    const likeButton = document.querySelectorAll('.fa-heart');
    likeButton.forEach((like) => {
      like.addEventListener('click', (e) => {
        // movieList()
        submitNewLike(id);
        liveCount(e)
        // if (e.target.id === id) {
        //   const totalLikes = document.querySelector('.totalLikes')
        //   totalLikes.innerHTML = cardLikeNum
        // }      
      })
    })
 

    
    cardUL.appendChild(cardLI);
    CardContainer.appendChild(cardUL);
    
    const totalLikes = document.querySelectorAll('.totalLikes');
    totalLikes.forEach((like) => {
      if (like.innerText == 'undefined likes') {
        // const likesrd =  like.innerText.slice(10,15))
        like.innerText = '0 like';
      }
      else if (like.innerText == '1 likes') {
        like.innerText = '1 like';
        
      }
    })

  });
};


export { movieApi, movieList };