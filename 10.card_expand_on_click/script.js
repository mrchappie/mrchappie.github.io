const boxes = document.querySelectorAll('.box');

for (let i = 0; i < boxes.length; i++) {
  boxes[i].onclick = function () {
    let j = 0;
    while (j < boxes.length) {
      boxes[j++].classList.remove('active');
    }
    boxes[i].classList.add('active');
  };
}
