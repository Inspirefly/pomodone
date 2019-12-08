/********/
/* Main */
/********/
let currentTime = document.getElementsByClassName("selected-time")[0];
let timer;
let minutes = 25;
let seconds = 0;
let audio = new Audio("assets/ding.wav");
audio.volume;

let pomos = 0;

let timeStorage = localStorage.getItem('times');
let times;

if (timeStorage) {
  times = JSON.parse(localStorage.getItem('times'));
} else {
  let pomoMin = document.getElementsByName("pomo-min")[0].value;
  let pomoSec = document.getElementsByName("pomo-sec")[0].value;
  let shortMin = document.getElementsByName("short-min")[0].value;
  let shortSec = document.getElementsByName("short-sec")[0].value;
  let longMin = document.getElementsByName("long-min")[0].value;
  let longSec = document.getElementsByName("long-sec")[0].value;

  let sound = true;
  let cycle = false;

  times = { pomoMin, pomoSec, shortMin, shortSec, longMin, longSec, sound, cycle };
  localStorage.setItem('times', JSON.stringify(times));
}

minutes = times.pomoMin;
seconds = times.pomoSec;
document.getElementsByName("pomo-min")[0].value = times.pomoMin;
document.getElementsByName("pomo-sec")[0].value = times.pomoSec;
document.getElementsByName("short-min")[0].value = times.shortMin;
document.getElementsByName("short-sec")[0].value = times.shortSec;
document.getElementsByName("long-min")[0].value = times.longMin;
document.getElementsByName("long-sec")[0].value = times.longSec;
prettyTimes();
document.getElementById("minutes").innerText = times.pomoMin;
document.getElementById("seconds").innerText = times.pomoSec;

audio.volume = times.sound ? 1 : 0;

let logStorage = localStorage.getItem('log');
let log;
let id = 0;

if (logStorage) {
  log = JSON.parse(localStorage.getItem('log'));
} else {
  let stars = 0, id = 0, session = "", length = "", description = "", date = "";
  let entries = [];
  let removedEntries = [];
  log = { stars, entries, removedEntries };
  localStorage.setItem('log', JSON.stringify(log));
}

document.getElementById("pomo-time").addEventListener("click", () => {
  minutes = times.pomoMin;
  seconds = times.pomoSec;

  display_time();

  currentTime = document.getElementById("pomo-time");
  document.getElementById("pomo-time").classList.add("selected-time");
  document.getElementById("short-time").classList.remove("selected-time");
  document.getElementById("long-time").classList.remove("selected-time");
});

document.getElementById("short-time").addEventListener("click", () => {
  minutes = times.shortMin;
  seconds = times.shortSec;

  display_time();

  currentTime = document.getElementById("short-time");
  document.getElementById("pomo-time").classList.remove("selected-time");
  document.getElementById("short-time").classList.add("selected-time");
  document.getElementById("long-time").classList.remove("selected-time");
});

document.getElementById("long-time").addEventListener("click", () => {
  minutes = times.longMin;
  seconds = times.longSec;

  display_time();

  currentTime = document.getElementById("long-time");
  document.getElementById("pomo-time").classList.remove("selected-time");
  document.getElementById("short-time").classList.remove("selected-time");
  document.getElementById("long-time").classList.add("selected-time");
});

document.getElementById("clock").addEventListener("click", () => {
  toggleTimerOn();
});

document.getElementById("play-pause").addEventListener("click", () => {
  toggleTimerOn();
});

document.getElementById("reset").addEventListener("click", resetTime);

/************/
/* Settings */
/************/
document.getElementById("open-settings").addEventListener("click", () => {
  let settings = document.getElementById("settings");
  settings.style.height = "50vh";
  settings.style.width = "50vw";
  settings.style.top = "10em";
  settings.style.left = "";
  settings.style.display = "grid";
  settings.style.zIndex = 1;
  document.getElementById("log").style.zIndex = 0;

  /*********/
  /* Sound */
  /*********/
  if (times.sound) {
    document.getElementById("sound").classList.add("checked");
  } else {
    document.getElementById("sound").classList.remove("checked");
  }

  /*********/
  /* Cycle */
  /*********/
  if (times.cycle) {
    document.getElementById("cycle").classList.add("checked");
  } else {
    document.getElementById("cycle").classList.remove("checked");
  }
});

document.getElementById("settings").addEventListener("click", () => {
  document.getElementById("settings").style.zIndex = 1;
  document.getElementById("log").style.zIndex = 0;
});

dragElement(document.getElementById("settings"));

document.getElementById("settings-confirm").addEventListener("click", () => {
  // Times
  let valid = true;

  let tempPomoMin = document.getElementsByName("pomo-min")[0].value;
  let tempPomoSec = document.getElementsByName("pomo-sec")[0].value;
  let tempShortMin = document.getElementsByName("short-min")[0].value;
  let tempShortSec = document.getElementsByName("short-sec")[0].value;
  let tempLongMin = document.getElementsByName("long-min")[0].value;
  let tempLongSec = document.getElementsByName("long-sec")[0].value;

  if ((!Number.isNaN(tempPomoMin) && tempPomoMin >= 0) &&
    (!Number.isNaN(tempPomoSec) && tempPomoSec >= 0 && tempPomoSec < 60) &&
    (!Number.isNaN(tempShortMin) && tempShortMin >= 0) &&
    (!Number.isNaN(tempShortSec) && tempShortSec >= 0 && tempShortSec < 60) &&
    (!Number.isNaN(tempLongMin) && tempLongMin >= 0) &&
    (!Number.isNaN(tempLongSec) && tempLongSec >= 0 && tempLongSec < 60) &&
    (tempPomoMin != 0 || tempPomoSec != 0) &&
    (tempShortMin != 0 || tempShortSec != 0) &&
    (tempLongMin != 0 || tempLongSec != 0))
    valid = true;
  else
    valid = false;

  if (valid) {
    times.pomoMin = tempPomoMin;
    times.pomoSec = tempPomoSec;
    times.shortMin = tempShortMin;
    times.shortSec = tempShortSec;
    times.longMin = tempLongMin;
    times.longSec = tempLongSec;
  } else {
    alert("Value must be a number\nSeconds must be less than 60 and greater than 0");
    return;
  }

  prettyTimes();
  times.pomoMin = document.getElementsByName("pomo-min")[0].value;
  times.pomoSec = document.getElementsByName("pomo-sec")[0].value;
  times.shortMin = document.getElementsByName("short-min")[0].value;
  times.shortSec = document.getElementsByName("short-sec")[0].value;
  times.longMin = document.getElementsByName("long-min")[0].value;
  times.longSec = document.getElementsByName("long-sec")[0].value;

  // Sound
  if (document.getElementById("sound").classList.contains("checked")) {
    times.sound = true;
    audio.volume = 1;
  } else {
    times.sound = false;
    audio.volume = 0;
  }

  // Cycle
  if (document.getElementById("cycle").classList.contains("checked")) {
    times.cycle = true;
  } else {
    times.cycle = false;
    pomos = 0;
  }

  localStorage.setItem('times', JSON.stringify(times));
  document.getElementById("settings-exit").parentNode.parentNode.style.display = "none";
  resetTime();
  display_time();
});

document.getElementById("settings-exit").addEventListener("click", () => {
  document.getElementById("settings-exit").parentNode.parentNode.style.display = "none";
});

const checkboxes = document.getElementsByClassName("checkbox");
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", () => {
    checkboxes[i].classList.toggle("checked");
  });
}


/*******/
/* Log */
/*******/
document.getElementById("open-log").addEventListener("click", () => {
  let logEl = document.getElementById("log");

  if (logEl.style.display == "none" || getComputedStyle(logEl).display == "none") {
    document.getElementById("stars").innerHTML = "";
    while (document.getElementById("stars").childNodes.length < log.stars) {
      document.getElementById("stars").innerHTML += '<img src="assets/star.png" class="fas fa-star">';
    }

    document.getElementById("logs").innerHTML =
      `<div id="log-heading">
        <p>Session</p>
        <p>Length</p>
        <p>Date</p>
        <p>Description</p>
      </div>`;

    for (let i = 0; i < log.entries.length; i++) {
      let found = false;

      for (let j = 0; j < log.removedEntries.length; j++) {
        if (JSON.stringify(log.entries[i]) == JSON.stringify(log.removedEntries[j])) {
          found = true;
          break;
        }
      }

      if (!found) {
        document.getElementById("logs").innerHTML +=
          `<div class="entry" data-id="${log.entries[i].id}">
          <p class="session">${log.entries[i].session}</p>
          <p class="length">${log.entries[i].length}</p>
          <p class="date">${log.entries[i].date}</p>
          <input class="description" type="text" placeholder="Type Here" value="${log.entries[i].description}" onchange="updateDesc(this)">
          <img src="assets/exit.png" class="fas fa-times exit log-close" onclick="removeEntry(this)"/>
        </div>`;
      }
    }
  }

  logEl.style.height = "50vh";
  logEl.style.width = "50vw";
  logEl.style.top = "10em";
  logEl.style.left = "";
  logEl.style.display = "grid";
  logEl.style.zIndex = 1;
  document.getElementById("settings").style.zIndex = 0;
});

document.getElementById("log").addEventListener("click", () => {
  document.getElementById("log").style.zIndex = 1;
  document.getElementById("settings").style.zIndex = 0;
});

dragElement(document.getElementById("log"));

function updateDesc(el) {
  log.entries[el.parentNode.dataset.id].description = el.value;
  localStorage.setItem('log', JSON.stringify(log));
}

function removeEntry(el) {
  el.parentNode.className += " hidden";

  log.removedEntries.push(log.entries[el.parentNode.dataset.id]);

  if (log.entries[el.parentNode.dataset.id].session == "Pomodoro")
    log.stars -= 1;

  localStorage.setItem('log', JSON.stringify(log));

  document.getElementById("log-exit").click();
  document.getElementById("open-log").click();
}

document.getElementById("log-exit").addEventListener("click", () => {
  document.getElementById("log-exit").parentNode.parentNode.style.display = "none";
});

document.querySelector(".fa-trash-alt").addEventListener("click", () => {
  pomos = 0;
  log.stars = 0;
  log.entries = [];
  log.removedEntries = [];
  id = 0;
  localStorage.removeItem('log');
  document.getElementById("logs").innerHTML =
    `<div id="log-heading">
      <p>Session</p>
      <p>Length</p>
      <p>Date</p>
      <p>Description</p>
    </div>`;

  document.getElementById("stars").innerHTML = "";
});

/*************/
/* Functions */
/*************/
function countDown() {
  display_time();

  seconds -= 1;

  if (seconds == -1) {
    minutes -= 1;
    seconds = 59;
  }

  if (minutes == -1) {
    toggleTimerOn();
    audio.play();

    let session, length, description, date;

    // Add entry to log
    switch (currentTime.id) {
      case "pomo-time":
        // Add star
        document.getElementById("stars").innerHTML += '<img src="assets/star.png" class="fas fa-star">';
        log.stars += 1;
        localStorage.setItem('log', JSON.stringify(log));

        session = "Pomodoro";
        length = times.pomoMin + ":" + times.pomoSec;
        break;
      case "short-time":
        session = "Short Break";
        length = times.shortMin + ":" + times.shortSec;
        break;
      case "long-time":
        session = "Long Break";
        length = times.longMin + ":" + times.longSec;
        break;
    }

    description = "";

    let options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    date = new Date().toLocaleDateString('en-US', options);

    let entry = { id, session, length, description, date };
    id++;
    log.entries.push(entry);
    localStorage.setItem('log', JSON.stringify(log));

    document.getElementById("logs").innerHTML +=
      `<div class="entry" date-id="${id}">
        <p class="session">${session}</p>
        <p class="length">${length}</p>
        <p class="date">${date}</p>
        <input class="description" type="text" placeholder="Type Here" value="${description}" onchange="updateDesc()">
        <img src="assets/exit.png" class="fas fa-times exit log-close" onclick="removeEntry(this)"/>
      </div>`

    // Handle cycle
    if (times.cycle) {
      switch (currentTime.id) {
        case "pomo-time":
          if (pomos < 3) {
            pomos += 1;
            document.getElementById("short-time").click();
          } else {
            pomos = 0;
            document.getElementById("long-time").click();
          }
          break;
        case "short-time":
        case "long-time":
          document.getElementById("pomo-time").click();
          break
      }
      document.getElementById("play-pause").click();
    } else {
      pomos = 0;
    }
  }
}

function display_time() {
  if (minutes < 10)
    document.getElementById("minutes").innerText = "0" + Number(minutes);
  else
    document.getElementById("minutes").innerText = Number(minutes);

  if (seconds < 10)
    document.getElementById("seconds").innerText = "0" + Number(seconds);
  else
    document.getElementById("seconds").innerText = Number(seconds);

  document.title = "Pomodone (" + document.getElementById("minutes").innerText + ":" + document.getElementById("seconds").innerText + ")";
}

function dragElement(element) {
  let startX = 0, startY = 0, endX = 0, endY = 0;
  document.getElementById(element.id + "-header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    endX = startX - e.clientX;
    endY = startY - e.clientY;
    startX = e.clientX;
    startY = e.clientY;
    element.style.left = (element.offsetLeft - endX) + "px";
    element.style.top = (element.offsetTop - endY) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function prettyTimes() {
  if (times.pomoMin < 10)
    document.getElementsByName("pomo-min")[0].value = "0" + Number(times.pomoMin);
  else
    document.getElementsByName("pomo-min")[0].value = Number(times.pomoMin);
  if (times.pomoSec < 10)
    document.getElementsByName("pomo-sec")[0].value = "0" + Number(times.pomoSec);
  else
    document.getElementsByName("pomo-sec")[0].value = Number(times.pomoSec);

  if (times.shortMin < 10)
    document.getElementsByName("short-min")[0].value = "0" + Number(times.shortMin);
  else
    document.getElementsByName("short-min")[0].value = Number(times.shortMin);
  if (times.shortSec < 10)
    document.getElementsByName("short-sec")[0].value = "0" + Number(times.shortSec);
  else
    document.getElementsByName("short-sec")[0].value = Number(times.shortSec);

  if (times.longMin < 10)
    document.getElementsByName("long-min")[0].value = "0" + Number(times.longMin);
  else
    document.getElementsByName("long-min")[0].value = Number(times.longMin);
  if (times.longSec < 10)
    document.getElementsByName("long-sec")[0].value = "0" + Number(times.longSec);
  else
    document.getElementsByName("long-sec")[0].value = Number(times.longSec);
}

function resetTime() {
  if (document.getElementById("pomo-time").classList.contains("selected-time")) {
    minutes = times.pomoMin;
    seconds = times.pomoSec;
    display_time();
  } else if (document.getElementById("short-time").classList.contains("selected-time")) {
    minutes = times.shortMin;
    seconds = times.shortSec;
    display_time();
  } else {
    minutes = times.longMin;
    seconds = times.longSec;
    display_time();
  }
}

function toggleTimerOn() {
  let timerClassList = document.getElementById("timer").classList;
  timerClassList.toggle("on");

  let playPauseClassList = document.getElementById("play-pause").classList;

  if (minutes != -1 && timerClassList.contains("on")) {
    timer = setInterval(countDown, 1000);
    playPauseClassList.remove("fa-play");
    playPauseClassList.add("fa-pause");
    document.getElementById("play-pause").src = "assets/pause.png";
  } else {
    playPauseClassList.remove("fa-pause");
    playPauseClassList.add("fa-play");
    document.getElementById("play-pause").src = "assets/play.png";
    clearInterval(timer);
  }
}
