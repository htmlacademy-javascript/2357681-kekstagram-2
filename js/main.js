import './util.js';
import {createPhotoList} from './data.js';
import {renderThumbnails, pictures} from './render-thumbnails.js';
import {initClickListener} from './open-full-picture.js';

const data = createPhotoList();

renderThumbnails(data);
initClickListener(data);



