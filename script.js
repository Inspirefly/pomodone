let timer;
let minutes = 0;
let seconds = 03;
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
        clearInterval(timer);
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

    if (minutes == -1);
    else if (timerClassList.contains("on")) {
        timer = setInterval(countDown, 1000);
        playPauseClassList.remove("fa-play");
        playPauseClassList.add("fa-pause");
    } else {
        playPauseClassList.remove("fa-pause");
        playPauseClassList.add("fa-play");
        clearInterval(timer);
    }
}
