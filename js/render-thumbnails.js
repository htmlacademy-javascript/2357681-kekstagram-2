import {createPhotoList} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = (usersThumbnails) => {
  const usersThumbnailsFragment = document.createDocumentFragment();

  usersThumbnails.forEach((photo) => {
    const usersElement = thumbnailTemplate.cloneNode(true);
    usersElement.dataset.pictureId = photo.id;
    usersElement.querySelector('.picture__img').src = photo.url;
    usersElement.querySelector('.picture__img').alt = photo.description;
    usersElement.querySelector('.picture__likes').textContent = photo.likes;
    usersElement.querySelector('.picture__comments').textContent = photo.comments.length;
    usersThumbnailsFragment.appendChild(usersElement);
  });

  picturesContainer.appendChild(usersThumbnailsFragment);

};

export {renderThumbnails, picturesContainer};
