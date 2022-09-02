import './style.css';
import { movieList } from '../modules/homepage.js';
import { fetchLikeApi } from '../modules/likes.js'

document.addEventListener('DOMContentLoaded', () => {
  movieList();
});
