/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./__mocks__/mocks.js":
/*!****************************!*\
  !*** ./__mocks__/mocks.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getComments": () => (/* binding */ getComments),
/* harmony export */   "movieApi": () => (/* binding */ movieApi)
/* harmony export */ });
const movieApi = () => Promise.resolve([
  {
    title: 'Under the Doom',
    duration: 60,
    summary: 'lorem ipsum dolor sit'
  },
  {
    title: 'Inside the Doom',
    duration: 50,
    summary: 'lorem ipsum dolor sit'
  },
  {
    title: 'swallowed by the Doom',
    duration: 100,
    summary: 'lorem ipsum dolor sit'
  }
])

const getComments = () => Promise.resolve([
    {
    id: 1,
    name: 'Anas',
    comment: 'lorem ipsum dolor sit'
  },
  {
    id: 2,
    name: 'Promise',
    comment: 'lorem ipsum dolor sit'
  },
  {
    id: 3,
    name: 'Nicholas',
    comment: 'lorem ipsum dolor sit'
  }
])


/***/ }),

/***/ "./modules/PopupApi.js":
/*!*****************************!*\
  !*** ./modules/PopupApi.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Involvemnt": () => (/* binding */ Involvemnt)
/* harmony export */ });
// eslint-disable-next-line import/prefer-default-export
class Involvemnt {
  static postApp = async () => {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charest=UTF-8',
      },
    });
    const data = await response.json();
    return data;
  }

  static postComments = async (id, name, com) => {
    await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments', {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: name,
        comment: com,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

    static getComments = async (id) => {
      const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments?item_id=${id}`).then((res) => res.json());
      return response;
    };
}


/***/ }),

/***/ "./modules/homepage.js":
/*!*****************************!*\
  !*** ./modules/homepage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contCount": () => (/* binding */ contCount),
/* harmony export */   "movieApi": () => (/* binding */ movieApi),
/* harmony export */   "movieList": () => (/* binding */ movieList)
/* harmony export */ });
/* harmony import */ var _likes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./likes.js */ "./modules/likes.js");


const movieApi = async () => {
  const fetchResult = await fetch('https://api.tvmaze.com/shows');
  const ShowResult = await fetchResult.json();
  return ShowResult.slice(0, 12);
};

window.onload = movieApi();

const contCount = ( arr ) => {
  return arr.length
}

const movieList = async () => {
  const allMovies = await movieApi();
  const fetchLikes = await (0,_likes_js__WEBPACK_IMPORTED_MODULE_0__.fetchLikeApi)();

  const movieLength = document.querySelector(".movielength")
  movieLength.innerText = `(${contCount(allMovies)})`;

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
    
    
    
    const likeButton = cardLI.querySelectorAll('.fa-heart');
    likeButton.forEach((likeBtn) => {
      likeBtn.addEventListener('click', (btn) => {
        const liveCountElement = cardLI.getElementsByClassName('totalLikes')[0];
        livecount += 1;
        liveCountElement.innerHTML = `${livecount} likes`;
        (0,_likes_js__WEBPACK_IMPORTED_MODULE_0__.submitNewLike)(id);
        btn.disabled = true
        likeBtn.style.color = 'red';
      },
      {once:true})

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




/***/ }),

/***/ "./modules/likes.js":
/*!**************************!*\
  !*** ./modules/likes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLikeApi": () => (/* binding */ fetchLikeApi),
/* harmony export */   "submitNewLike": () => (/* binding */ submitNewLike)
/* harmony export */ });
const tvId = 'MjgCDPvMKfBMbwFq4McF';

const fetchLikeApi = async () => {
  const getLikeResult = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${tvId}/likes`).then((res) => res.json());
  // console.log(getLikeResult)
  return getLikeResult;
}

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




/***/ }),

/***/ "./modules/popup.js":
/*!**************************!*\
  !*** ./modules/popup.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var _mocks_mocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__mocks__/mocks */ "./__mocks__/mocks.js");
/* harmony import */ var _PopupApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopupApi */ "./modules/PopupApi.js");



class Popup {
  static getInfos = async (id) => {
    const movieInfo = await fetch(`https://api.tvmaze.com/shows/${id}`).then((result) => result.json());
    return movieInfo;
  }


  static countComments = (len) => len.length

  static display = async (movieInfo, id, comList) => {
    const mi = await movieInfo;
    const arr = await comList;
    console.log(movieInfo);
    const popup = document.querySelector('.popup');
    popup.innerHTML = `  
      <div class="description">
        <div class="D-description">
          <img src="${mi.image.medium}" class = "image" alt="">

          <div class = "comments">
            <div class = "form" >
              <label for="fname">Name:</label><br>
              <input type="text" id="fname" name="fname" placeholder = "Enter your name"><br>
              <label for="comment">Comment:</label><br>
              <textarea name="comment" id="comment" cols="20" rows="4" placeholder = "Enter your comment"></textarea>
              <input id = ${id} class= "submit" type="submit" value="Submit">
            </div>
          </div>
        </div>

        <div class = "summary-tag">
          <h1>${mi.name}</h1>
          ${mi.summary}
        </div>

      </div>
      <ul class = "mInfo">
        <h1> TV SHOW INFO</h1>
        <li><a href="${mi.network.officialSite}">${mi.network.name}</a> (${mi.premiered} - ${mi.ended})</li>
        <li><b>Schedule</b>: ${mi.schedule.days[0]} at ${mi.schedule.time} (${mi.runtime}min)</li>
        <li><b>Status</b>: ${mi.status}</li>
        <li><b>Show Type:</b> ${mi.type}</li>
        <li><b>Genres</b>: ${mi.genres}</li>
        <li><b>Episodes Ordered</b> </li>
        <li><b>language:</b>: ${mi.language}</li>
        <li><b>Rating:</b>: ${mi.rating.average}</li>
        <div>
          <h3> All Comments (${this.countComments(arr)})</h3>
          <ul class ="D-comments">
          </ul>
        </div>
      </ul>`;
  }

  static displayCom = async (MoveInfo) => {
    const commentList = document.querySelector('.D-comments');
    console.log(commentList);
    commentList.innerHTML = '';
    const arr = await MoveInfo;
    arr.forEach((item) => {
      commentList.innerHTML += `<li>${item.username}: ${item.comment} - ${item.creation_date}</li>`;
    });
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Crete+Round&family=Inter:wght@400;500;600;700;800&family=Poppins&family=Roboto:wght@700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*, *::after, *::before {\r\n   box-sizing: border-box;\r\n  }\r\n\r\nbody {\r\n  background-color: #fff;\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n/* this is where i styled the scroll property for the body */\r\nbody::-webkit-scrollbar {\r\n  width: 1em;\r\n}\r\n\r\nbody::-webkit-scrollbar-track {\r\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\nbody::-webkit-scrollbar-thumb {\r\n  background-color: darkgrey;\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\nbody::-webkit-scrollbar-thumb:hover {\r\n  background-color: rgb(99, 99, 99);\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\nheader {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  background-color: brown;\r\n  padding: 0 20px;\r\n}\r\n\r\n@media screen and (min-width: 768px) {\r\n  .mobile {\r\n    display: none;\r\n  }\r\n}\r\n\r\nh1 {\r\n  color: wheat;\r\n}\r\n\r\nspan {\r\n  color: #000;\r\n}\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\n.nav-items a {\r\n  color: wheat;\r\n  text-decoration: none;\r\n  font-size: 1.2rem;\r\n  padding-right: 20px;\r\n}\r\n\r\n#search {\r\n  padding: 10px;\r\n  border-radius: 5px;\r\n  border: none;\r\n  box-shadow: 0 0 5px #0a0a0a;\r\n}\r\n\r\n#search:focus {\r\n  border: none;\r\n  outline: 1px solid #464646;\r\n  color: brown;\r\n}\r\n\r\nfooter {\r\n  background-color: wheat;\r\n  text-align: center;\r\n  padding: 15px 0;\r\n  position: relative;\r\n}\r\n\r\n.go-up a {\r\n  color: brown;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n/* stylings for the display items */\r\n.card-container {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  padding: 20px 0;\r\n  padding-right: 20px;\r\n\r\n  /* align-content: center; */\r\n  margin: auto;\r\n\r\n  /* padding: auto; */\r\n}\r\n\r\nh2 {\r\n  text-align: center;\r\n}\r\n\r\nimg {\r\n  width: 370px;\r\n  height: 500px;\r\n}\r\n\r\n.movie-cards {\r\n  /* text-align: center; */\r\n  background-color: beige;\r\n  padding: 10px;\r\n  border-radius: 5px;\r\n  margin: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.movie-cards:hover {\r\n  box-shadow: 0 0 4px #747474ab;\r\n}\r\n\r\n.movie-title {\r\n  text-align: center;\r\n  color: #464646;\r\n  font-weight: 700;\r\n  text-decoration: none;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n.movie-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\nbutton {\r\n  width: 100%;\r\n  padding: 15px;\r\n  background-color: beige;\r\n  border: 1px solid brown;\r\n  border-radius: 10px;\r\n  font-size: 1.2rem;\r\n  cursor: pointer;\r\n}\r\n\r\nbutton:hover {\r\n  background-color: wheat;\r\n}\r\n\r\nbutton:active {\r\n  background-color: brown;\r\n  color: #fff;\r\n}\r\n\r\n.fa {\r\n  cursor: pointer;\r\n}\r\n\r\n.fa:hover {\r\n  color: red;\r\n}\r\n\r\n/* For mobile screens */\r\n@media screen and (max-width: 768px) {\r\n  .mobile {\r\n    color: wheat;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-top: 10px;\r\n    margin-left: 30px;\r\n  }\r\n\r\n  .card-container {\r\n    display: block;\r\n    margin: auto;\r\n  }\r\n\r\n  .nav-items {\r\n    display: none;\r\n  }\r\n\r\n  img {\r\n    width: 300px;\r\n    height: 400px;\r\n  }\r\n}\r\n\r\n.description {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex: 2;\r\n  gap: 30px;\r\n}\r\n\r\n.comments {\r\n  display: flex;\r\n  gap: 25px;\r\n}\r\n\r\n.mInfo {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: #F7F7F7;\r\n}\r\n\r\n.D-description {\r\n  display: block;\r\n  gap: 20px;\r\n}\r\n\r\n#comment {\r\n  display: block;\r\n}\r\n\r\n.popup {\r\n  transition: 200ms ease-in-out;\r\n  position: fixed;\r\n  left: 50%;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%) scale(0);\r\n  width: 80%;\r\n  height: 99%;\r\n  padding: 2%;\r\n  display: flex;\r\n  background-color: white;\r\n  z-index: 10;\r\n}\r\n\r\n.summary-tag h1{\r\n  color: brown;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.summary-tag {\r\n  margin-right: 20px;\r\n  text-align: justify;\r\n}\r\n\r\n.image {\r\n  width: 250px;\r\n  height: 370px;\r\n}\r\n\r\n.popup.active {\r\n  transform: translate(-50%, -50%) scale(1);\r\n}\r\n\r\n.overlay {\r\n  transition: 200ms ease-in-out;\r\n  position: fixed;\r\n  opacity: 0;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: rgba(0, 0, 0, 0.6);\r\n  pointer-events: none;\r\n}\r\n\r\n.overlay.active {\r\n  opacity: 1;\r\n  pointer-events: all;\r\n}\r\n\r\n/* this is where i styled the scroll property for the comments */\r\n.D-comments {\r\n  overflow-y: scroll;\r\n  max-height: 170px;\r\n  margin: 0px; \r\n  transform: translateX(-40px);\r\n  cursor: grab;\r\n}\r\n.D-comments:active {\r\n  cursor: grabbing;\r\n}\r\n\r\n.D-comments::-webkit-scrollbar {\r\n  width: 1em;\r\n}\r\n\r\n.D-comments::-webkit-scrollbar-track {\r\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.D-comments::-webkit-scrollbar-thumb {\r\n  background-color: grey;\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\n.D-comments::-webkit-scrollbar-thumb:hover {\r\n  background-color: rgb(99, 99, 99);\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\n#comment {\r\n  outline: 0px;\r\n  width: 15rem;\r\n  padding: 10px;\r\n  border: 1px solid brown;\r\n  border-radius: 4px;\r\n\r\n}\r\n\r\n#fname {\r\n  outline: 0px;\r\n  width: 15rem;\r\n  padding: 10px;\r\n  border: 1px solid brown;\r\n  border-radius: 4px;\r\n}\r\n\r\nh3 {\r\n  margin-left: 33px;\r\n}\r\n\r\n.summary {\r\n  height: 200px;\r\n  overflow-x: scroll;\r\n}\r\n\r\n.submit {\r\n  width: 100%;\r\n  padding: 7px;\r\n  background-color: bisque;\r\n  border: 1px solid brown;\r\n  border-radius: 4px;\r\n  font-size: 1rem;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n}\r\n\r\n.submit {\r\n  width: 100%;\r\n  padding: 7px;\r\n  background-color: beige;\r\n  border: 1px solid brown;\r\n  border-radius: 5px;\r\n  font-size: 1rem;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n}\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.submit:hover {\r\n  background-color: bisque;\r\n}\r\n\r\n.submit:active {\r\n  background-color: brown;\r\n  color: #fff;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Crete+Round&family=Inter:wght@400;500;600;700;800&family=Poppins&family=Roboto:wght@700&display=swap');\r\n\r\n*, *::after, *::before {\r\n   box-sizing: border-box;\r\n  }\r\n\r\nbody {\r\n  background-color: #fff;\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n/* this is where i styled the scroll property for the body */\r\nbody::-webkit-scrollbar {\r\n  width: 1em;\r\n}\r\n\r\nbody::-webkit-scrollbar-track {\r\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\nbody::-webkit-scrollbar-thumb {\r\n  background-color: darkgrey;\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\nbody::-webkit-scrollbar-thumb:hover {\r\n  background-color: rgb(99, 99, 99);\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\nheader {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  background-color: brown;\r\n  padding: 0 20px;\r\n}\r\n\r\n@media screen and (min-width: 768px) {\r\n  .mobile {\r\n    display: none;\r\n  }\r\n}\r\n\r\nh1 {\r\n  color: wheat;\r\n}\r\n\r\nspan {\r\n  color: #000;\r\n}\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\n.nav-items a {\r\n  color: wheat;\r\n  text-decoration: none;\r\n  font-size: 1.2rem;\r\n  padding-right: 20px;\r\n}\r\n\r\n#search {\r\n  padding: 10px;\r\n  border-radius: 5px;\r\n  border: none;\r\n  box-shadow: 0 0 5px #0a0a0a;\r\n}\r\n\r\n#search:focus {\r\n  border: none;\r\n  outline: 1px solid #464646;\r\n  color: brown;\r\n}\r\n\r\nfooter {\r\n  background-color: wheat;\r\n  text-align: center;\r\n  padding: 15px 0;\r\n  position: relative;\r\n}\r\n\r\n.go-up a {\r\n  color: brown;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n/* stylings for the display items */\r\n.card-container {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  padding: 20px 0;\r\n  padding-right: 20px;\r\n\r\n  /* align-content: center; */\r\n  margin: auto;\r\n\r\n  /* padding: auto; */\r\n}\r\n\r\nh2 {\r\n  text-align: center;\r\n}\r\n\r\nimg {\r\n  width: 370px;\r\n  height: 500px;\r\n}\r\n\r\n.movie-cards {\r\n  /* text-align: center; */\r\n  background-color: beige;\r\n  padding: 10px;\r\n  border-radius: 5px;\r\n  margin: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.movie-cards:hover {\r\n  box-shadow: 0 0 4px #747474ab;\r\n}\r\n\r\n.movie-title {\r\n  text-align: center;\r\n  color: #464646;\r\n  font-weight: 700;\r\n  text-decoration: none;\r\n  font-size: 1.5rem;\r\n}\r\n\r\n.movie-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\nbutton {\r\n  width: 100%;\r\n  padding: 15px;\r\n  background-color: beige;\r\n  border: 1px solid brown;\r\n  border-radius: 10px;\r\n  font-size: 1.2rem;\r\n  cursor: pointer;\r\n}\r\n\r\nbutton:hover {\r\n  background-color: wheat;\r\n}\r\n\r\nbutton:active {\r\n  background-color: brown;\r\n  color: #fff;\r\n}\r\n\r\n.fa {\r\n  cursor: pointer;\r\n}\r\n\r\n.fa:hover {\r\n  color: red;\r\n}\r\n\r\n/* For mobile screens */\r\n@media screen and (max-width: 768px) {\r\n  .mobile {\r\n    color: wheat;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-top: 10px;\r\n    margin-left: 30px;\r\n  }\r\n\r\n  .card-container {\r\n    display: block;\r\n    margin: auto;\r\n  }\r\n\r\n  .nav-items {\r\n    display: none;\r\n  }\r\n\r\n  img {\r\n    width: 300px;\r\n    height: 400px;\r\n  }\r\n}\r\n\r\n.description {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex: 2;\r\n  gap: 30px;\r\n}\r\n\r\n.comments {\r\n  display: flex;\r\n  gap: 25px;\r\n}\r\n\r\n.mInfo {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: #F7F7F7;\r\n}\r\n\r\n.D-description {\r\n  display: block;\r\n  gap: 20px;\r\n}\r\n\r\n#comment {\r\n  display: block;\r\n}\r\n\r\n.popup {\r\n  transition: 200ms ease-in-out;\r\n  position: fixed;\r\n  left: 50%;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%) scale(0);\r\n  width: 80%;\r\n  height: 99%;\r\n  padding: 2%;\r\n  display: flex;\r\n  background-color: white;\r\n  z-index: 10;\r\n}\r\n\r\n.summary-tag h1{\r\n  color: brown;\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n.summary-tag {\r\n  margin-right: 20px;\r\n  text-align: justify;\r\n}\r\n\r\n.image {\r\n  width: 250px;\r\n  height: 370px;\r\n}\r\n\r\n.popup.active {\r\n  transform: translate(-50%, -50%) scale(1);\r\n}\r\n\r\n.overlay {\r\n  transition: 200ms ease-in-out;\r\n  position: fixed;\r\n  opacity: 0;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: rgba(0, 0, 0, 0.6);\r\n  pointer-events: none;\r\n}\r\n\r\n.overlay.active {\r\n  opacity: 1;\r\n  pointer-events: all;\r\n}\r\n\r\n/* this is where i styled the scroll property for the comments */\r\n.D-comments {\r\n  overflow-y: scroll;\r\n  max-height: 170px;\r\n  margin: 0px; \r\n  transform: translateX(-40px);\r\n  cursor: grab;\r\n}\r\n.D-comments:active {\r\n  cursor: grabbing;\r\n}\r\n\r\n.D-comments::-webkit-scrollbar {\r\n  width: 1em;\r\n}\r\n\r\n.D-comments::-webkit-scrollbar-track {\r\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.D-comments::-webkit-scrollbar-thumb {\r\n  background-color: grey;\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\n.D-comments::-webkit-scrollbar-thumb:hover {\r\n  background-color: rgb(99, 99, 99);\r\n  outline: 1px solid slategrey;\r\n  border-radius: 10px;\r\n}\r\n\r\n#comment {\r\n  outline: 0px;\r\n  width: 15rem;\r\n  padding: 10px;\r\n  border: 1px solid brown;\r\n  border-radius: 4px;\r\n\r\n}\r\n\r\n#fname {\r\n  outline: 0px;\r\n  width: 15rem;\r\n  padding: 10px;\r\n  border: 1px solid brown;\r\n  border-radius: 4px;\r\n}\r\n\r\nh3 {\r\n  margin-left: 33px;\r\n}\r\n\r\n.summary {\r\n  height: 200px;\r\n  overflow-x: scroll;\r\n}\r\n\r\n.submit {\r\n  width: 100%;\r\n  padding: 7px;\r\n  background-color: bisque;\r\n  border: 1px solid brown;\r\n  border-radius: 4px;\r\n  font-size: 1rem;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n}\r\n\r\n.submit {\r\n  width: 100%;\r\n  padding: 7px;\r\n  background-color: beige;\r\n  border: 1px solid brown;\r\n  border-radius: 5px;\r\n  font-size: 1rem;\r\n  cursor: pointer;\r\n  margin-top: 10px;\r\n}\r\na {\r\n  text-decoration: none;\r\n}\r\n\r\n.submit:hover {\r\n  background-color: bisque;\r\n}\r\n\r\n.submit:active {\r\n  background-color: brown;\r\n  color: #fff;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_homepage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/homepage.js */ "./modules/homepage.js");
/* harmony import */ var _modules_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/popup */ "./modules/popup.js");
/* harmony import */ var _modules_PopupApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/PopupApi */ "./modules/PopupApi.js");






document.addEventListener('DOMContentLoaded', () => {
  (0,_modules_homepage_js__WEBPACK_IMPORTED_MODULE_1__.movieList)();
});

document.addEventListener('click', async (e) => {
  if (!e.target.matches('.commentBtn')) {
    return;
  }
  const { id } = e.target;
  const comList = await _modules_PopupApi__WEBPACK_IMPORTED_MODULE_3__.Involvemnt.getComments(id);
  const MoveInfo = await _modules_popup__WEBPACK_IMPORTED_MODULE_2__["default"].getInfos(id);
  await _modules_popup__WEBPACK_IMPORTED_MODULE_2__["default"].display(MoveInfo, id, comList);
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.classList.add('active');
  overlay.classList.add('active');
  _modules_popup__WEBPACK_IMPORTED_MODULE_2__["default"].displayCom(comList);
});

document.querySelector('.overlay').addEventListener('click', () => {
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.classList.remove('active');
  overlay.classList.remove('active');
});

document.addEventListener('click', async (e) => {
  if (!e.target.matches('.submit')) {
    return;
  }
  e.preventDefault()
  const name = document.getElementById('fname').value;
  const com = document.getElementById('comment').value;
  const { id } = e.target;
  await _modules_PopupApi__WEBPACK_IMPORTED_MODULE_3__.Involvemnt.postComments(id, name, com);
  const comList = await _modules_PopupApi__WEBPACK_IMPORTED_MODULE_3__.Involvemnt.getComments(id);
  _modules_popup__WEBPACK_IMPORTED_MODULE_2__["default"].displayCom(comList);
});

// DOM LOAD
// const MoveInfo = Popup.getInfos(3);
// Popup.display(MoveInfo);
// document.addEventListener('DOMContentLoaded', async () => {
//   const id = 3;
//   const comList = await Involvemnt.getComments(id);
//   console.log(comList);
//   Popup.displayCom(comList);
// });

// // toggle and hide Popup
// const overlay = document.querySelector('.overlay');
// const togleBtn = document.querySelector('.togleBtn');
// togleBtn.addEventListener('click', () => {
//   const popup = document.querySelector('.popup');
//   popup.classList.add('active');
//   overlay.classList.add('active');
// });

// overlay.addEventListener('click', () => {
//   const popup = document.querySelector('.popup');
//   popup.classList.remove('active');
//   overlay.classList.remove('active');
// });

// document.addEventListener('click', async (e) => {
//   if (!e.target.matches('.submit')) {
//     return;
//   }
//   console.log(e.target);
//   e.preventDefault();
//   const name = document.getElementById('fname').value;
//   const com = document.getElementById('comment').value;
//   const id = 3;
//   await Involvemnt.postComments(id, name, com);
//   console.log(comList);
//   const comList = await Involvemnt.getComments(id);
//   Popup.displayCom(comList);
// });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsMkNBQTJDO0FBQzNDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0pBQW9KLEdBQUc7QUFDdko7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQndEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1REFBWTtBQUN2QztBQUNBO0FBQ0EsOEJBQThCLHFCQUFxQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUJBQXFCLE1BQU0sVUFBVTtBQUMxRTtBQUNBLG1DQUFtQyxrQkFBa0Isd0JBQXdCLFVBQVU7QUFDdkY7QUFDQSwrQkFBK0IsWUFBWTtBQUMzQztBQUNBLG9EQUFvRCxXQUFXO0FBQy9EO0FBQ0EsdUNBQXVDLElBQUk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25ELFFBQVEsd0RBQWE7QUFDckI7QUFDQTtBQUNBLE9BQU87QUFDUCxPQUFPLFVBQVU7QUFDakI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQSwrR0FBK0csS0FBSztBQUNwSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0dBQXNHLEtBQUs7QUFDM0c7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qlc7QUFDVjtBQUN2QztBQUNlO0FBQ2Y7QUFDQSxrRUFBa0UsR0FBRztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdCQUFnQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixJQUFJO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0IsSUFBSSxnQkFBZ0IsUUFBUSxjQUFjLElBQUksU0FBUztBQUN0RywrQkFBK0IscUJBQXFCLEtBQUssa0JBQWtCLEdBQUcsV0FBVztBQUN6Riw2QkFBNkIsVUFBVTtBQUN2QyxnQ0FBZ0MsUUFBUTtBQUN4Qyw2QkFBNkIsVUFBVTtBQUN2QztBQUNBLGdDQUFnQyxZQUFZO0FBQzVDLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQSwrQkFBK0Isd0JBQXdCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxjQUFjLElBQUksY0FBYyxJQUFJLG1CQUFtQjtBQUM3RixLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YsaUlBQWlJLElBQUksSUFBSSxJQUFJLHdEQUF3RDtBQUNyTTtBQUNBLGtFQUFrRSw4QkFBOEIsT0FBTyxjQUFjLDZCQUE2QixnQkFBZ0IsaUJBQWlCLHlDQUF5QyxLQUFLLGtHQUFrRyxpQkFBaUIsS0FBSyx1Q0FBdUMsMkRBQTJELEtBQUssdUNBQXVDLGlDQUFpQyxtQ0FBbUMsMEJBQTBCLEtBQUssNkNBQTZDLHdDQUF3QyxtQ0FBbUMsMEJBQTBCLEtBQUssZ0JBQWdCLG9CQUFvQiwwQkFBMEIscUNBQXFDLDhCQUE4QixzQkFBc0IsS0FBSyw4Q0FBOEMsZUFBZSxzQkFBc0IsT0FBTyxLQUFLLFlBQVksbUJBQW1CLEtBQUssY0FBYyxrQkFBa0IsS0FBSyxZQUFZLHVCQUF1QixLQUFLLHNCQUFzQixtQkFBbUIsNEJBQTRCLHdCQUF3QiwwQkFBMEIsS0FBSyxpQkFBaUIsb0JBQW9CLHlCQUF5QixtQkFBbUIsa0NBQWtDLEtBQUssdUJBQXVCLG1CQUFtQixpQ0FBaUMsbUJBQW1CLEtBQUssZ0JBQWdCLDhCQUE4Qix5QkFBeUIsc0JBQXNCLHlCQUF5QixLQUFLLGtCQUFrQixtQkFBbUIsd0JBQXdCLEtBQUssaUVBQWlFLG9CQUFvQiw0Q0FBNEMsc0JBQXNCLDBCQUEwQixvQ0FBb0MscUJBQXFCLDRCQUE0QixPQUFPLFlBQVkseUJBQXlCLEtBQUssYUFBYSxtQkFBbUIsb0JBQW9CLEtBQUssc0JBQXNCLDZCQUE2QixnQ0FBZ0Msb0JBQW9CLHlCQUF5QixnQkFBZ0Isb0JBQW9CLDZCQUE2QiwwQkFBMEIsS0FBSyw0QkFBNEIsb0NBQW9DLEtBQUssc0JBQXNCLHlCQUF5QixxQkFBcUIsdUJBQXVCLDRCQUE0Qix3QkFBd0IsS0FBSyxxQkFBcUIsb0JBQW9CLDBCQUEwQixnQkFBZ0IsS0FBSyxnQkFBZ0Isa0JBQWtCLG9CQUFvQiw4QkFBOEIsOEJBQThCLDBCQUEwQix3QkFBd0Isc0JBQXNCLEtBQUssc0JBQXNCLDhCQUE4QixLQUFLLHVCQUF1Qiw4QkFBOEIsa0JBQWtCLEtBQUssYUFBYSxzQkFBc0IsS0FBSyxtQkFBbUIsaUJBQWlCLEtBQUssMEVBQTBFLGVBQWUscUJBQXFCLHNCQUFzQix1Q0FBdUMsNEJBQTRCLHlCQUF5QiwwQkFBMEIsT0FBTywyQkFBMkIsdUJBQXVCLHFCQUFxQixPQUFPLHNCQUFzQixzQkFBc0IsT0FBTyxlQUFlLHFCQUFxQixzQkFBc0IsT0FBTyxLQUFLLHNCQUFzQixvQkFBb0IsMEJBQTBCLGNBQWMsZ0JBQWdCLEtBQUssbUJBQW1CLG9CQUFvQixnQkFBZ0IsS0FBSyxnQkFBZ0IsY0FBYyxvQkFBb0IsNkJBQTZCLGdDQUFnQyxLQUFLLHdCQUF3QixxQkFBcUIsZ0JBQWdCLEtBQUssa0JBQWtCLHFCQUFxQixLQUFLLGdCQUFnQixvQ0FBb0Msc0JBQXNCLGdCQUFnQixlQUFlLGdEQUFnRCxpQkFBaUIsa0JBQWtCLGtCQUFrQixvQkFBb0IsOEJBQThCLGtCQUFrQixLQUFLLHdCQUF3QixtQkFBbUIsaUJBQWlCLGdCQUFnQixLQUFLLHNCQUFzQix5QkFBeUIsMEJBQTBCLEtBQUssZ0JBQWdCLG1CQUFtQixvQkFBb0IsS0FBSyx1QkFBdUIsZ0RBQWdELEtBQUssa0JBQWtCLG9DQUFvQyxzQkFBc0IsaUJBQWlCLGNBQWMsYUFBYSxlQUFlLGdCQUFnQiwyQ0FBMkMsMkJBQTJCLEtBQUsseUJBQXlCLGlCQUFpQiwwQkFBMEIsS0FBSywwRkFBMEYseUJBQXlCLHdCQUF3QixtQkFBbUIsbUNBQW1DLG1CQUFtQixLQUFLLHdCQUF3Qix1QkFBdUIsS0FBSyx3Q0FBd0MsaUJBQWlCLEtBQUssOENBQThDLDJEQUEyRCxLQUFLLDhDQUE4Qyw2QkFBNkIsbUNBQW1DLDBCQUEwQixLQUFLLG9EQUFvRCx3Q0FBd0MsbUNBQW1DLDBCQUEwQixLQUFLLGtCQUFrQixtQkFBbUIsbUJBQW1CLG9CQUFvQiw4QkFBOEIseUJBQXlCLFNBQVMsZ0JBQWdCLG1CQUFtQixtQkFBbUIsb0JBQW9CLDhCQUE4Qix5QkFBeUIsS0FBSyxZQUFZLHdCQUF3QixLQUFLLGtCQUFrQixvQkFBb0IseUJBQXlCLEtBQUssaUJBQWlCLGtCQUFrQixtQkFBbUIsK0JBQStCLDhCQUE4Qix5QkFBeUIsc0JBQXNCLHNCQUFzQix1QkFBdUIsS0FBSyxpQkFBaUIsa0JBQWtCLG1CQUFtQiw4QkFBOEIsOEJBQThCLHlCQUF5QixzQkFBc0Isc0JBQXNCLHVCQUF1QixLQUFLLE9BQU8sNEJBQTRCLEtBQUssdUJBQXVCLCtCQUErQixLQUFLLHdCQUF3Qiw4QkFBOEIsa0JBQWtCLEtBQUssT0FBTyxnRkFBZ0YsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssS0FBSyxVQUFVLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsYUFBYSxhQUFhLFlBQVksWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksY0FBYyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVks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VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNyQjtBQUNtRDtBQUNkO0FBQ1k7QUFDakQ7QUFDQTtBQUNBLEVBQUUsK0RBQVM7QUFDWCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsS0FBSztBQUNmLHdCQUF3QixxRUFBc0I7QUFDOUMseUJBQXlCLCtEQUFjO0FBQ3ZDLFFBQVEsOERBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGlFQUFnQjtBQUNsQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLEtBQUs7QUFDZixRQUFRLHNFQUF1QjtBQUMvQix3QkFBd0IscUVBQXNCO0FBQzlDLEVBQUUsaUVBQWdCO0FBQ2xCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYWJhbmJvYXJkLy4vX19tb2Nrc19fL21vY2tzLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9tb2R1bGVzL1BvcHVwQXBpLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9tb2R1bGVzL2hvbWVwYWdlLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9tb2R1bGVzL2xpa2VzLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9tb2R1bGVzL3BvcHVwLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9rYWJhbmJvYXJkLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8va2FiYW5ib2FyZC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8va2FiYW5ib2FyZC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9rYWJhbmJvYXJkLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2thYmFuYm9hcmQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9rYWJhbmJvYXJkLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8va2FiYW5ib2FyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYWJhbmJvYXJkL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2thYmFuYm9hcmQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2thYmFuYm9hcmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYWJhbmJvYXJkL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FiYW5ib2FyZC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8va2FiYW5ib2FyZC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb3ZpZUFwaSA9ICgpID0+IFByb21pc2UucmVzb2x2ZShbXHJcbiAge1xyXG4gICAgdGl0bGU6ICdVbmRlciB0aGUgRG9vbScsXHJcbiAgICBkdXJhdGlvbjogNjAsXHJcbiAgICBzdW1tYXJ5OiAnbG9yZW0gaXBzdW0gZG9sb3Igc2l0J1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGl0bGU6ICdJbnNpZGUgdGhlIERvb20nLFxyXG4gICAgZHVyYXRpb246IDUwLFxyXG4gICAgc3VtbWFyeTogJ2xvcmVtIGlwc3VtIGRvbG9yIHNpdCdcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiAnc3dhbGxvd2VkIGJ5IHRoZSBEb29tJyxcclxuICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICBzdW1tYXJ5OiAnbG9yZW0gaXBzdW0gZG9sb3Igc2l0J1xyXG4gIH1cclxuXSlcclxuXHJcbmNvbnN0IGdldENvbW1lbnRzID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKFtcclxuICAgIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ0FuYXMnLFxyXG4gICAgY29tbWVudDogJ2xvcmVtIGlwc3VtIGRvbG9yIHNpdCdcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ1Byb21pc2UnLFxyXG4gICAgY29tbWVudDogJ2xvcmVtIGlwc3VtIGRvbG9yIHNpdCdcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAzLFxyXG4gICAgbmFtZTogJ05pY2hvbGFzJyxcclxuICAgIGNvbW1lbnQ6ICdsb3JlbSBpcHN1bSBkb2xvciBzaXQnXHJcbiAgfVxyXG5dKVxyXG5leHBvcnQge21vdmllQXBpLCBnZXRDb21tZW50c30iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydFxyXG5leHBvcnQgY2xhc3MgSW52b2x2ZW1udCB7XHJcbiAgc3RhdGljIHBvc3RBcHAgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy8nLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyZXN0PVVURi04JyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBvc3RDb21tZW50cyA9IGFzeW5jIChpZCwgbmFtZSwgY29tKSA9PiB7XHJcbiAgICBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvNHZhNmM0b3VabXB6U0VUc0FOVjMvY29tbWVudHMnLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgaXRlbV9pZDogaWQsXHJcbiAgICAgICAgdXNlcm5hbWU6IG5hbWUsXHJcbiAgICAgICAgY29tbWVudDogY29tLFxyXG4gICAgICB9KSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAgIHN0YXRpYyBnZXRDb21tZW50cyA9IGFzeW5jIChpZCkgPT4ge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy80dmE2YzRvdVptcHpTRVRzQU5WMy9jb21tZW50cz9pdGVtX2lkPSR7aWR9YCkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBmZXRjaExpa2VBcGksIHN1Ym1pdE5ld0xpa2UgfSBmcm9tICcuL2xpa2VzLmpzJ1xyXG5cclxuY29uc3QgbW92aWVBcGkgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgZmV0Y2hSZXN1bHQgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cycpO1xyXG4gIGNvbnN0IFNob3dSZXN1bHQgPSBhd2FpdCBmZXRjaFJlc3VsdC5qc29uKCk7XHJcbiAgcmV0dXJuIFNob3dSZXN1bHQuc2xpY2UoMCwgMTIpO1xyXG59O1xyXG5cclxud2luZG93Lm9ubG9hZCA9IG1vdmllQXBpKCk7XHJcblxyXG5leHBvcnQgY29uc3QgY29udENvdW50ID0gKCBhcnIgKSA9PiB7XHJcbiAgcmV0dXJuIGFyci5sZW5ndGhcclxufVxyXG5cclxuY29uc3QgbW92aWVMaXN0ID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGFsbE1vdmllcyA9IGF3YWl0IG1vdmllQXBpKCk7XHJcbiAgY29uc3QgZmV0Y2hMaWtlcyA9IGF3YWl0IGZldGNoTGlrZUFwaSgpO1xyXG5cclxuICBjb25zdCBtb3ZpZUxlbmd0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW92aWVsZW5ndGhcIilcclxuICBtb3ZpZUxlbmd0aC5pbm5lclRleHQgPSBgKCR7Y29udENvdW50KGFsbE1vdmllcyl9KWA7XHJcblxyXG4gIGFsbE1vdmllcy5mb3JFYWNoKChjYXJkKSA9PiB7XHJcblxyXG4gICAgbGV0IGNhcmRMaWtlcyA9IGZldGNoTGlrZXMuZmluZCgobGlrZSkgPT4gbGlrZS5pdGVtX2lkID09PSBjYXJkLmlkKTtcclxuICAgIGNvbnN0IGlkID0gY2FyZC5pZDtcclxuXHJcbiAgICBcclxuICAgIGxldCBsaXZlY291bnQgPSArY2FyZExpa2VzPy5saWtlcztcclxuXHJcbiAgICBjb25zdCBDYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjYXJkVUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgY29uc3QgY2FyZExJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGNhcmRMSS5jbGFzc05hbWUgPSAnbW92aWUtY2FyZHMnO1xyXG4gICAgY2FyZExJLmlubmVySFRNTCA9ICcnO1xyXG4gICAgY2FyZExJLmlubmVySFRNTCA9IGA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPSR7Y2FyZC5pbWFnZS5vcmlnaW5hbH0gYWx0PSR7Y2FyZC5uYW1lfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2NhcmQub2ZmaWNpYWxTaXRlfVwiIGNsYXNzPVwibW92aWUtdGl0bGVcIj4ke2NhcmQubmFtZX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb3ZpZS1pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtjYXJkLndlaWdodH1tYjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWhlYXJ0XCIgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcyA9IFwidG90YWxMaWtlc1wiPiR7bGl2ZWNvdW50fSBsaWtlczwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQgPSAke2lkfSBjbGFzcyA9IFwiY29tbWVudEJ0blwiPkNvbW1lbnRzPC9idXR0b24+YDtcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIGNvbnN0IGxpa2VCdXR0b24gPSBjYXJkTEkucXVlcnlTZWxlY3RvckFsbCgnLmZhLWhlYXJ0Jyk7XHJcbiAgICBsaWtlQnV0dG9uLmZvckVhY2goKGxpa2VCdG4pID0+IHtcclxuICAgICAgbGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChidG4pID0+IHtcclxuICAgICAgICBjb25zdCBsaXZlQ291bnRFbGVtZW50ID0gY2FyZExJLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RvdGFsTGlrZXMnKVswXTtcclxuICAgICAgICBsaXZlY291bnQgKz0gMTtcclxuICAgICAgICBsaXZlQ291bnRFbGVtZW50LmlubmVySFRNTCA9IGAke2xpdmVjb3VudH0gbGlrZXNgO1xyXG4gICAgICAgIHN1Ym1pdE5ld0xpa2UoaWQpO1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWVcclxuICAgICAgICBsaWtlQnRuLnN0eWxlLmNvbG9yID0gJ3JlZCc7XHJcbiAgICAgIH0sXHJcbiAgICAgIHtvbmNlOnRydWV9KVxyXG5cclxuICAgIH0pXHJcbiBcclxuXHJcbiAgICBcclxuICAgIGNhcmRVTC5hcHBlbmRDaGlsZChjYXJkTEkpO1xyXG4gICAgQ2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkVUwpO1xyXG4gICAgXHJcbiAgICBjb25zdCB0b3RhbExpa2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvdGFsTGlrZXMnKTtcclxuICAgIHRvdGFsTGlrZXMuZm9yRWFjaCgobGlrZSkgPT4ge1xyXG4gICAgICBpZiAobGlrZS5pbm5lclRleHQgPT0gJ3VuZGVmaW5lZCBsaWtlcycpIHtcclxuICAgICAgICBsaWtlLmlubmVyVGV4dCA9ICcwIGxpa2UnO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGxpa2UuaW5uZXJUZXh0ID09ICcxIGxpa2VzJykge1xyXG4gICAgICAgIGxpa2UuaW5uZXJUZXh0ID0gJzEgbGlrZSc7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7IG1vdmllQXBpLCBtb3ZpZUxpc3QgfTsiLCJjb25zdCB0dklkID0gJ01qZ0NEUHZNS2ZCTWJ3RnE0TWNGJztcclxuXHJcbmNvbnN0IGZldGNoTGlrZUFwaSA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBnZXRMaWtlUmVzdWx0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyR7dHZJZH0vbGlrZXNgKS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xyXG4gIC8vIGNvbnNvbGUubG9nKGdldExpa2VSZXN1bHQpXHJcbiAgcmV0dXJuIGdldExpa2VSZXN1bHQ7XHJcbn1cclxuXHJcbmNvbnN0IHN1Ym1pdE5ld0xpa2UgPSBhc3luYyAoaWQpID0+IHtcclxuICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyR7dHZJZH0vbGlrZXNgLCB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgaXRlbV9pZDogaWQsXHJcbiAgICB9KSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcclxuICAgIH0sXHJcbiAgIH0pO1xyXG4gIC8vICBjb25zb2xlLmxvZyhyZXMsICcgcnR0YnRid3J0aGJyJylcclxuICAgLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLnRleHQoKVxyXG4gICAvLyAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbmV4cG9ydCB7IGZldGNoTGlrZUFwaSwgc3VibWl0TmV3TGlrZSB9XHJcbiIsImltcG9ydCB7IGdldENvbW1lbnRzIH0gZnJvbSAnLi4vX19tb2Nrc19fL21vY2tzJztcclxuaW1wb3J0IHsgSW52b2x2ZW1udCB9IGZyb20gJy4vUG9wdXBBcGknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgc3RhdGljIGdldEluZm9zID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgICBjb25zdCBtb3ZpZUluZm8gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cy8ke2lkfWApLnRoZW4oKHJlc3VsdCkgPT4gcmVzdWx0Lmpzb24oKSk7XHJcbiAgICByZXR1cm4gbW92aWVJbmZvO1xyXG4gIH1cclxuXHJcblxyXG4gIHN0YXRpYyBjb3VudENvbW1lbnRzID0gKGxlbikgPT4gbGVuLmxlbmd0aFxyXG5cclxuICBzdGF0aWMgZGlzcGxheSA9IGFzeW5jIChtb3ZpZUluZm8sIGlkLCBjb21MaXN0KSA9PiB7XHJcbiAgICBjb25zdCBtaSA9IGF3YWl0IG1vdmllSW5mbztcclxuICAgIGNvbnN0IGFyciA9IGF3YWl0IGNvbUxpc3Q7XHJcbiAgICBjb25zb2xlLmxvZyhtb3ZpZUluZm8pO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcclxuICAgIHBvcHVwLmlubmVySFRNTCA9IGAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiRC1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgPGltZyBzcmM9XCIke21pLmltYWdlLm1lZGl1bX1cIiBjbGFzcyA9IFwiaW1hZ2VcIiBhbHQ9XCJcIj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJjb21tZW50c1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJmb3JtXCIgPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmbmFtZVwiPk5hbWU6PC9sYWJlbD48YnI+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmbmFtZVwiIG5hbWU9XCJmbmFtZVwiIHBsYWNlaG9sZGVyID0gXCJFbnRlciB5b3VyIG5hbWVcIj48YnI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbW1lbnRcIj5Db21tZW50OjwvbGFiZWw+PGJyPlxyXG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiY29tbWVudFwiIGlkPVwiY29tbWVudFwiIGNvbHM9XCIyMFwiIHJvd3M9XCI0XCIgcGxhY2Vob2xkZXIgPSBcIkVudGVyIHlvdXIgY29tbWVudFwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgPGlucHV0IGlkID0gJHtpZH0gY2xhc3M9IFwic3VibWl0XCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcInN1bW1hcnktdGFnXCI+XHJcbiAgICAgICAgICA8aDE+JHttaS5uYW1lfTwvaDE+XHJcbiAgICAgICAgICAke21pLnN1bW1hcnl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHVsIGNsYXNzID0gXCJtSW5mb1wiPlxyXG4gICAgICAgIDxoMT4gVFYgU0hPVyBJTkZPPC9oMT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cIiR7bWkubmV0d29yay5vZmZpY2lhbFNpdGV9XCI+JHttaS5uZXR3b3JrLm5hbWV9PC9hPiAoJHttaS5wcmVtaWVyZWR9IC0gJHttaS5lbmRlZH0pPC9saT5cclxuICAgICAgICA8bGk+PGI+U2NoZWR1bGU8L2I+OiAke21pLnNjaGVkdWxlLmRheXNbMF19IGF0ICR7bWkuc2NoZWR1bGUudGltZX0gKCR7bWkucnVudGltZX1taW4pPC9saT5cclxuICAgICAgICA8bGk+PGI+U3RhdHVzPC9iPjogJHttaS5zdGF0dXN9PC9saT5cclxuICAgICAgICA8bGk+PGI+U2hvdyBUeXBlOjwvYj4gJHttaS50eXBlfTwvbGk+XHJcbiAgICAgICAgPGxpPjxiPkdlbnJlczwvYj46ICR7bWkuZ2VucmVzfTwvbGk+XHJcbiAgICAgICAgPGxpPjxiPkVwaXNvZGVzIE9yZGVyZWQ8L2I+IDwvbGk+XHJcbiAgICAgICAgPGxpPjxiPmxhbmd1YWdlOjwvYj46ICR7bWkubGFuZ3VhZ2V9PC9saT5cclxuICAgICAgICA8bGk+PGI+UmF0aW5nOjwvYj46ICR7bWkucmF0aW5nLmF2ZXJhZ2V9PC9saT5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGgzPiBBbGwgQ29tbWVudHMgKCR7dGhpcy5jb3VudENvbW1lbnRzKGFycil9KTwvaDM+XHJcbiAgICAgICAgICA8dWwgY2xhc3MgPVwiRC1jb21tZW50c1wiPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC91bD5gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRpc3BsYXlDb20gPSBhc3luYyAoTW92ZUluZm8pID0+IHtcclxuICAgIGNvbnN0IGNvbW1lbnRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkQtY29tbWVudHMnKTtcclxuICAgIGNvbnNvbGUubG9nKGNvbW1lbnRMaXN0KTtcclxuICAgIGNvbW1lbnRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgY29uc3QgYXJyID0gYXdhaXQgTW92ZUluZm87XHJcbiAgICBhcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb21tZW50TGlzdC5pbm5lckhUTUwgKz0gYDxsaT4ke2l0ZW0udXNlcm5hbWV9OiAke2l0ZW0uY29tbWVudH0gLSAke2l0ZW0uY3JlYXRpb25fZGF0ZX08L2xpPmA7XHJcbiAgICB9KTtcclxuICB9O1xyXG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DcmV0ZStSb3VuZCZmYW1pbHk9SW50ZXI6d2dodEA0MDA7NTAwOzYwMDs3MDA7ODAwJmZhbWlseT1Qb3BwaW5zJmZhbWlseT1Sb2JvdG86d2dodEA3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiwgKjo6YWZ0ZXIsICo6OmJlZm9yZSB7XFxyXFxuICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogdGhpcyBpcyB3aGVyZSBpIHN0eWxlZCB0aGUgc2Nyb2xsIHByb3BlcnR5IGZvciB0aGUgYm9keSAqL1xcclxcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXHJcXG4gIHdpZHRoOiAxZW07XFxyXFxufVxcclxcblxcclxcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxyXFxufVxcclxcblxcclxcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmV5O1xcclxcbiAgb3V0bGluZTogMXB4IHNvbGlkIHNsYXRlZ3JleTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig5OSwgOTksIDk5KTtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBzbGF0ZWdyZXk7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBicm93bjtcXHJcXG4gIHBhZGRpbmc6IDAgMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXHJcXG4gIC5tb2JpbGUge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICBjb2xvcjogd2hlYXQ7XFxyXFxufVxcclxcblxcclxcbnNwYW4ge1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxufVxcclxcblxcclxcbmxpIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5uYXYtaXRlbXMgYSB7XFxyXFxuICBjb2xvcjogd2hlYXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbiNzZWFyY2gge1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggIzBhMGEwYTtcXHJcXG59XFxyXFxuXFxyXFxuI3NlYXJjaDpmb2N1cyB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiAxcHggc29saWQgIzQ2NDY0NjtcXHJcXG4gIGNvbG9yOiBicm93bjtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoZWF0O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgcGFkZGluZzogMTVweCAwO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uZ28tdXAgYSB7XFxyXFxuICBjb2xvcjogYnJvd247XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogc3R5bGluZ3MgZm9yIHRoZSBkaXNwbGF5IGl0ZW1zICovXFxyXFxuLmNhcmQtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgcGFkZGluZzogMjBweCAwO1xcclxcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXHJcXG5cXHJcXG4gIC8qIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgKi9cXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG5cXHJcXG4gIC8qIHBhZGRpbmc6IGF1dG87ICovXFxyXFxufVxcclxcblxcclxcbmgyIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuaW1nIHtcXHJcXG4gIHdpZHRoOiAzNzBweDtcXHJcXG4gIGhlaWdodDogNTAwcHg7XFxyXFxufVxcclxcblxcclxcbi5tb3ZpZS1jYXJkcyB7XFxyXFxuICAvKiB0ZXh0LWFsaWduOiBjZW50ZXI7ICovXFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiZWlnZTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5tb3ZpZS1jYXJkczpob3ZlciB7XFxyXFxuICBib3gtc2hhZG93OiAwIDAgNHB4ICM3NDc0NzRhYjtcXHJcXG59XFxyXFxuXFxyXFxuLm1vdmllLXRpdGxlIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiAjNDY0NjQ2O1xcclxcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubW92aWUtaW5mbyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMTVweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJlaWdlO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYnJvd247XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbjpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGVhdDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uOmFjdGl2ZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBicm93bjtcXHJcXG4gIGNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4uZmEge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZmE6aG92ZXIge1xcclxcbiAgY29sb3I6IHJlZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9yIG1vYmlsZSBzY3JlZW5zICovXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcXHJcXG4gIC5tb2JpbGUge1xcclxcbiAgICBjb2xvcjogd2hlYXQ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY2FyZC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgLm5hdi1pdGVtcyB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBpbWcge1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxuICAgIGhlaWdodDogNDAwcHg7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5kZXNjcmlwdGlvbiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGZsZXg6IDI7XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb21tZW50cyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubUluZm8ge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcXHJcXG59XFxyXFxuXFxyXFxuLkQtZGVzY3JpcHRpb24ge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxuICBnYXA6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbiNjb21tZW50IHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wdXAge1xcclxcbiAgdHJhbnNpdGlvbjogMjAwbXMgZWFzZS1pbi1vdXQ7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBsZWZ0OiA1MCU7XFxyXFxuICB0b3A6IDUwJTtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIGhlaWdodDogOTklO1xcclxcbiAgcGFkZGluZzogMiU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICB6LWluZGV4OiAxMDtcXHJcXG59XFxyXFxuXFxyXFxuLnN1bW1hcnktdGFnIGgxe1xcclxcbiAgY29sb3I6IGJyb3duO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLnN1bW1hcnktdGFnIHtcXHJcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XFxyXFxufVxcclxcblxcclxcbi5pbWFnZSB7XFxyXFxuICB3aWR0aDogMjUwcHg7XFxyXFxuICBoZWlnaHQ6IDM3MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucG9wdXAuYWN0aXZlIHtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xcclxcbn1cXHJcXG5cXHJcXG4ub3ZlcmxheSB7XFxyXFxuICB0cmFuc2l0aW9uOiAyMDBtcyBlYXNlLWluLW91dDtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIG9wYWNpdHk6IDA7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgdG9wOiAwO1xcclxcbiAgcmlnaHQ6IDA7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxyXFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLm92ZXJsYXkuYWN0aXZlIHtcXHJcXG4gIG9wYWNpdHk6IDE7XFxyXFxuICBwb2ludGVyLWV2ZW50czogYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0aGlzIGlzIHdoZXJlIGkgc3R5bGVkIHRoZSBzY3JvbGwgcHJvcGVydHkgZm9yIHRoZSBjb21tZW50cyAqL1xcclxcbi5ELWNvbW1lbnRzIHtcXHJcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXHJcXG4gIG1heC1oZWlnaHQ6IDE3MHB4O1xcclxcbiAgbWFyZ2luOiAwcHg7IFxcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00MHB4KTtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuLkQtY29tbWVudHM6YWN0aXZlIHtcXHJcXG4gIGN1cnNvcjogZ3JhYmJpbmc7XFxyXFxufVxcclxcblxcclxcbi5ELWNvbW1lbnRzOjotd2Via2l0LXNjcm9sbGJhciB7XFxyXFxuICB3aWR0aDogMWVtO1xcclxcbn1cXHJcXG5cXHJcXG4uRC1jb21tZW50czo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXHJcXG59XFxyXFxuXFxyXFxuLkQtY29tbWVudHM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxyXFxuICBvdXRsaW5lOiAxcHggc29saWQgc2xhdGVncmV5O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLkQtY29tbWVudHM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig5OSwgOTksIDk5KTtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBzbGF0ZWdyZXk7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jY29tbWVudCB7XFxyXFxuICBvdXRsaW5lOiAwcHg7XFxyXFxuICB3aWR0aDogMTVyZW07XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYnJvd247XFxyXFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbiNmbmFtZSB7XFxyXFxuICBvdXRsaW5lOiAwcHg7XFxyXFxuICB3aWR0aDogMTVyZW07XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYnJvd247XFxyXFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxufVxcclxcblxcclxcbmgzIHtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAzM3B4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VtbWFyeSB7XFxyXFxuICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWl0IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogN3B4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYnJvd247XFxyXFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWl0IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogN3B4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmVpZ2U7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBicm93bjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcbmEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWl0OmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN1Ym1pdDphY3RpdmUge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYnJvd247XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtHQUNHLHNCQUFzQjtF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QkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsV0FBVztBQUNiXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNyZXRlK1JvdW5kJmZhbWlseT1JbnRlcjp3Z2h0QDQwMDs1MDA7NjAwOzcwMDs4MDAmZmFtaWx5PVBvcHBpbnMmZmFtaWx5PVJvYm90bzp3Z2h0QDcwMCZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG4qLCAqOjphZnRlciwgKjo6YmVmb3JlIHtcXHJcXG4gICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgfVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG4vKiB0aGlzIGlzIHdoZXJlIGkgc3R5bGVkIHRoZSBzY3JvbGwgcHJvcGVydHkgZm9yIHRoZSBib2R5ICovXFxyXFxuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIge1xcclxcbiAgd2lkdGg6IDFlbTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZXk7XFxyXFxuICBvdXRsaW5lOiAxcHggc29saWQgc2xhdGVncmV5O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDk5LCA5OSwgOTkpO1xcclxcbiAgb3V0bGluZTogMXB4IHNvbGlkIHNsYXRlZ3JleTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJyb3duO1xcclxcbiAgcGFkZGluZzogMCAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcclxcbiAgLm1vYmlsZSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIGNvbG9yOiB3aGVhdDtcXHJcXG59XFxyXFxuXFxyXFxuc3BhbiB7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG59XFxyXFxuXFxyXFxubGkge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLm5hdi1pdGVtcyBhIHtcXHJcXG4gIGNvbG9yOiB3aGVhdDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgcGFkZGluZy1yaWdodDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3NlYXJjaCB7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgYm94LXNoYWRvdzogMCAwIDVweCAjMGEwYTBhO1xcclxcbn1cXHJcXG5cXHJcXG4jc2VhcmNoOmZvY3VzIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCAjNDY0NjQ2O1xcclxcbiAgY29sb3I6IGJyb3duO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hlYXQ7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiAxNXB4IDA7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5nby11cCBhIHtcXHJcXG4gIGNvbG9yOiBicm93bjtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBzdHlsaW5ncyBmb3IgdGhlIGRpc3BsYXkgaXRlbXMgKi9cXHJcXG4uY2FyZC1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxyXFxuICBwYWRkaW5nOiAyMHB4IDA7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xcclxcblxcclxcbiAgLyogYWxpZ24tY29udGVudDogY2VudGVyOyAqL1xcclxcbiAgbWFyZ2luOiBhdXRvO1xcclxcblxcclxcbiAgLyogcGFkZGluZzogYXV0bzsgKi9cXHJcXG59XFxyXFxuXFxyXFxuaDIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5pbWcge1xcclxcbiAgd2lkdGg6IDM3MHB4O1xcclxcbiAgaGVpZ2h0OiA1MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1vdmllLWNhcmRzIHtcXHJcXG4gIC8qIHRleHQtYWxpZ246IGNlbnRlcjsgKi9cXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJlaWdlO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1vdmllLWNhcmRzOmhvdmVyIHtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMCA0cHggIzc0NzQ3NGFiO1xcclxcbn1cXHJcXG5cXHJcXG4ubW92aWUtdGl0bGUge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6ICM0NjQ2NDY7XFxyXFxuICBmb250LXdlaWdodDogNzAwO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5tb3ZpZS1pbmZvIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAxNXB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmVpZ2U7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBicm93bjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoZWF0O1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b246YWN0aXZlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJyb3duO1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi5mYSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5mYTpob3ZlciB7XFxyXFxuICBjb2xvcjogcmVkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb3IgbW9iaWxlIHNjcmVlbnMgKi9cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xcclxcbiAgLm1vYmlsZSB7XFxyXFxuICAgIGNvbG9yOiB3aGVhdDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubmF2LWl0ZW1zIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGltZyB7XFxyXFxuICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgaGVpZ2h0OiA0MDBweDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmRlc2NyaXB0aW9uIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgZmxleDogMjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbW1lbnRzIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5tSW5mbyB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjdGN0Y3O1xcclxcbn1cXHJcXG5cXHJcXG4uRC1kZXNjcmlwdGlvbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIGdhcDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2NvbW1lbnQge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5wb3B1cCB7XFxyXFxuICB0cmFuc2l0aW9uOiAyMDBtcyBlYXNlLWluLW91dDtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIGxlZnQ6IDUwJTtcXHJcXG4gIHRvcDogNTAlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxyXFxuICB3aWR0aDogODAlO1xcclxcbiAgaGVpZ2h0OiA5OSU7XFxyXFxuICBwYWRkaW5nOiAyJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIHotaW5kZXg6IDEwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VtbWFyeS10YWcgaDF7XFxyXFxuICBjb2xvcjogYnJvd247XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VtbWFyeS10YWcge1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcXHJcXG59XFxyXFxuXFxyXFxuLmltYWdlIHtcXHJcXG4gIHdpZHRoOiAyNTBweDtcXHJcXG4gIGhlaWdodDogMzcwcHg7XFxyXFxufVxcclxcblxcclxcbi5wb3B1cC5hY3RpdmUge1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxyXFxufVxcclxcblxcclxcbi5vdmVybGF5IHtcXHJcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgb3BhY2l0eTogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB0b3A6IDA7XFxyXFxuICByaWdodDogMDtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4ub3ZlcmxheS5hY3RpdmUge1xcclxcbiAgb3BhY2l0eTogMTtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxyXFxufVxcclxcblxcclxcbi8qIHRoaXMgaXMgd2hlcmUgaSBzdHlsZWQgdGhlIHNjcm9sbCBwcm9wZXJ0eSBmb3IgdGhlIGNvbW1lbnRzICovXFxyXFxuLkQtY29tbWVudHMge1xcclxcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbiAgbWF4LWhlaWdodDogMTcwcHg7XFxyXFxuICBtYXJnaW46IDBweDsgXFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTQwcHgpO1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG4uRC1jb21tZW50czphY3RpdmUge1xcclxcbiAgY3Vyc29yOiBncmFiYmluZztcXHJcXG59XFxyXFxuXFxyXFxuLkQtY29tbWVudHM6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXHJcXG4gIHdpZHRoOiAxZW07XFxyXFxufVxcclxcblxcclxcbi5ELWNvbW1lbnRzOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcclxcbn1cXHJcXG5cXHJcXG4uRC1jb21tZW50czo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCBzbGF0ZWdyZXk7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uRC1jb21tZW50czo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDk5LCA5OSwgOTkpO1xcclxcbiAgb3V0bGluZTogMXB4IHNvbGlkIHNsYXRlZ3JleTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNjb21tZW50IHtcXHJcXG4gIG91dGxpbmU6IDBweDtcXHJcXG4gIHdpZHRoOiAxNXJlbTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBicm93bjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuI2ZuYW1lIHtcXHJcXG4gIG91dGxpbmU6IDBweDtcXHJcXG4gIHdpZHRoOiAxNXJlbTtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBicm93bjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG59XFxyXFxuXFxyXFxuaDMge1xcclxcbiAgbWFyZ2luLWxlZnQ6IDMzcHg7XFxyXFxufVxcclxcblxcclxcbi5zdW1tYXJ5IHtcXHJcXG4gIGhlaWdodDogMjAwcHg7XFxyXFxuICBvdmVyZmxvdy14OiBzY3JvbGw7XFxyXFxufVxcclxcblxcclxcbi5zdWJtaXQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiA3cHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBicm93bjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdWJtaXQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiA3cHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiZWlnZTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJyb3duO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG59XFxyXFxuYSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5zdWJtaXQ6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWl0OmFjdGl2ZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBicm93bjtcXHJcXG4gIGNvbG9yOiAjZmZmO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5cclxuaW1wb3J0IHsgbW92aWVMaXN0IH0gZnJvbSAnLi4vbW9kdWxlcy9ob21lcGFnZS5qcyc7XHJcbmltcG9ydCBQb3B1cCBmcm9tICcuLi9tb2R1bGVzL3BvcHVwJztcclxuaW1wb3J0IHsgSW52b2x2ZW1udCB9IGZyb20gJy4uL21vZHVsZXMvUG9wdXBBcGknO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBtb3ZpZUxpc3QoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbiAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuY29tbWVudEJ0bicpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHsgaWQgfSA9IGUudGFyZ2V0O1xyXG4gIGNvbnN0IGNvbUxpc3QgPSBhd2FpdCBJbnZvbHZlbW50LmdldENvbW1lbnRzKGlkKTtcclxuICBjb25zdCBNb3ZlSW5mbyA9IGF3YWl0IFBvcHVwLmdldEluZm9zKGlkKTtcclxuICBhd2FpdCBQb3B1cC5kaXNwbGF5KE1vdmVJbmZvLCBpZCwgY29tTGlzdCk7XHJcbiAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbiAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKTtcclxuICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIFBvcHVwLmRpc3BsYXlDb20oY29tTGlzdCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpO1xyXG4gIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xyXG4gIGlmICghZS50YXJnZXQubWF0Y2hlcygnLnN1Ym1pdCcpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGUucHJldmVudERlZmF1bHQoKVxyXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm5hbWUnKS52YWx1ZTtcclxuICBjb25zdCBjb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudCcpLnZhbHVlO1xyXG4gIGNvbnN0IHsgaWQgfSA9IGUudGFyZ2V0O1xyXG4gIGF3YWl0IEludm9sdmVtbnQucG9zdENvbW1lbnRzKGlkLCBuYW1lLCBjb20pO1xyXG4gIGNvbnN0IGNvbUxpc3QgPSBhd2FpdCBJbnZvbHZlbW50LmdldENvbW1lbnRzKGlkKTtcclxuICBQb3B1cC5kaXNwbGF5Q29tKGNvbUxpc3QpO1xyXG59KTtcclxuXHJcbi8vIERPTSBMT0FEXHJcbi8vIGNvbnN0IE1vdmVJbmZvID0gUG9wdXAuZ2V0SW5mb3MoMyk7XHJcbi8vIFBvcHVwLmRpc3BsYXkoTW92ZUluZm8pO1xyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgYXN5bmMgKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGlkID0gMztcclxuLy8gICBjb25zdCBjb21MaXN0ID0gYXdhaXQgSW52b2x2ZW1udC5nZXRDb21tZW50cyhpZCk7XHJcbi8vICAgY29uc29sZS5sb2coY29tTGlzdCk7XHJcbi8vICAgUG9wdXAuZGlzcGxheUNvbShjb21MaXN0KTtcclxuLy8gfSk7XHJcblxyXG4vLyAvLyB0b2dnbGUgYW5kIGhpZGUgUG9wdXBcclxuLy8gY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcbi8vIGNvbnN0IHRvZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2xlQnRuJyk7XHJcbi8vIHRvZ2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XHJcbi8vICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbi8vICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuLy8gfSk7XHJcblxyXG4vLyBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XHJcbi8vICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbi8vICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuLy8gfSk7XHJcblxyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChlKSA9PiB7XHJcbi8vICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuc3VibWl0JykpIHtcclxuLy8gICAgIHJldHVybjtcclxuLy8gICB9XHJcbi8vICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xyXG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZuYW1lJykudmFsdWU7XHJcbi8vICAgY29uc3QgY29tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQnKS52YWx1ZTtcclxuLy8gICBjb25zdCBpZCA9IDM7XHJcbi8vICAgYXdhaXQgSW52b2x2ZW1udC5wb3N0Q29tbWVudHMoaWQsIG5hbWUsIGNvbSk7XHJcbi8vICAgY29uc29sZS5sb2coY29tTGlzdCk7XHJcbi8vICAgY29uc3QgY29tTGlzdCA9IGF3YWl0IEludm9sdmVtbnQuZ2V0Q29tbWVudHMoaWQpO1xyXG4vLyAgIFBvcHVwLmRpc3BsYXlDb20oY29tTGlzdCk7XHJcbi8vIH0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==