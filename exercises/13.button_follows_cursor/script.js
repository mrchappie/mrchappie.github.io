const root = document.querySelector(':root');
const button = document.getElementById('button');

window.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX - 50;
  const mouseY = event.clientY - 50;

  setTimeout(() => {
    root.style.setProperty('--mouse-x', `${mouseX}px`);
    root.style.setProperty('--mouse-y', `${mouseY}px`);
  }, 100);
});
