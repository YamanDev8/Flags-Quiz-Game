import "./main.scss";
import { restartGame } from "./playAgainLogic";
import { createStartGameButton } from "./startGameButtonLogic";
import { initializeAutoNextQuestion } from "./nextQuestionLogic";
import { updateScoreContainer } from "./result";
import { setupLabelKeyboardEvents } from "./a11y";

//================================================================================================
// Get all the radio buttons for the quiz
const radioButtons = document.querySelectorAll(
  'input[name="quiz"]',
) as NodeListOf<HTMLInputElement>;
// Initialize the logic for showing the next question when an answer is selected
initializeAutoNextQuestion(radioButtons);

//================================================================================================
// Add the "Start Game" button to the document

const startGameButton = createStartGameButton();
document.body.appendChild(startGameButton);

//================================================================================================
// Add event listener to the "Play Again" button

const playAgainButton = document.getElementById("play-again-btn");
if (playAgainButton) {
  playAgainButton.addEventListener("click", () => restartGame());
}
// ===============================================================================
// After the quiz is finished, update the result container
updateScoreContainer();
// Call the function to set up label keyboard events
setupLabelKeyboardEvents();
// Update the score container manually (if needed)
updateScoreContainer();
// ===============================================================================
