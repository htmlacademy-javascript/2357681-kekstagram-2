import {isEscapeKey} from './util.js';

const pageBody = document.querySelector('body');
const uploadImgForm = document.querySelector('.img-upload__form');

const fileField = uploadImgForm.querySelector('#upload-file');
const editorImgForm = uploadImgForm.querySelector('.img-upload__overlay');
const uploadCancelBtn = editorImgForm.querySelector('#upload-cancel');
const hashtagInput = uploadImgForm.querySelector('.text__hashtags');
const commentInput = uploadImgForm.querySelector('.text__description');

const onUploadCancelBtnClick = () => {
  closeImgEditor();
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgEditor();
  }
};

function closeImgEditor () {
  editorImgForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);
  fileField.value = '';
}

const initUploadForm = () => {
  uploadImgForm.addEventListener('change', () => {
    editorImgForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};

export {initUploadForm};

