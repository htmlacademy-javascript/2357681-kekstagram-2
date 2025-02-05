import {showAlert, debounce} from './util.js';
import {renderThumbnails} from './render-thumbnails.js';
import {initClickListener} from './open-full-picture.js';
import {openImgEditor, closeImgEditor, onFormSubmit, showFullSuccessMessage, showFullErrorMessage} from './upload-image-form.js';
import {getData, sendData} from './api.js';
import {makeFiltersActive, initFilterListeners} from './filters.js';
import {uploadUsersPhoto} from './upload-users-photo.js';

const RENDER_PHOTOS_DELAY = 500;

openImgEditor();

uploadUsersPhoto();

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeImgEditor();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});


try {
  const data = await getData();
  renderThumbnails(data);
  initClickListener(data);
  makeFiltersActive();
  initFilterListeners(data, debounce(renderThumbnails, RENDER_PHOTOS_DELAY));
} catch (err) {
  showAlert(err.message);
}


