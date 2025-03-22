document.addEventListener("DOMContentLoaded", () => {
    const timerForm = document.getElementById("timer-form");
    const timersContainer = document.getElementById("timers-container");
    const alarmSound = new Audio("alarm.mp3"); // Ensure you have an alarm sound file
    let timers = [];
  
    timerForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const hours = parseInt(document.getElementById("hours").value) || 0;
      const minutes = parseInt(document.getElementById("minutes").value) || 0;
      const seconds = parseInt(document.getElementById("seconds").value) || 0;
      
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds <= 0) return;
  
      const timerId = Date.now();
      const timerElement = document.createElement("div");
      timerElement.classList.add("timer");
      timerElement.setAttribute("data-id", timerId);
  
      timerElement.innerHTML = `
        <span class="time-display">${formatTime(totalSeconds)}</span>
        <button class="stop-btn">Stop Timer</button>
      `;
  
      timersContainer.appendChild(timerElement);
  
      const timer = {
        id: timerId,
        element: timerElement,
        remainingTime: totalSeconds,
        interval: setInterval(() => updateTimer(timer), 1000),
      };
  
      timers.push(timer);
    });
  
    function updateTimer(timer) {
      if (timer.remainingTime <= 0) {
        clearInterval(timer.interval);
        timer.element.innerHTML = `<span class="ended">Time's Up!</span>`;
        alarmSound.play();
        return;
      }
  
      timer.remainingTime--;
      timer.element.querySelector(".time-display").textContent = formatTime(timer.remainingTime);
    }
  
    timersContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("stop-btn")) {
        const timerElement = e.target.parentElement;
        const timerId = parseInt(timerElement.getAttribute("data-id"));
        stopTimer(timerId);
      }
    });
  
    function stopTimer(timerId) {
      timers = timers.filter((timer) => {
        if (timer.id === timerId) {
          clearInterval(timer.interval);
          timer.element.remove();
          return false;
        }
        return true;
      });
    }
  
    function formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  });
  