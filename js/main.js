import './util.js';
import {createPhotoList} from './data.js';
import {renderThumbnails, pictures} from './render-thumbnails.js';
import {openFullPicture} from './open-full-picture.js';

pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('picture');

  if (currentPicture) {
    openFullPicture(currentPicture.dataset.pictureId);
  }
});

console.log(createPhotoList);
console.log(renderThumbnails);
