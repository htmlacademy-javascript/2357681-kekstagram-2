import { resetEffects } from './add-effect-slider.js';
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


const SCALE_STEP = 0.25;
let scale = 1;
const image = uploadImgForm.querySelector('.img-upload__preview img');
const scaleControl = uploadImgForm.querySelector('.scale__control--value');
const smaller = uploadImgForm.querySelector('.scale__control--smaller');
const bigger = uploadImgForm.querySelector('.scale__control--bigger');


const pristine = new Pristine(uploadImgForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
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
  uploadImgForm.reset();
  pristine.reset();
  resetEffects();
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

const isCommentValid = (value) => (
  value.length <= 140
);

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    image.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    image.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

pristine.addValidator(commentInput, isCommentValid, 'Комментарий не должен быть длиннее 140 символов');

export {openImgEditor, onFormSubmit};

