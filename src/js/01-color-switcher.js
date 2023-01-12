// get control elements
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let intervalID;

btnStart.addEventListener('click', event => {
  let generatedColor;

  intervalID = setInterval(() => {
    generatedColor = getRandomHexColor();
    bodyEl.style.backgroundColor = generatedColor;
  }, 1000);
});

btnStop.addEventListener('click', () => {
  if (!intervalID) {
    return;
  }
  clearInterval(intervalID);
  btnStart.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
