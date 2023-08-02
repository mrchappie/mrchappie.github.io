const showNav = document.querySelector('.show__nav');
const hideNav = document.querySelector('.hide__nav');
const navContainer = document.querySelector('.toggle__nav');
const nav = document.querySelector('.nav__container');
const main = document.querySelector('main');

showNav.addEventListener('click', () => {
  navContainer.classList.add('rotate__toggle__nav');
  nav.classList.add('rotate__nav');
  main.classList.add('rotate__main');
});

hideNav.addEventListener('click', () => {
  navContainer.classList.remove('rotate__toggle__nav');
  nav.classList.remove('rotate__nav');
  main.classList.remove('rotate__main');
});
