/* Main */
let timer;
let minutes = 25;
let seconds = 0;
let audio = new Audio("assets/ding.wav");
audio.volume = 1;

let pomoMin = document.getElementsByName("pomo-min")[0].value;
let pomoSec = document.getElementsByName("pomo-sec")[0].value;
let shortMin = document.getElementsByName("short-min")[0].value;
let shortSec = document.getElementsByName("short-sec")[0].value;
let longMin = document.getElementsByName("long-min")[0].value;
let longSec = document.getElementsByName("long-sec")[0].value;

document.getElementById("pomo-time").addEventListener("click", () => {
    minutes = pomoMin;
    seconds = pomoSec;

    display_time();

    document.getElementById("pomo-time").classList.add("selected-time");
    document.getElementById("short-time").classList.remove("selected-time");
    document.getElementById("long-time").classList.remove("selected-time");
});

document.getElementById("short-time").addEventListener("click", () => {
    minutes = shortMin;
    seconds = shortSec;

    display_time();

    document.getElementById("pomo-time").classList.remove("selected-time");
    document.getElementById("short-time").classList.add("selected-time");
    document.getElementById("long-time").classList.remove("selected-time");
});

document.getElementById("long-time").addEventListener("click", () => {
    minutes = longMin;
    seconds = longSec;

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

document.getElementById("reset").addEventListener("click", resetTime);

/* Settings */
document.getElementById("open-settings").addEventListener("click", () => {
    let settings = document.getElementById("settings"); 
    settings.style.height = "50vh";
    settings.style.width = "50vw";
    settings.style.top = "25vh";
    settings.style.left = "25vw";
    settings.style.display = "grid";
    prettyTimes();
});

dragElement(document.getElementById("settings"));

document.getElementById("settings-confirm").addEventListener("click", () => {
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
    (!Number.isNaN(tempLongSec) && tempLongSec >= 0 && tempLongSec < 60))
        valid = true;
    else
        valid = false;

    if (valid) {
        pomoMin = tempPomoMin;
        pomoSec = tempPomoSec;
        shortMin = tempShortMin;
        shortSec = tempShortSec;
        longMin = tempLongMin;
        longSec = tempLongSec;
    } else {
        alert("Value must be a number and seconds less than 60.");
    }

    document.getElementById("settings-exit").parentNode.parentNode.style.display = "none";
    resetTime();
    display_time();
});

document.getElementById("settings-exit").addEventListener("click", () => {
    document.getElementById("settings-exit").parentNode.parentNode.style.display = "none";
});

/* Functions */
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
    if (pomoMin < 10)
        document.getElementsByName("pomo-min")[0].value = "0" + Number(pomoMin);
    else
        document.getElementsByName("pomo-min")[0].value =  Number(pomoMin);
    if (pomoSec < 10)
        document.getElementsByName("pomo-sec")[0].value = "0" + Number(pomoSec);
    else
        document.getElementsByName("pomo-sec")[0].value = Number(pomoSec);

    if (shortMin < 10)
        document.getElementsByName("short-min")[0].value = "0" + Number(shortMin);
    else
        document.getElementsByName("short-min")[0].value =  Number(shortMin);
    if (shortSec < 10)
        document.getElementsByName("short-sec")[0].value = "0" + Number(shortSec);
    else
        document.getElementsByName("short-sec")[0].value = Number(shortSec);

    if (longMin < 10)
        document.getElementsByName("long-min")[0].value = "0" + Number(longMin);
    else
        document.getElementsByName("long-min")[0].value =  Number(longMin);
    if (longSec < 10)
        document.getElementsByName("long-sec")[0].value = "0" + Number(longSec);
    else
        document.getElementsByName("long-sec")[0].value = Number(longSec);
}

function resetTime() {
    if (document.getElementById("pomo-time").classList.contains("selected-time")) {
        minutes = pomoMin;
        seconds = pomoSec;
        display_time();
    } else if (document.getElementById("short-time").classList.contains("selected-time")) {
        minutes = shortMin;
        seconds = shortSec;
        display_time();
    } else {
        minutes = longMin;
        seconds = longSec;
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
    } else {
        playPauseClassList.remove("fa-pause");
        playPauseClassList.add("fa-play");
        clearInterval(timer);
    }
}
