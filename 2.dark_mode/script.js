const btn = document.querySelector('.toggle_mode_btn');

const root = document.querySelector(':root');

btn.addEventListener('click', () => {
  btn.classList.toggle('close');
  rootStyle();
});

let mode = false;

const rootStyle = () => {
  if (mode === false) {
    root.style.setProperty('--black', '#fff');
    root.style.setProperty('--white', '#000');
    mode = true;
  } else {
    root.style.setProperty('--black', '#000');
    root.style.setProperty('--white', '#fff');
    mode = false;
  }
};
