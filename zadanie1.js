const CURRENT_TIME_SECONDS_ID = 'current-time-seconds';
const CURRENT_TIME_MINUTES_ID = 'current-time-minutes';
const SAVED_TIMES_ID = 'saved-times';
const TIMER_RESOLUTION_MS = 1000;

const savedTimes = [];

let currentTimeSeconds = 0;
let currentTimeMinutes = 0;
let timerIntervalId;

const currentTimeSecondsElement = document.getElementById(
  CURRENT_TIME_SECONDS_ID
);
const currentTimeMinutesElement = document.getElementById(
  CURRENT_TIME_MINUTES_ID
);
const savedTimesElement = document.getElementById(SAVED_TIMES_ID);

initializeApp();

function initializeApp() {
  updateCurrentTimeUI();
}

function start() {
  if (timerIntervalId) {
    return;
  }

  timerIntervalId = setInterval(() => {
    const newTime = currentTimeSeconds + 1;
    setCurrentTime(newTime);
  }, TIMER_RESOLUTION_MS);
}

function stop() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }
  setCurrentTime(0);
  updateCurrentTimeUI();
}

function pause() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }
}

function save() {
  if (savedTimes.length >= 10) {
    savedTimes.length = 9;
  }

  savedTimes.unshift(currentTimeSeconds);
  updateSavedTimesList();
}

function setCurrentTime(time) {
  if (time >= 60) {
    currentTimeSeconds = 0;
    currentTimeMinutes++;
  } else {
    currentTimeSeconds = time;
  }

  updateCurrentTimeUI();
}

function updateCurrentTimeUI() {
  currentTimeSecondsElement.innerText = currentTimeSeconds;
  currentTimeMinutesElement.innerText = currentTimeMinutes;
}

function updateSavedTimesList() {
  function itemGenerator(item) {
    return `<li>${item}</li>`;
  }
  const itemsElements = savedTimes.map(itemGenerator);
  savedTimesElement.innerHTML = itemsElements.join('');
}

const URL = 'http://localhost:3000/employees';

async function getUsers() {
  const res = await (await fetch(URL)).json();
  console.log(res);
}

async function addUser() {
  await fetch(URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: "John",
      last_name: "Rambo",
      email: 'john.rambo@gmail.com',
    })
  })
}

async function updateUser() {
  await fetch(`${URL}/8`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: "John u",
      last_name: "Rambo",
      email: 'john.rambo@gmail.com',
    })
  })
}

async function deleteUser() {
  await fetch(`${URL}/7`, {
    method: "DELETE",
  })
}