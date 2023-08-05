const leftBtn = document.getElementById('left__arrow');
const rigthBtn = document.getElementById('right__arrow');
const progressBar = document.getElementById('inside__line');
const stepTextUnderCircle = document.querySelectorAll('.step__text');
const stepCircle = document.querySelectorAll('.circle');

let currStep = 0;
const widthStep = 140;

const updateUI = (event) => {
  progressBar.style.width = `${currStep * widthStep}px`;
  // -------------
  if (currStep === 0) {
    leftBtn.setAttribute('disabled', '');
  } else {
    leftBtn.removeAttribute('disabled', '');
  }
  // -------------
  if (currStep === 4) {
    rigthBtn.setAttribute('disabled', '');
  } else {
    rigthBtn.removeAttribute('disabled', '');
  }
  if (event === 'right__arrow') {
    stepCircle[currStep].classList.add('active');
    stepCircle[currStep].innerText = '✓';
    stepTextUnderCircle[currStep].classList.add('opacity');
  }
  if (event === 'left__arrow') {
    stepCircle[currStep + 1].classList.remove('active');
    stepCircle[currStep + 1].innerText = '✗';
    stepTextUnderCircle[currStep + 1].classList.remove('opacity');
  }
};

leftBtn.addEventListener('click', (e) => {
  if (currStep > 0) {
    currStep--;
  }
  updateUI(e.target.id);
});

rigthBtn.addEventListener('click', (e) => {
  if (currStep < 4) {
    currStep++;
  }
  updateUI(e.target.id);
});
