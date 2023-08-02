//get range input value and save it in a progress constant for further usage
const progressRange = document.getElementById('progress__range');
let progress = progressRange.value;

//set a random value for progress constant when page loads
const setProgressToRandomNumberOnLoad = () => {
  progress = Math.floor(Math.random() * 100);
  progressRange.value = progress;
};

// insert 12 circular progress bars
const progressBar = `
<div class="outside__circle">
    <div class="inside__circle">
        <div id="progress" class="progress">${progress}<span>%</span></div>
    </div>
</div>
`;
for (let i = 1; i <= 12; i++) {
  document.querySelector('body').insertAdjacentHTML('beforeend', progressBar);
}

// calculate and set progress angle
const setProgressStyle = (number) => {
  let angle = Math.floor((number / 100) * 360);

  document
    .querySelector(':root')
    .style.setProperty('--gradient-angle', `${angle}deg`);

  document.querySelectorAll('.progress').forEach((box) => {
    box.innerHTML = `${progress}<span>%</span>`;
  });
};

// listen for range input chnages
progressRange.addEventListener('input', () => {
  progress = progressRange.value;
  setProgressStyle(progress);
});

// call functions on page laod
setProgressToRandomNumberOnLoad();
setProgressStyle(progress);
