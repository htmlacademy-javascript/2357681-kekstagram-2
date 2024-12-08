import {isEscapeKey} from './util.js';
import {picturesContainer} from './render-thumbnails.js';
import {createComment} from './data.js';

const closeButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments'); //socialCommentsNode
const commentTemplate = commentsList.querySelector('.social__comment');

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
  const commentsFragment = document.createDocumentFragment();

  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture .big-picture__img img').src = currentPhoto.url;
  document.querySelector('.likes-count').textContent = currentPhoto.likes;
  document.querySelector('.social__comment-shown-count').textContent = currentPhoto.comments.length;
  document.querySelector('.social__caption').textContent = currentPhoto.description;

  commentsList.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const pictureComment = commentTemplate.cloneNode(true);

    pictureComment.querySelector('.social__picture').src = comment.avatar;
    pictureComment.querySelector('.social__picture').alt = comment.name;
    pictureComment.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(pictureComment);
  });

  commentsList.appendChild(commentsFragment);

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

const initClickListener = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      openFullPicture(currentPicture.dataset.pictureId, data);
    }
  });
};

export {openFullPicture, closeFullPicture, initClickListener};

