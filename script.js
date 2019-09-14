let timer;
let minutes = 25;
let seconds = 0;
let audio = new Audio("assets/ding.wav");
audio.volume = 1;

document.getElementById("pomo-time").addEventListener("click", () => {
    minutes = 25;
    seconds = 0;

    display_time();

    document.getElementById("pomo-time").classList.add("selected-time");
    document.getElementById("short-time").classList.remove("selected-time");
    document.getElementById("long-time").classList.remove("selected-time");
});

document.getElementById("short-time").addEventListener("click", () => {
    minutes = 5;
    seconds = 0;

    display_time();

    document.getElementById("pomo-time").classList.remove("selected-time");
    document.getElementById("short-time").classList.add("selected-time");
    document.getElementById("long-time").classList.remove("selected-time");
});

document.getElementById("long-time").addEventListener("click", () => {
    minutes = 15;
    seconds = 0;

    display_time();

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

document.getElementById("reset").addEventListener("click", () => {
    if (document.getElementById("pomo-time").classList.contains("selected-time")) {
        minutes = 25;
        seconds = 0;
        display_time();
    } else if (document.getElementById("short-time").classList.contains("selected-time")) {
        minutes = 5;
        seconds = 0;
        display_time();
    } else {
        minutes = 15;
        seconds = 0;
        display_time();
    }
});

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
    }   
}

function display_time() {
    if (minutes < 10)
        document.getElementById("minutes").innerText = "0" + minutes;
    else
        document.getElementById("minutes").innerText = minutes;

    if (seconds < 10)
        document.getElementById("seconds").innerText = "0" + seconds;
    else
        document.getElementById("seconds").innerText = seconds;

    document.title = "Pomodone (" + document.getElementById("minutes").innerText + ":" + document.getElementById("seconds").innerText + ")";
}

function toggleTimerOn() {
    let timerClassList = document.getElementById("timer").classList;
    timerClassList.toggle("on");

    let playPauseClassList = document.getElementById("play-pause").classList;

    if (minutes != -1 && timerClassList.contains("on")) {
        timer = setInterval(countDown, 1000);
        playPauseClassList.remove("fa-play");
        playPauseClassList.add("fa-pause");
    } else {
        playPauseClassList.remove("fa-pause");
        playPauseClassList.add("fa-play");
        clearInterval(timer);
    }
}

/* w3schools draggle element */
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/* Settings */
dragElement(document.getElementById("settings"));
