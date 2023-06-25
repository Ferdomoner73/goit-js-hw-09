import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let neededDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

      if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        if (!refs.buttonStartEl.disabled) {
            refs.buttonStartEl.disabled = true;
            return;
        }

        return;
        }
    
        neededDate = selectedDates[0].getTime();
       
    refs.buttonStartEl.disabled = false;
    },
};

flatpickr("input[type=text]", options);

const refs = {
    buttonStartEl: document.querySelector('button'),
    timerFieldsEl: document.querySelector('.timer')
}

const handleStartOfTimer = () => {

    const updateTimer = () => {
        const currentTime = Date.now();
        const timeDifference = neededDate - currentTime;

        if (currentTime <= 0) {
            clearInterval(countingInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerDisplay({days, hours, minutes, seconds});
    };

    const countingInterval = setInterval(updateTimer, 1000);

    const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
    document.querySelector('span[data-days]').textContent = addZero(days);
    document.querySelector('span[data-hours]').textContent = addZero(hours);
    document.querySelector('span[data-minutes]').textContent = addZero(minutes);
    document.querySelector('span[data-seconds]').textContent = addZero(seconds);

    refs.buttonStartEl.disabled = true;
};
};

refs.buttonStartEl.addEventListener('click', handleStartOfTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addZero = (value) => {
    return String(value).padStart(2, "0");
};
