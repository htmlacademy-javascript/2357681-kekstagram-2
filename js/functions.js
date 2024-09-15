function checkStringLength (string, maxLength) {
  const currentLength = string.length;

  if (currentLength <= maxLength) {
    return true;
  }

  return false;
}

function isPalindrome (str) {
  const normalizedString = str.toLowerCase().replaceAll(' ', '');
  let newString = '';
  const currentLength = normalizedString.length;

  for (let currentIndex = currentLength - 1; currentIndex >= 0; currentIndex--) {
    let currentSymbol = normalizedString[currentIndex];
    newString += currentSymbol;
  }

  console.log(newString);
  return(newString === normalizedString);
}
