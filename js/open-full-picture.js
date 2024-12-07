import {isEscapeKey} from './util.js';
import {pictures} from './render-thumbnails.js';
import {createComment} from './data.js';

const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

const onClickButtonClose = (evt) => {
  evt.preventDefault();
  closeFullPicture();
};


const openFullPicture = (pictureId) => {
  const currentPhoto = pictures.find((photo) => photo.id === Number(pictureId));

  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture .big-picture__img img').src = currentPhoto.url;
  document.querySelector('.likes-count').textContent = currentPhoto.likes;
  document.querySelector('.social__comment-shown-count').textContent = currentPhoto.comments.length;
  document.querySelector('.social__caption').textContent = currentPhoto.description;
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onClickButtonClose);
};


function closeFullPicture() {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openFullPicture, closeFullPicture};

