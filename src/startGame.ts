import {
  showNextQuestion,
  initializeAutoNextQuestion,
} from "./randomizeQuestions";
import { startTimer } from "./timer";

// Function to start the game
export function createStartGameButton(): HTMLButtonElement {
  // Create the "Start Game" button
  const startGameButton = document.createElement("button");
  startGameButton.id = "start-game-btn";
  startGameButton.textContent = "Start Game";
  startGameButton.classList.add("start-game-btn");
  startGameButton.ariaLabel = "Start Game";

  // Event listener for the "Start Game" button
  startGameButton.addEventListener("click", handleStartGame);

  return startGameButton;
}

export function handleStartGame(): void {
  console.log("🎉Game started!🎉");
  startTimer(); // Start the timer when the button is clicked

  // Load the first question data
  const radioButtons = document.querySelectorAll(
    'input[type="radio"]',
  ) as NodeListOf<HTMLInputElement>;
  showNextQuestion(radioButtons); // Preload the first question

  // DOM Elements to animate
  const startGameButton = document.getElementById(
    "start-game-btn",
  ) as HTMLButtonElement;
  const welcomeMessage = document.getElementById("welcome") as HTMLElement;
  const option1Label = document.querySelector(
    'label[for="option1"]',
  ) as HTMLElement;
  const option2Label = document.querySelector(
    'label[for="option2"]',
  ) as HTMLElement;
  const option3Label = document.querySelector(
    'label[for="option3"]',
  ) as HTMLElement;

  const questionPhrase = document.getElementById("question") as HTMLElement;
  const flagImage = document.querySelector(".flag") as HTMLElement;
  const flagsIcon = document.getElementById("flags-icon") as HTMLElement;
  const timer = document.getElementById("timer") as HTMLElement;
  const footer = document.querySelector(".footer") as HTMLElement;

  // Add fade-out animation to the Start Game button and welcome message
  startGameButton?.classList.add("fade-out");
  welcomeMessage?.classList.add("fade-out");
  flagsIcon?.classList.add("fade-out");

  // After fade-out completes, hide the Start Game button and welcome message
  setTimeout(() => {
    startGameButton.style.display = "none";
    welcomeMessage.style.display = "none";
    flagsIcon.style.display = "none";

    // Fade in the question, flag and alternatives
    option1Label.style.display = "block";
    option2Label.style.display = "block";
    option3Label.style.display = "block";
    questionPhrase.style.display = "block";
    flagImage.style.display = "flex";
    timer.style.display = "flex";
    footer.style.display = "flex";

    option1Label.classList.add("fade-in");
    option2Label.classList.add("fade-in");
    option3Label.classList.add("fade-in");
    questionPhrase.classList.add("fade-in");
    flagImage.classList.add("fade-in");
    timer.classList.add("fade-in");
    footer.classList.add("fade-in");

    // Fetch and display the first question
    setTimeout(() => {
      option1Label.classList.remove("fade-in");
      option2Label.classList.remove("fade-in");
      option3Label.classList.remove("fade-in");
      questionPhrase.classList.remove("fade-in");
      flagImage.classList.remove("fade-in");
      timer.classList.remove("fade-in");

      initializeAutoNextQuestion(radioButtons); // Set up event listeners
    }, 400); // Match the fade-in duration
  }, 400); // Match the fade-out duration
}
