import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEL = document.querySelector('.form');
const btnCreatePromise = document.querySelector('button[type="submit"]');
const inputDelay = formEL.querySelector('input[name="delay"]');
const inputDelayStep = formEL.querySelector('input[name="step"]');
const inputPromiseAmount = formEL.querySelector('input[name="amount"]');

// prevent basic behavior of the form element
formEL.addEventListener('submit', event => {
  event.preventDefault();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

btnCreatePromise.addEventListener('click', () => {
  let delay = Number(inputDelay.value);
  const delayStep = Number(inputDelayStep.value);
  const amount = Number(inputPromiseAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
});
