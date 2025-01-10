import { error, isHashtagValid } from './check-hashtag.js';
import {isEscapeKey} from './util.js';

const pageBody = document.querySelector('body');
const uploadImgForm = document.querySelector('.img-upload__form');

const fileField = uploadImgForm.querySelector('#upload-file');
const editorImgForm = uploadImgForm.querySelector('.img-upload__overlay');
const uploadCancelBtn = editorImgForm.querySelector('#upload-cancel');
const hashtagInput = uploadImgForm.querySelector('.text__hashtags');
const commentInput = uploadImgForm.querySelector('.text__description');
const submitButton = uploadImgForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadImgForm, {
  classTo: 'img-upload__form',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onUploadCancelBtnClick = () => {
  closeImgEditor();
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
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

const openImgEditor = () => {
  uploadImgForm.addEventListener('change', () => {
    editorImgForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = () => {
  uploadImgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      unblockSubmitButton();
    }
  });
};

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

function isCommentValid (value) {
  return value.length <= 140;
}

pristine.addValidator(commentInput, isCommentValid, 'Комментарий не должен быть длиннее 140 символов');

export {openImgEditor, onFormSubmit};

