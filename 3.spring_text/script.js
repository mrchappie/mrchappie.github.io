const text = document.querySelectorAll('.text');

let delay = 0;

text.forEach((element, idx) => {
  element.style['animation-delay'] = `${delay}s`;
  element.style['z-index'] = text.length - idx;
  element.classList.add('active');
  delay += 0.05;
});
