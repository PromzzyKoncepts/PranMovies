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

    
    let livecount = +cardLikes?.likes;

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
                          <i class="fa fa-heart"  aria-hidden="true"></i>
                          <p class = "totalLikes">${livecount} likes</p>
                        </div>
                        <button id = ${id} class = "commentBtn">Comments</button>`;
    
    
    
    const likeButton = cardLI.getElementsByClassName('fa-heart')[0];
    likeButton.addEventListener('click', async () => {
      const liveCountElement = cardLI.getElementsByClassName('totalLikes')[0];
      livecount += 1;
      liveCountElement.innerHTML = `${livecount} likes`;
      submitNewLike(id);

      console.log('>>>>',livecount);
    })
 

    
    cardUL.appendChild(cardLI);
    CardContainer.appendChild(cardUL);
    
    const totalLikes = document.querySelectorAll('.totalLikes');
    totalLikes.forEach((like) => {
      if (like.innerText == 'undefined likes') {
        like.innerText = '0 like';
      }
      else if (like.innerText == '1 likes') {
        like.innerText = '1 like';
        
      }
    })

  });
};


export { movieApi, movieList };