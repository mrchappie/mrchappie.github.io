const btn = document.getElementById('button');
const cart = document.querySelector('.cart');
const package = document.querySelector('.package');
const animationDuration = 3500;

const addStyles = () => {
  cart.style.display = 'block';
  package.style.display = 'block';
  cart.classList.add('animate__cart');
  package.classList.add('animate__package');
};

const resetStyles = () => {
  setTimeout(() => {
    cart.style.display = 'none';
    package.style.display = 'none';
    cart.classList.remove('animate__cart');
    package.classList.remove('animate__package');
  }, animationDuration);
};

const toggleTextInsideButton = () => {
  document.querySelector('.button__text').style.display = 'none';
  setTimeout(() => {
    document.querySelector('.button__text').style.display = 'block';
  }, animationDuration);
};

btn.addEventListener('click', () => {
  toggleTextInsideButton();

  addStyles();

  resetStyles();
});
