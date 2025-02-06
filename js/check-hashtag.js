import {numDecline} from './util.js';

const MAX_HASHTAG = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';

const hashtagError = () => errorMessage;

const isHashtagValid = (value) => {

  const textInput = value.toLowerCase().trim();

  if (textInput.length === 0) {
    return true;
  }

  const arrayInputs = textInput.split(/\s+/);

  const rules = [
    {
      check: arrayInputs.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решётки',
    },

    {
      check: arrayInputs.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },

    {
      check: arrayInputs.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },

    {
      check: arrayInputs.some((item, num, arrays) => arrays.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },

    {
      check: arrayInputs.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега - ${MAX_SYMBOLS} символов, включая решётку`,
    },

    {
      check: arrayInputs.length > MAX_HASHTAG,
      error: `Нельзя указать больше ${MAX_HASHTAG} ${numDecline(MAX_HASHTAG, 'хештега', 'хештегов', 'хештегов')}`,
    },

    {
      check: arrayInputs.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы (спецсимвол, пробел, знак пунктуации или эмодзи)',
    },

  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });

};

export {hashtagError, isHashtagValid};

