const PHOTOS_COUNT = 10;

const imgFiltersElement = document.querySelector('.img-filters');
const defaultFilterButton = imgFiltersElement.querySelector('#filter-default');
const randomFilterButton = imgFiltersElement.querySelector('#filter-random');
const discussedFilterButton = imgFiltersElement.querySelector('#filter-discussed');

const makeFiltersActive = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const setActiveFilter = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const mixThumbnails = () => Math.random() - 0.5;

const compareThumbnails = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

const initFilterListeners = (photos, showThumbnails) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    showThumbnails(photos);
    setActiveFilter(evt.target);
  });

  randomFilterButton.addEventListener('click', (evt) => {
    showThumbnails(photos.slice().sort(mixThumbnails).slice(0, PHOTOS_COUNT));
    setActiveFilter(evt.target);
  });

  discussedFilterButton.addEventListener('click', (evt) => {
    showThumbnails(photos.slice().sort(compareThumbnails));
    setActiveFilter(evt.target);
  });
};

export {makeFiltersActive, initFilterListeners};
