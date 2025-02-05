import {showAlert} from './util.js';
import {renderThumbnails} from './render-thumbnails.js';
import {initClickOnThumbnailsListener} from './open-full-picture.js';
import {openImgEditor, closeImgEditor, onFormSubmit, showFullSuccessMessage, showFullErrorMessage} from './upload-image-form.js';
import {getData, sendData} from './api.js';
import { initFilterListeners} from './filters.js';
import {uploadUsersPhoto} from './upload-users-photo.js';

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
  initClickOnThumbnailsListener(data);
  initFilterListeners(data);
} catch (err) {
  showAlert(err.message);
}


