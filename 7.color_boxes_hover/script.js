const container = document.getElementById('app-container');
// const root = document.querySelector(':root');
// root.style.setProperty('--var_name', 'property');

const createBoxes = (width, height) => {
  const boxSize = 20;

  const boxesNumberHorizontal = Math.floor(width / boxSize);
  const boxesNumberVertical = Math.floor(height / boxSize);
  const boxesNumber = boxesNumberHorizontal * boxesNumberVertical;

  for (let i = 0; i < boxesNumber; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    container.appendChild(box);
  }
};

const getWindowSizes = () => {
  window.onresize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    createBoxes(windowWidth, windowHeight);
  };
  window.onload = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    createBoxes(windowWidth, windowHeight);
  };
};

const hexArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

const getRandomColor = () => {
  let hex = '#';
  for (let i = 0; i < 6; i++) {
    const number = Math.floor(Math.random() * hexArr.length);
    hex += hexArr[number];
  }
  return hex;
};

container.addEventListener('mouseover', (e) => {
  e.stopPropagation();
  getRandomColor();
  const target = e.target.closest('.box');

  if (e.target.classList.contains('box')) {
    setColor(target);
  }

  setTimeout(() => {
    removeColor(target);
  }, 2000);
});

const setColor = (target) => {
  target.style.backgroundColor = `${getRandomColor()}`;
};

const removeColor = (target) => {
  target.style.animationDelay = '1s';
  target.style.backgroundColor = `transparent`;
};

getWindowSizes();
