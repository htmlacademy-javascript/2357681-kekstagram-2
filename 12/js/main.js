import {showAlert} from './util.js';
import {createPhotoList} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {initClickListener} from './open-full-picture.js';
import {openImgEditor, closeImgEditor, onFormSubmit, showFullSuccessMessage, showFullErrorMessage} from './upload-image-form.js';
import { getData, sendData } from './api.js';

const picturesDataList = createPhotoList();

initClickListener(picturesDataList);

openImgEditor();

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
} catch (err) {
  showAlert(err.message);
}


