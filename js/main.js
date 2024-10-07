const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Зина',
  'Ирина',
  'Арина',
  'Мальвина',
  'Полина',
  'Марина',
  'Виталина',
  'Катерина',
  'Георгина',
  'Филипп',
];

const DESCRIPTIONS = [
  'Кто на лавочке сидел',
  'Кто на улицу глядел',
  'Толя пел',
  'Борис молчал',
  'Николай ногой качал',
  'Дело было вечером',
  'Делать было нечего',
  'Галка села на заборе',
  'Кот забрался на чердак',
  'Тут сказал ребятам Боря',
  'Просто так',
  'А у меня в кармане гвоздь!А у вас?',
  'А у нас сегодня гость! А у вас?',
  'А у нас сегодня кошка родила вчера котят',
  'Котята выросли немножко, а есть из блюдца не хотят!',
  'А у нас в квартире газ!А у вас?',
  'А у нас водопровод! Вот!',
  'А из нашего окна площадь Красная видна!',
  'А из вашего окошка только улица немножко',
  'Мы гуляли по Неглинной',
  'Заходили на бульвар',
  'Нам купили синий-синий презеленый красный шар!',
  'А у нас огонь погас — это раз!',
  'Грузовик привез дрова — это два!'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const PHOTO_LIST_LENGTH = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  let previousResult = -1;
  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    if (previousResult !== result) {
      previousResult = result;
      return result;
    }
    return result === upper ? lower : result + 1;
  };
};

const createComment = () => {
  let id = 1;
  const randomMessageIndex = getRandomInteger(0, MESSAGES.length - 1);
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);

  return () => {
    const comment = {};
    const idAvatar = getRandomInteger(MIN_AVATAR, MAX_AVATAR);
    comment.id = id++;
    comment.avatar = `img/avatar-${idAvatar()}.svg`;
    comment.message = MESSAGES[randomMessageIndex()];
    comment.name = NAMES[randomNameIndex()];

    return comment;
  };
};

const createPhoto = () => {
  let id = 1;

  return () => {
    const photo = {};
    const quantComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
    const quantLikes = getRandomInteger(MIN_LIKES, MAX_LIKES);
    const randomDescriptionIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

    photo.id = id;
    photo.url = `photos/${id}.jpg`;
    photo.description = DESCRIPTIONS[randomDescriptionIndex()];
    photo.likes = quantLikes();
    photo.comments = Array.from({length: quantComments()}, createComment());
    id++;
    return photo;

  };
};

const photoList = Array.from({length: PHOTO_LIST_LENGTH}, createPhoto());

console.log(photoList);
