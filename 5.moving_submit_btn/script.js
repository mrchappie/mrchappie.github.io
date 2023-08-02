const btn = document.getElementById('submit');
const pw = document.getElementById('password');
const form = document.getElementById('form');

let buttonPosition = 0;
let numberSignHandler = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

btn.addEventListener('click', () => {
  if ((pw.value.length < 4 && buttonPosition === 0) || buttonPosition === 2) {
    moveButtonLeft();
    setStyleIfWrong();
  } else if (pw.value.length < 4 && buttonPosition === 1) {
    moveButtonRight();
    setStyleIfWrong();
  } else if (
    (pw.value.length >= 4 && buttonPosition === 1) ||
    buttonPosition === 0 ||
    buttonPosition ||
    2
  ) {
    setStyleIfRight();
  }
});

const moveButtonLeft = () => {
  // btn.style.transform = `translateX(${-1 * 150}px)`;
  btn.style.transform = `translateX(${getRandomNumber(numberSignHandler)}px)`;
  buttonPosition = 1;
  numberSignHandler = 1;
};

const moveButtonRight = () => {
  // btn.style.transform = `translateX(${1 * 150}px)`;
  btn.style.transform = `translateX(${getRandomNumber(numberSignHandler)}px)`;
  buttonPosition = 2;
  numberSignHandler = 0;
};

const setStyleIfWrong = () => {
  pw.style.borderColor = 'red';
  btn.style.backgroundColor = 'red';
  form.style.boxShadow = '2px 2px 30px red';
};

const setStyleIfRight = () => {
  pw.style.borderColor = 'green';
  btn.style.backgroundColor = 'green';
  form.style.boxShadow = '2px 2px 30px green';
};

// getRandomNumber V2

const min = 70;
const max = 180;

const getRandomNumber = (idx) => {
  const randomPosNumber = Math.floor(Math.random() * (max - min + 1) + min);
  const randomNegNumber = Math.floor(Math.random() * (-max + min + 1) - min);

  const arrRandomNumber = [randomNegNumber, randomPosNumber];

  return arrRandomNumber[idx];
};
