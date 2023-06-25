const refs = {
    buttonStartEl: document.querySelector('button[data-start]'),
    buttonStopEl: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body')
};

let buttonStartInteval = null;

const handleClickOnStart = () => {
    buttonStartInteval = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);

    refs.buttonStartEl.setAttribute("disabled", "disabled");
};

const handleClickOnStop = () => {
    clearInterval(buttonStartInteval);
    refs.buttonStartEl.removeAttribute("disabled");
};

refs.buttonStartEl.addEventListener('click', handleClickOnStart);
refs.buttonStopEl.addEventListener('click', handleClickOnStop);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
