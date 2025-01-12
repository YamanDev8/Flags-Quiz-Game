import { elapsedSeconds } from "./timer"; // Import elapsedSeconds from the timer module

export interface IResult {
  points: number;
  time: number; // Time in seconds
}

export const score: IResult = {
  points: 0,
  time: 0, // Initialize the time to 0
};

// Function to add points for correct answers
export function addPoints(): void {
  score.points += 1; // Increment points by 1
}

// Function to reset the score
export function resetScore(): void {
  score.points = 0;
  console.log("♻️Score reset.");
}

// Function to update the Result container
export function updateScoreContainer(): void {
  // Update score.time with the current elapsed time from the timer
  score.time = elapsedSeconds; // Assign the value of elapsedSeconds to score.time

  const resultContainer = document.querySelector("#result") as HTMLElement;

  if (resultContainer) {
    resultContainer.innerHTML = `
      <h2>Results</h2>
      <p><strong>Points:</strong> ${score.points}/10</p>
      <p><strong>Time:</strong>  ${formatTime(score.time)}</p> 
    `;
  } else {
    console.error("Result container not found");
  }
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
