import {isEscapeKey} from './util.js';
import {picturesContainer} from './render-thumbnails.js';
import { clearComments, renderComments } from './render-comments.js';

const fullPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

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


const openFullPicture = (pictureId, data) => {
  const currentPhoto = data.find((photo) => photo.id === Number(pictureId));

  document.querySelector('body').classList.add('modal-open');
  fullPicture.classList.remove('hidden');

  document.querySelector('.big-picture .big-picture__img img').src = currentPhoto.url;
  document.querySelector('.likes-count').textContent = currentPhoto.likes;
  document.querySelector('.social__comment-shown-count').textContent = currentPhoto.comments.length;
  document.querySelector('.social__caption').textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onClickButtonClose);
};

function closeFullPicture() {
  clearComments();
  fullPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const initClickListener = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      openFullPicture(currentPicture.dataset.pictureId, data);
    }
  });
};

export {openFullPicture, closeFullPicture, initClickListener};

