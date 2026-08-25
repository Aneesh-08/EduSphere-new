let timer = document.querySelector(".timer");
let startButton = document.querySelector(".start")
let pauseButton = document.querySelector(".pause")
let resetButton = document.querySelector(".reset");
let settingsButton = document.querySelector(".settings-button")
let settingsPanel = document.querySelector(".settings-panel");
let closeSettings = document.querySelector(".close-settings");
let focusInput = document.querySelector("#focus-time");
let breakInput = document.querySelector("#break-time");
let saveSettings = document.querySelector(".save-settings");
let settingsError = document.querySelector(".settings-error");
let sessionCount = document.querySelector(".session-count");
let timerMode = document.querySelector(".timer-mode");
let starsTheme = document.querySelector(".stars-theme");
let oceanTheme = document.querySelector(".ocean-theme");
let resetSessionsButton = document.querySelector(".reset-sessions");
let stars = document.querySelector(".stars")
let ocean = document.querySelector(".ocean");
let totalSeconds = 1500;
let focusMinutes = 25;
let breakMinutes = 5;
let mode = "focus";
let interval

let running = false
let completedSessions = 0;
startButton.addEventListener("click",function(){
    if(running==false){
    interval= setInterval(function(){
    totalSeconds -= 1;
    
    
    if(totalSeconds <= 0){
    totalSeconds = 0;
    if(mode == "focus"){
        mode = "break";
        totalSeconds = breakMinutes * 60;
        timerMode.textContent = "On Break";
        completedSessions += 1;
        sessionCount.textContent = "Completed Sessions: " + completedSessions;
        localStorage.setItem("completedSessions", completedSessions);
        clearInterval(interval);
        running = false;
    }
    else{
        mode = "focus";
        totalSeconds = focusMinutes * 60;
        timerMode.textContent = "Focus Session";
        clearInterval(interval);
        running = false;
    }

}
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    if(seconds < 10){
        seconds = "0" + seconds;
    }

    timer.textContent = minutes + ":" + seconds;
}, 1000);
        running = true
    }
})

pauseButton.addEventListener("click", function(){
    clearInterval(interval);
    running = false;
});

resetButton.addEventListener("click",function(){
    clearInterval(interval);
    totalSeconds = focusMinutes * 60;
    mode = "focus";
    timer.textContent = focusMinutes + ":00";
    timerMode.textContent = "Focus Session";
    running = false;
});

settingsButton.addEventListener("click", function(){
    settingsPanel.style.display = "block";
})

closeSettings.addEventListener("click", function(){
    settingsPanel.style.display = "none";
});

saveSettings.addEventListener("click", function(){
    
    focusMinutes = Number(focusInput.value);
    breakMinutes = Number(breakInput.value);
    localStorage.setItem("focusMinutes", focusMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);
    if(focusMinutes < 1 || focusMinutes > 120){
        settingsError.textContent = "Focus time must be between 1 and 120 minutes.";
        return;
    }
    if(breakMinutes < 1 || breakMinutes > 60){
    settingsError.textContent = "Break time must be between 1 and 60 minutes.";
    return;
    }
    settingsError.textContent = "";

    clearInterval(interval);
    running = false;
    totalSeconds = focusMinutes * 60;
    timer.textContent = focusMinutes + ":00";
})

starsTheme.addEventListener("click", function(){
    document.body.style.background = "#0f172a";
    stars.style.display = "block";
    ocean.style.display = "none";
    localStorage.setItem("theme", "stars");
})

oceanTheme.addEventListener("click", function(){
    document.body.style.background = "#89CFF0";
    stars.style.display = "none";
    ocean.style.display = "block";
    localStorage.setItem("theme", "ocean");
})

let savedTheme = localStorage.getItem("theme");

if(savedTheme == "ocean"){
    document.body.style.background = "#89CFF0";
    stars.style.display = "none";
    ocean.style.display = "block";
}
else if(savedTheme == "stars"){
    document.body.style.background = "#0f172a";
    stars.style.display = "block";
    ocean.style.display = "none";
}

let savedFocus = localStorage.getItem("focusMinutes");
let savedBreak = localStorage.getItem("breakMinutes");

if(savedFocus != null){
    focusMinutes = Number(savedFocus);
    focusInput.value = focusMinutes;
}

if(savedBreak != null){
    breakMinutes = Number(savedBreak);
    breakInput.value = breakMinutes;
}

totalSeconds = focusMinutes * 60;
timer.textContent = focusMinutes + ":00";

let savedSessions = localStorage.getItem("completedSessions");

if(savedSessions != null){
    completedSessions = Number(savedSessions);
    sessionCount.textContent = "Completed Sessions: " + completedSessions;
}

resetSessionsButton.addEventListener("click", function(){

    completedSessions = 0;

    sessionCount.textContent = "Completed Sessions: 0";

    localStorage.setItem("completedSessions", completedSessions);
});
