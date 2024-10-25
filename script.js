const timeDisplay = document.querySelector('.time-display');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const minutesInput = document.getElementById('minutes-input');
const alarmSound = document.getElementById('alarm-sound');

let countdown;
let totalTime = 0;
let remainingTime = 0;

startBtn.addEventListener('click', () => {
    let userTime = minutesInput.value;
    if (userTime !== null && userTime > 0) {
        totalTime = parseInt(userTime) * 60;
        remainingTime = totalTime;
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    countdown = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
            updateCircle();
        } else {
            clearInterval(countdown);
            alarmSound.play();
        }
    }, 1000);
}

function updateDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timeDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateCircle() {
    let percentage = (totalTime - remainingTime) / totalTime;
    let angle = percentage * 360;
    document.querySelector('.timer-circle').style.background = 
        `conic-gradient(#00f ${angle}deg, transparent 0deg)`;
}

function resetTimer() {
    clearInterval(countdown);
    remainingTime = 0;
    totalTime = 0;
    timeDisplay.textContent = '00:00';
    document.querySelector('.timer-circle').style.background = 
        'conic-gradient(#00f 0deg, transparent 0deg)';
    minutesInput.value = '';
}
