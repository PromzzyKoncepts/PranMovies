

const movieApi = async () => {
  const fetchResult = await fetch('https://api.tvmaze.com/shows');
  const ShowResult = await fetchResult.json();
  console.log(ShowResult.slice(0, 6));
  return ShowResult.slice(0, 12);
};
movieApi()

const movieList = async () => {
  const allMovies = await movieApi()
  allMovies.forEach((card) => {
    const CardContainer = document.querySelector('.card-container');
    let cardUL = document.createElement('ul');
    let cardLI = document.createElement('li');
    cardLI.className = 'movie-cards'
    cardLI.innerHTML = `<div>
                          <img src=${card.image.original} alt=${card.name}>
                        </div>
                        <a href="${card.officialSite}" class="movie-title">${card.name}</a>
                        <div class="movie-info">
                          <p>${card.weight}mb</p>
                          <i class="fa fa-heart" aria-hidden="true"></i>
                          <p>20 likes</p>
                        </div>
                        <button>Comments</button>`;


    cardUL.appendChild(cardLI);
    CardContainer.appendChild(cardUL);
    
  });
}


export { movieApi, movieList };