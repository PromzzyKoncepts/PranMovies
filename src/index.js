import './style.css';

import { movieList } from '../modules/homepage.js';
import { fetchLikeApi } from '../modules/likes.js';
import Popup from '../modules/popup';
import { Involvemnt } from '../modules/PopupApi';

document.addEventListener('DOMContentLoaded', () => {
  movieList();
});

document.addEventListener('click', async (e) => {
  if (!e.target.matches('.commentBtn')) {
    return;
  }
  const { id } = e.target;
  const MoveInfo = await Popup.getInfos(id);
  await Popup.display(MoveInfo, id);
  const overlay = document.querySelector('.overlay');
  const popup = document.querySelector('.popup');
  popup.classList.add('active');
  overlay.classList.add('active');
  const comList = await Involvemnt.getComments(id);
  Popup.displayCom(comList);
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
  const name = document.getElementById('fname').value;
  const com = document.getElementById('comment').value;
  const { id } = e.target;
  await Involvemnt.postComments(id, name, com);
  const comList = await Involvemnt.getComments(id);
  Popup.displayCom(comList);
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