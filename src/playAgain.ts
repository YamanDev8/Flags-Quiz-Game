import { resetClickCount } from "./gameStatus";
import { resetTimer } from "./timer";
// import { handleStartGame } from "./startGameButton&Logic";
import { resetFooterProgress } from "./footer";
import { resetQuestionGenerator } from "./randomizeQuestions";
import { resetRadioButton } from "./randomizeQuestions";
import { resetScore } from "./result";

// Function to restart the game quiz
export function restartGame(): void {
  console.log("Play Again! ▶️");
  // Reset game state
  resetClickCount();
  // Reset the timer
  resetTimer();
  // Reset the question generator to clear the used questions
  resetQuestionGenerator();
  // Reset the footer progress bar and counter
  resetFooterProgress();
  // Reset the score
  resetScore();
  // Reset the radio buttons
  const radioButtons = document.querySelectorAll(
    'input[type="radio"]',
  ) as NodeListOf<HTMLInputElement>;
  radioButtons.forEach(resetRadioButton);
  console.log("♻️Radio buttons reset.");

  // DOM elements
  const gameOverSection = document.getElementById("game-over") as HTMLElement;
  const footer = document.querySelector(".footer") as HTMLElement;

  // Hide game elements with fade-out effect
  gameOverSection.classList.add("fade-out");
  footer.classList.add("fade-out");

  setTimeout(() => {
    gameOverSection.style.display = "none";
    footer.style.display = "none";

    // Show welcome message and start game button with fade-in effect
    const startGameButton = document.getElementById(
      "start-game-btn",
    ) as HTMLButtonElement;
    const welcomeMessage = document.getElementById("welcome") as HTMLElement;
    const flagsIcon = document.getElementById("flags-icon") as HTMLElement;

    startGameButton.style.display = "block";
    welcomeMessage.style.display = "block";
    flagsIcon.style.display = "block";

    startGameButton.classList.add("fade-in");
    welcomeMessage.classList.add("fade-in");
    flagsIcon.classList.add("fade-in");
  }, 300); // Match the transition duration
  // handleStartGame();
}
