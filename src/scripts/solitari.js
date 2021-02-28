var findIndex = require("array.prototype.findindex");
findIndex.shim();

function isLetter(char) {
  return /[a-zA-Z]/.test(char);
}

const wordTest = "Dr. McCann is insane!";

const arrayTest = [
  1,
  4,
  7,
  10,
  13,
  16,
  19,
  22,
  25,
  28,
  3,
  6,
  9,
  12,
  15,
  18,
  21,
  24,
  27,
  2,
  5,
  8,
  11,
  14,
  17,
  20,
  23,
  26,
];

const getOneKey = (arrayCards) => {
  //Step 1
  const indexJoker = arrayCards.findIndex((item) => item == 27);
  [arrayCards[indexJoker], arrayCards[indexJoker + 1]] = [
    arrayCards[indexJoker + 1],
    arrayCards[indexJoker],
  ];

  //Step 2
  let indexJoker2 = arrayCards.findIndex((item) => item == 28);
  [arrayCards[indexJoker2], arrayCards[indexJoker2 + 1]] = [
    arrayCards[indexJoker2 + 1],
    arrayCards[indexJoker2],
  ];
  indexJoker2 = arrayCards.findIndex((item) => item == 28);
  [arrayCards[indexJoker2], arrayCards[indexJoker2 + 1]] = [
    arrayCards[indexJoker2 + 1],
    arrayCards[indexJoker2],
  ];

  //Step 3 Triple Cut

  const indexFirstJoker = arrayCards.findIndex((item) => item == 27);
  const indexSecondJoker = arrayCards.findIndex((item) => item == 28);

  const [topJoker, bottomJoker] =
    indexFirstJoker > indexSecondJoker
      ? [indexSecondJoker, indexFirstJoker]
      : [indexFirstJoker, indexSecondJoker];

  const lastPartCards = arrayCards.slice(0, topJoker);
  const middlePartCards = arrayCards.slice(topJoker, bottomJoker + 1);
  const firstPartCards = arrayCards.slice(bottomJoker + 1, 29);

  let newArray = [];
  newArray = newArray.concat(firstPartCards);
  newArray = newArray.concat(middlePartCards);
  newArray = newArray.concat(lastPartCards);

  arrayCards = newArray;

  //Step 4

  let bottomCard = arrayCards[27];
  bottomCard = bottomCard == 28 ? 27 : bottomCard;
  // console.log("first", arrayCards);
  // console.log("bottomCard", bottomCard);

  const lastPartCards2 = arrayCards.slice(0, bottomCard);
  const firstPartCards2 = arrayCards.slice(bottomCard, 27);

  let newArray2 = [];
  newArray2 = newArray2.concat(firstPartCards2);
  newArray2 = newArray2.concat(lastPartCards2);
  newArray2.push(bottomCard);

  arrayCards = newArray2;

  //Step 5

  let topCard = arrayCards[0] == 28 ? 27 : arrayCards[0];
  //topcard = topCard == 28 ? 27 : topCard;

  return [arrayCards, arrayCards[topCard]];
};

const wordParser = (word) => {
  let wordArray = [];

  [...word].forEach((char) => {
    if (isLetter(char) && char != undefined) {
      wordArray.push(char.toUpperCase());
    }
  });

  if (wordArray.length % 5 != 0) {
    let aux = word.length / 5;
    let decimals = 1 - (aux % 1).toFixed(2);
    for (let i = 0; i < decimals * 5; i++) {
      wordArray.push("X");
    }
  }
  return wordArray;
};
const getFullKey = (arrayCards, word) => {
  let fullKey = [];
  let oneKey = "";
  word.forEach((item) => {
    [arrayCards, oneKey] = getOneKey(arrayCards);
    fullKey.push(oneKey);
  });
  return fullKey;
};

const wordToNumbers = (word) => {
  let finalArray = [];
  word.forEach((item) => finalArray.push(item.charCodeAt(0) - 64));
  return finalArray;
};

const encrypt = (fullKey, wordNumers) => {
  let finalArray = [];
  for (let i = 0; i < fullKey.length; i++) {
    let numberResult = wordNumers[i] + fullKey[i];
    finalArray.push(numberResult > 26 ? numberResult - 26 : numberResult);
  }
  return finalArray;
};

const numbersToWord = (numbers) => {
  let finalArray = [];
  numbers.forEach((item) => finalArray.push(String.fromCharCode(item + 64)));
  return finalArray;
};

const decrypt = (fullKey, encryptedWord) => {
  let encryptedNumbersAux = wordToNumbers(encryptedWord);
  let finalArray = [];

  for (let i = 0; i < fullKey.length; i++) {
    let numberResult = encryptedNumbersAux[i] - fullKey[i];
    finalArray.push(numberResult < 0 ? numberResult + 26 : numberResult);
  }
  return numbersToWord(finalArray);
};

export const fullEncrypt = (cards, message) => {
  let arrayCharCards = cards.split(" ");
  let arrayCards = [];
  arrayCharCards.forEach((char) => arrayCards.push(parseInt(char)));
  let wordParsed = wordToNumbers(wordParser(message));
  let fullKey = getFullKey(arrayCards, wordParsed);
  let encryptedNumbers = encrypt(fullKey, wordParsed);
  console.log(fullKey);
  return [fullKey.join(" "), numbersToWord(encryptedNumbers)];
};

export const fullDecrypt = (encryptedWord, fullKey) => {
  console.log("word: ", encryptedWord);
  console.log("key", fullKey);
  let arrayWord = encryptedWord.split("");
  let arrayFullKey = fullKey.split(" ");
  console.log(arrayWord);
  return decrypt(arrayFullKey, arrayWord);
};
