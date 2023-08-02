const navBar = document.getElementById('sidebar_nav');
const openNavBtn = document.getElementById('open_nav_btn');
const closeNavBtn = document.getElementById('close_nav_btn');

const formInput = document.getElementById('form_input');
const search_btn = document.getElementById('search_btn');

const notShow = document.getElementsByClassName('notShow');

const modal = document.getElementById('modal');

// OPEN and CLOSE BTN
openNavBtn.addEventListener('click', () => {
  maximazieNav();
});

closeNavBtn.addEventListener('click', () => {
  minimizeNav();
});

// MODAL
modal.addEventListener('click', () => {
  minimizeNav();
});

// OPEN and CLOSE NAV BY CLICKING ON IT
// let isNavMax = false;

// navBar.addEventListener('click', () => {
//   if (!isNavMax) maximazieNav();
// });

// navBar.addEventListener('click', () => {
//   if (isNavMax) minimizeNav();
// });

const maximazieNav = () => {
  navBar.style.width = '300px';

  closeNavBtn.style.display = 'block';
  openNavBtn.style.display = 'none';

  [...notShow].forEach((element) => {
    setTimeout(() => {
      element.style.display = 'block';
    }, 50);
  });

  formInput.style.width = '250px';

  search_btn.style.right = '35px';

  modal.style.display = 'block';

  //   isNavMax = true;
};

const minimizeNav = () => {
  navBar.style.width = '60px';

  closeNavBtn.style.display = 'none';
  openNavBtn.style.display = 'block';

  [...notShow].forEach((element) => {
    setTimeout(() => {
      element.style.display = 'none';
    }, 350);
  });

  formInput.style.width = '50px';
  search_btn.style.right = '10px';

  modal.style.display = 'none';

  //   isNavMax = false;
};
