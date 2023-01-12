// get control elements
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', () => {
  console.log('start');
});

btnStop.addEventListener('click', () => {
  console.log('stop');
});
