import {showAlert} from './util.js';
import {createPhotoList} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {initClickListener} from './open-full-picture.js';
import {openImgEditor} from './upload-image-form.js';
import { getData, sendData } from './api.js';

const picturesDataList = createPhotoList();

renderThumbnails(picturesDataList);
initClickListener(picturesDataList);

openImgEditor();

try {
  const data = await getData();
  renderThumbnails(data);
} catch (err) {
  showAlert(err.message);
}


