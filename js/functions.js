const checkStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
};

const checkPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let newString = '';

  for (let currentIndex = normalizedString.length - 1; currentIndex >= 0; currentIndex--) {
    newString += normalizedString[currentIndex];
  }

  return newString === normalizedString;
};

const getNumbers = (string) => {
  let result = '';
  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : parseInt(result, 10);
};
