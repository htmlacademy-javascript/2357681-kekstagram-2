import { resetEffects } from './add-effect-slider.js';
import { hashtagError, isHashtagValid } from './check-hashtag.js';
import {isEscapeKey} from './util.js';

const DEFAULT_SIZE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

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
const smallerButton = uploadImgForm.querySelector('.scale__control--smaller');
const biggerButton = uploadImgForm.querySelector('.scale__control--bigger');

const successElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');

const commentError = 'Комментарий не должен быть длиннее 140 символов';


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

const scaleImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
  scaleControl.value = `${value}%`;
};

const resetScale = () => scaleImage(DEFAULT_SIZE);

function closeImgEditor () {
  editorImgForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadImgForm.reset();
  pristine.reset();
  resetEffects();
  resetScale(DEFAULT_SIZE);
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
  const currentValue = parseInt(scaleControl.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerClick = () => {
  const currentValue = parseInt(scaleControl.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

smallerButton.addEventListener('click', onSmallerClick);
biggerButton.addEventListener('click', onBiggerClick);

pristine.addValidator(hashtagInput, isHashtagValid, hashtagError);

pristine.addValidator(commentInput, isCommentValid, commentError);

export {openImgEditor, closeImgEditor, onFormSubmit, showFullSuccessMessage, showFullErrorMessage};

