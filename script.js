
    const timeDisplay = document.querySelector('.time-display');
    const startBtn = document.querySelector('.start-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const minutesInput = document.getElementById('minutes-input');
    const alarmSound = document.getElementById('alarm-sound');

    let countdown;
    let totalTime = 0;
    let remainingTime = 0;
    let isPaused = false; 

    startBtn.addEventListener('click', () => {
        let userTime = minutesInput.value;
        if (userTime !== null && userTime > 0 && !countdown) { 
            totalTime = parseInt(userTime) * 60;
            remainingTime = totalTime;
            startTimer();
            startBtn.disabled = true; 
        }
    });

    pauseBtn.addEventListener('click', () => {
        if (isPaused) {
            startTimer(); 
            pauseBtn.textContent = 'Pause';
            isPaused = false;
        } else {
            clearInterval(countdown); 
            pauseBtn.textContent = 'Resume';
            isPaused = true;
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
                playAlarm();  
            }
        }, 5000);
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

    function playAlarm() {
        alarmSound.play();
        
        setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0; 
        }, 10000); 
    }

    function resetTimer() {
        clearInterval(countdown);
        countdown = null; 
        remainingTime = 0;
        totalTime = 0;
        isPaused = false;
        timeDisplay.textContent = '00:00';
        document.querySelector('.timer-circle').style.background = 
            'conic-gradient(#00f 0deg, transparent 0deg)';
        minutesInput.value = '';
        pauseBtn.textContent = 'Pause';
        startBtn.disabled = false; 
        alarmSound.pause(); 
        alarmSound.currentTime = 0; 
    }
