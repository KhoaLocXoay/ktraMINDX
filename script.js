class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.running = false;
    this.elapsedTime = 0;
    this.timerInterval = null;
    this.clockElement = null;
  }

  start(clockId) {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime;
      this.running = true;
      this.timerInterval = setInterval(() => this.updateClock(clockId), 10);
    }
  }

  reset(clockId) {
    if (this.clockElement && this.clockElement.id === `clock${clockId}`) {
      if (this.running) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.running = false;
      }
      this.startTime = Date.now();
      this.elapsedTime = 0;
      this.updateClock(clockId);
    }
  }
  

  pause(clockId) {
    if (this.running && this.clockElement.id === `clock${clockId}`) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.running = false;
    }
  }

  updateClock(clockId) {
    this.clockElement = document.getElementById(`clock${clockId}`);
    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;
    const formattedTime = this.formatTime(this.elapsedTime);
    this.clockElement.textContent = formattedTime;
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsDisplay = Math.floor((milliseconds % 1000) / 10);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(millisecondsDisplay).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
}

let stopwatches = {};

function startTimer(clockId) {
  if (!stopwatches[clockId]) {
    stopwatches[clockId] = new Stopwatch();
  }
  stopwatches[clockId].start(clockId);
}

function resetTimer(clockId) {
  if (stopwatches[clockId]) {
    stopwatches[clockId].reset(clockId);
  }
}

function pauseTimer(clockId) {
  if (stopwatches[clockId]) {
    stopwatches[clockId].pause(clockId);
  }
}

function startAllTimers() {
  for (const stopwatchId in stopwatches) {
    stopwatches[stopwatchId].start(stopwatchId);
  }
}

function resetAllTimers() {
  for (const stopwatchId in stopwatches) {
    stopwatches[stopwatchId].reset(stopwatchId);
  }
}
function pauseAllTimers() {
  for (const stopwatchId in stopwatches) {
    stopwatches[stopwatchId].pause(stopwatchId);
  }
}
