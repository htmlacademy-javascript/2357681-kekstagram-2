import { resetEffects } from './add-effect-slider.js';
import { hashtagError, isHashtagValid } from './check-hashtag.js';
import {isEscapeKey} from './util.js';

const SCALE_STEP = 0.25;

const pageBody = document.querySelector('body');
const uploadImgForm = document.querySelector('.img-upload__form');

const fileField = uploadImgForm.querySelector('#upload-file');
const editorImgForm = uploadImgForm.querySelector('.img-upload__overlay');
const uploadCancelBtn = editorImgForm.querySelector('#upload-cancel');
const hashtagInput = uploadImgForm.querySelector('.text__hashtags');
const commentInput = uploadImgForm.querySelector('.text__description');
const submitButton = uploadImgForm.querySelector('.img-upload__submit');
const image = uploadImgForm.querySelector('.img-upload__preview img');
const scaleControl = uploadImgForm.querySelector('.scale__control--value');
const smaller = uploadImgForm.querySelector('.scale__control--smaller');
const bigger = uploadImgForm.querySelector('.scale__control--bigger');
const successElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');
const commentError = 'Комментарий не должен быть длиннее 140 символов';
let scale = 1;


const pristine = new Pristine(uploadImgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

const isErrorOpened = () => document.querySelector('.error') !== null;

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
    && !isErrorOpened()
  ) {
    evt.preventDefault();
    closeImgEditor();
  }
};

const onUploadCancelBtnClick = () => {
  closeImgEditor();
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

const showSuccessMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successElement);
    } else {
      const successElementClone = document.querySelector('.success');
      successElementClone.classList.remove('hidden');
    }
  };
};
const showFullSuccessMessage = showSuccessMessage();

const showErrorMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(errorElement);
    } else {
      const errorElementClone = document.querySelector('.error');
      errorElementClone.classList.remove('hidden');
    }
  };
};
const showFullErrorMessage = showErrorMessage();

const hideModalMessage = () => {
  successElement.classList.add('hidden');
  errorElement.classList.add('hidden');
};

const onBodyClick = (evt) => {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
    document.removeEventListener('click', onBodyClick);
  }
};

const onCloseButtonClick = () => {
  hideModalMessage();
};

const onEscCloseModalMessage = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
    document.removeEventListener('keydown', onEscCloseModalMessage);
  }
};


const onFormSubmit = (cb) => {
  uploadImgForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      successButtonElement.addEventListener('click', onCloseButtonClick);
      errorButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscCloseModalMessage);
      document.addEventListener('click', onBodyClick);
      await cb(new FormData(uploadImgForm));
      unblockSubmitButton();
    }
  });
};

const isCommentValid = (value) => value.length <= 140;


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

pristine.addValidator(hashtagInput, isHashtagValid, hashtagError);

pristine.addValidator(commentInput, isCommentValid, commentError);

export {openImgEditor, closeImgEditor, onFormSubmit, showFullSuccessMessage, showFullErrorMessage};

