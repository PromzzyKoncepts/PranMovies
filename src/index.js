import './style.css';
import Popup from '../modules/popup';
import { Involvemnt } from '../modules/PopupApi';

const appId = '4va6c4ouZmpzSETsANV3';
const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4va6c4ouZmpzSETsANV3/comments';
// DOM LOAD
const MoveInfo = Popup.getInfos(3);
Popup.display(MoveInfo);
document.addEventListener('DOMContentLoaded', async () => {
  const id = 3;
  const comList = await Involvemnt.getComments(id);
  console.log(comList);
  Popup.displayCom(comList);
});

// toggle and hide Popup
const overlay = document.querySelector('.overlay');
const togleBtn = document.querySelector('.togleBtn');
togleBtn.addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  popup.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  const popup = document.querySelector('.popup');
  popup.classList.remove('active');
  overlay.classList.remove('active');
});


document.addEventListener('click', async (e) => {
  if (!e.target.matches('.submit')) {
    return;
  }
  console.log(e.target);
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const com = document.getElementById('comment').value;
  const id = 3;
  await Involvemnt.postComments(id, name, com);
  const comList = await Involvemnt.getComments(id);
  console.log(comList);
  Popup.displayCom(comList);
});
