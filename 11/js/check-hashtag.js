import {numDecline} from './util.js';

const MAX_HASHTAG = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';

const error = () => errorMessage;

const isHashtagValid = (value) => {

  const textInput = value.toLowerCase().trim();

  if (textInput.length === 0) {
    return true;
  }

  const arrayInput = textInput.split(/\s+/);

  const rules = [
    {
      check: arrayInput.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решётки',
    },

    {
      check: arrayInput.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },

    {
      check: arrayInput.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },

    {
      check: arrayInput.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },

    {
      check: arrayInput.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега - ${MAX_SYMBOLS} символов, включая решётку`,
    },

    {
      check: arrayInput.length > MAX_HASHTAG,
      error: `Нельзя указать больше ${MAX_HASHTAG} ${numDecline(MAX_HASHTAG, 'хештега', 'хештегов', 'хештегов')}`,
    },

    {
      check: arrayInput.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
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

export {error, isHashtagValid};

