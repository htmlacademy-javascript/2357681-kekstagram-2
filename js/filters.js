import {renderThumbnails} from './render-thumbnails.js';
import {debounce, RENDER_PHOTOS_DELAY} from './util.js';

const PHOTOS_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const imgFiltersElement = document.querySelector('.img-filters');
const [defaultButtonElement, randomButtonElement, discussedButtonElement] = imgFiltersElement.querySelectorAll('.img-filters__button');

let activeFilter = defaultButtonElement;
let pictures = [];

const clearThumbnails = () => document.querySelectorAll('.picture').forEach((item) => {
  item.remove();
});

const setActiveFilter = (button) => {
  activeFilter.classList.remove(ACTIVE_CLASS);
  button.classList.add(ACTIVE_CLASS);
  activeFilter = button;
};

const mixThumbnails = () => Math.random() - 0.5;

const selectFilter = () => {
  clearThumbnails();

  const compareThumbnails = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
  let filteredData = [];

  switch (activeFilter) {
    case randomButtonElement:
      filteredData = pictures
        .toSorted(mixThumbnails)
        .slice(0, PHOTOS_COUNT);
      break;

    case discussedButtonElement:
      filteredData = pictures.toSorted(compareThumbnails);
      break;
    default:
      filteredData = pictures;
  }
  renderThumbnails(filteredData);
};

const debounceFilterRender = debounce(selectFilter, RENDER_PHOTOS_DELAY);
const onFilterChange = (evt) => {

  const targetButton = evt.target;
  if (activeFilter === targetButton) {
    return;
  }

  setActiveFilter(targetButton);
  debounceFilterRender();
};


const initFilterListeners = (picturesData) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  imgFiltersElement.addEventListener('click', onFilterChange);

  pictures = picturesData;
};

export {initFilterListeners};
