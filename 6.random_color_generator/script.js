const generateBtn = document.querySelector('.generate');
const copyBtn = document.querySelector('.copy-hex');
const hexSpan = document.querySelector('.hex');
const mainBgColor = document.querySelector('.app-container');

// const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const lettersArray = ['a', 'b', 'c', 'd', 'e', 'f'];

const lettersNumbersArray = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];

const getRandomNumber = () => {
  const number = Math.floor(Math.random() * lettersNumbersArray.length);

  return number;
};

// const getRandomLetter = () => {
//   const number = Math.floor(Math.random() * 6);

//   return lettersArray[number];
// };

// get random number

const getRandomColor = () => {
  //   const randomArray = [getRandomLetter(), getRandomNumber()];

  const getRandomFromArray = () => {
    let hex = '#';

    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * lettersNumbersArray.length);

      hex += lettersNumbersArray[index];
    }

    console.log(hex);
    return hex;
  };

  const randomColorHex = `${getRandomFromArray()}`;

  return randomColorHex;
};

let randomColor;

// change color on btn click or on page load

window.addEventListener('load', () => {
  randomColor = getRandomColor();
  hexSpan.innerText = randomColor;
  mainBgColor.style.setProperty('--bg-color', `${randomColor}`);
});

generateBtn.addEventListener(['click'], () => {
  randomColor = getRandomColor();
  hexSpan.innerText = randomColor;
  mainBgColor.style.setProperty('--bg-color', `${randomColor}`);
});

copyBtn.addEventListener('click', () => {
  // Create a fake `textarea` and set the contents to the text
  // you want to copy
  const storage = document.createElement('textarea');
  storage.value = hexSpan.innerText;

  mainBgColor.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`

  storage.select();
  storage.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(storage.value);
  mainBgColor.removeChild(storage);
});
