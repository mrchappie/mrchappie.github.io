const body = document.querySelector('main');

function insertRowNumbers() {
  const divEl = document.createElement('div');
  divEl.classList.add('row-numbers');

  for (let i = 1; i <= 200; i++) {
    const spanEl = document.createElement('span');
    spanEl.innerText = i;
    divEl.append(spanEl);
  }

  body.append(divEl);
}

insertRowNumbers();
