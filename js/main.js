import './util.js';
import {createPhotoList} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {initClickListener} from './open-full-picture.js';
import {initUploadForm} from './upload-image-form.js';

const picturesDataList = createPhotoList();

renderThumbnails(picturesDataList);
initClickListener(picturesDataList);

initUploadForm();


