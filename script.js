/* Main */
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

/* Settings */
document.getElementById("open-settings").addEventListener("click", () => {
    let settings = document.getElementById("settings"); 
    settings.style.height = "50vh";
    settings.style.width = "50vw";
    settings.style.top = "25vh";
    settings.style.left = "25vw";
    settings.style.display = "inline-block";
})

dragElement(document.getElementById("settings"));

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
        document.getElementById("minutes").innerText = "0" + minutes;
    else
        document.getElementById("minutes").innerText = minutes;

    if (seconds < 10)
        document.getElementById("seconds").innerText = "0" + seconds;
    else
        document.getElementById("seconds").innerText = seconds;

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
