let timer;
let minutes = 25;
let seconds = 00;

document.getElementById("timer").addEventListener("click", () => {
    let timerClassList = document.getElementById("timer").classList;
    timerClassList.toggle("on");

    if (minutes == -1);
    else if (timerClassList.contains("on"))
        timer = setInterval(countDown, 1000);
    else
        clearInterval(timer);
});

function countDown() {
    if (minutes < 10)
        document.getElementById("minutes").innerText = "0" + minutes;
    else
        document.getElementById("minutes").innerText = minutes;
    if (seconds < 10)
        document.getElementById("seconds").innerText = "0" + seconds;
    else
        document.getElementById("seconds").innerText = seconds;
    
    seconds -= 1;

    if (seconds == -1)
    {
        minutes -= 1;
        seconds = 59;
    }
    
    if (minutes == -1)
    {
        clearInterval(timer);
    }   
}