// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
btnStart.setAttribute('disabled', '');

let selectedDate;
let todayDate = Date.parse(new Date());
let ms;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = Date.parse(selectedDates[0]);

    if (selectedDate < todayDate) {
      Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', '');
      return;
    }
    if (btnStart.hasAttribute('disabled')) {
      btnStart.removeAttribute('disabled');
    }
    ms = selectedDate - todayDate;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStart.addEventListener('click', event => {
  let intervalID = setInterval(function () {
    const deltaTime = selectedDate - Date.now();
    const deltaInSeconds = Number(((deltaTime % 60000) / 1000).toFixed(0));

    if (deltaInSeconds <= 0) {
      clearInterval(intervalID);
    }

    const dateObj = convertMs(deltaTime);
    console.log(dateObj);
    const { days, hours, minutes, seconds } = dateObj;

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, 1000);
});
