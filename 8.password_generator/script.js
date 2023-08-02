// prettier-ignore
const uppercaseLetterArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// prettier-ignore
const lowercaseLetterArr = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
];
// prettier-ignore
const symbolsArr = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', ':', ';', '"', `'`, '<', ',', '>', '.', '?', '/'];
// '&lt;', ',', '&gt;'
// prettier-ignore
const numbersArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const passGenerateBtn = document.getElementById('generate-password-btn');
const passGenerateBtnSec = document.querySelector('.fa-rotate');
const passResult = document.getElementById('password');

// User input
const uppercaseLetters = document.getElementById('letters-uppercase');
const lowercaseLetters = document.getElementById('letters-lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const passwordLengthBox = document.getElementById('password-length');
const passwordLengthSlider = document.getElementById('range');

passwordLengthSlider.addEventListener(
  'change',
  () => (passwordLengthBox.value = passwordLengthSlider.value)
);

// getting user input options
let upper = true;
let lower = true;
let numb = false;
let symb = true;
let passRange = 16;

// array customizing
const userArrayOfOptions = (upper, lower, numb, symb) => {
  const upperArr = upper ? uppercaseLetterArr : '';
  const lowerArr = lower ? lowercaseLetterArr : '';
  const numArr = numb ? numbersArr : '';
  const symbArr = symb ? symbolsArr : '';

  const arr = [...upperArr, ...lowerArr, ...numArr, ...symbArr];

  return arr;
};

const getUserInput = () => {
  const userInputs = {
    upper: uppercaseLetters.checked,
    lower: lowercaseLetters.checked,
    numb: numbers.checked,
    symb: symbols.checked,
    passBox: passwordLengthBox.value,
    passSlider: passwordLengthSlider.value,
  };

  upper = userInputs.upper;
  lower = userInputs.lower;
  numb = userInputs.numb;
  symb = userInputs.symb;
  passRange = userInputs.passSlider;
};

// getting random password function
const getPass = () => {
  getUserInput();

  const generalArr = userArrayOfOptions(upper, lower, numb, symb);

  let pass = '';

  for (let i = 0; i < passRange; i++) {
    const num = Math.floor(Math.random() * generalArr.length);

    pass += generalArr[num];
  }

  pass.toString();

  passwordLengthBox.value = passRange;

  return pass;
};

passGenerateBtn.addEventListener('click', () => {
  // Check for user input
  if (
    uppercaseLetters.checked === false &&
    lowercaseLetters.checked === false &&
    numbers.checked === false &&
    symbols.checked === false
  ) {
    document.getElementById('title').innerText =
      'Please select at least one type of characters';
  } else {
    document.getElementById('title').innerText = 'Customize your password';
    passResult.innerText = getPass();
  }
});

passGenerateBtnSec.addEventListener('click', () => {
  passResult.innerText = getPass();
});

const copyBtn = document.querySelector('.fa-copy');
const main = document.querySelector('.app-container');

copyBtn.addEventListener('click', () => {
  // Create a fake `textarea` and set the contents to the text
  // you want to copy
  const storage = document.createElement('textarea');
  storage.value = document.getElementById('password').innerText;

  main.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`

  storage.select();
  storage.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(storage.value);
  main.removeChild(storage);
});
