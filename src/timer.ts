let timerInterval: number | null = null;
export let elapsedSeconds = 0;

/**
 * Starts the timer and updates the value in the element with ID "timer".
 */
export function startTimer(): void {
  const timerDisplay = document.getElementById("timer");
  if (!timerDisplay) {
    console.error('Element with ID "timer" not found.');
    return;
  }

  // Reset the previous interval and initialize the counter
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  elapsedSeconds = 0;
  timerDisplay.textContent = formatTime(elapsedSeconds);

  // Start the interval to update time
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    timerDisplay.textContent = formatTime(elapsedSeconds);
  }, 1000);
}

/**
 * Stops the timer.
 */
export function stopTimer(): void {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Trigger updating the results when the timer stops
  updateResultsOnStop();
}

/**
 * Resets the timer.
 */
export function resetTimer(): void {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  elapsedSeconds = 0;
  const timerDisplay = document.getElementById("timer");
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(elapsedSeconds);
  }
  console.log("♻️Timer reset.");
}

/**
 * Formats time as "MM:SS".
 * @param seconds - The number of seconds elapsed.
 * @returns A formatted time string.
 */
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Calls the function to update the score container when the timer stops.
 */
function updateResultsOnStop(): void {
  import("./result").then((module) => {
    module.updateScoreContainer();
  });
}
