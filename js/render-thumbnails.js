import {createPhotoList} from './data.js';

const pictures = document.querySelector('.pictures');
const thumbnailsTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersThumbnails = createPhotoList ();

const renderThumbnails = () => {
  const usersThumbnailsFragment = document.createDocumentFragment();

  usersThumbnails.forEach((photo) => {
    const usersElement = thumbnailsTemplate.cloneNode(true);
    usersElement.dataset.pictureId = photo.id;
    usersElement.querySelector('.picture__img').src = photo.url;
    usersElement.querySelector('.picture__img').alt = photo.description;
    usersElement.querySelector('.picture__likes').textContent = photo.likes;
    usersElement.querySelector('.picture__comments').textContent = photo.comments;
    usersThumbnailsFragment.appendChild(usersElement);
  });

  pictures.appendChild(usersThumbnailsFragment);

};

export {renderThumbnails};
export {pictures};
