const allClearOperator = document.querySelector('[data-all-clear]');
const backSpaceOperator = document.querySelector('[data-backspace]');
// const equalOperator = document.querySelector('[data-equal]');

const operationResultElement = document.getElementById('operation__result');
const operationStepsElement = document.getElementById('operation__steps');

const numbersContainer = document.querySelector(
  '.calculator__container__inputs__numbers'
);
const operatorsContainer = document.querySelector(
  '.calculator__container__inputs__operations'
);

let currentOperator = '';
let currentValue = '';
let finalResult = '';
let calculSteps = '';

const userInputArray = [];

const updateCalculatorDisplay = (calculSteps, finalResult) => {
  operationStepsElement.innerText = calculSteps;
  operationResultElement.innerText = finalResult;
};

const pushDataToArray = () => {
  // check if currentValue is empty, if it's not, add it to array
  if (currentValue != '') {
    userInputArray.push(+currentValue);
    currentValue = '';
  }

  // check if currentOperator is empty, if it's not, add it to array
  if (
    currentOperator != '' &&
    typeof userInputArray[userInputArray.length - 1] === 'number'
  ) {
    userInputArray.push(currentOperator);
    currentOperator = '';
  }
  // change the last introduced operator
  else if (
    currentOperator != '' &&
    typeof userInputArray[userInputArray.length - 1] === 'string'
  ) {
    userInputArray.pop();
    userInputArray.push(currentOperator);
    currentOperator = '';
  }
  // console.log(userInputArray);
};

const calculateFinalResult = () => {
  pushDataToArray();
  if (typeof userInputArray[userInputArray.length - 1] === 'number') {
    const string = userInputArray.join('');
    finalResult = new Function('return ' + string)();
    // console.log(finalResult);
    calculSteps = string;

    updateCalculatorDisplay(calculSteps, finalResult);
  }
};

// equalOperator.addEventListener('click', () => {
//   if (
//     typeof userInputArray[userInputArray.length - 1] === 'string' &&
//     currentValue === ''
//   ) {
//     userInputArray.pop();
//     lastOperator = '';
//   }

//   pushDataToArray();
//   calculateFinalResult();
//   userInputArray.length = 0;
// });

allClearOperator.addEventListener('click', () => {
  currentOperator = '';
  lastOperator = '';
  currentValue = '';
  userInputArray.length = 0;
  updateCalculatorDisplay('0', '0');
});

backSpaceOperator.addEventListener('click', () => {
  userInputArray.pop();

  if (typeof userInputArray[userInputArray.length - 1] === 'string') {
    userInputArray.pop();
  }
});

numbersContainer.addEventListener('click', (elem) => {
  if (elem.target.dataset.number) {
    currentValue = currentValue + elem.target.dataset.number;
  }

  calculateFinalResult();
  // console.log(currentValue);
});

operatorsContainer.addEventListener('click', (elem) => {
  currentOperator = elem.target.dataset.operator;
  pushDataToArray();
});
