import { IQuestion, questions } from "./questionsData";
import { updateFooterProgress, setTotalQuestions } from "./footer";
import { validateAnswer } from "./answerValidation";
import { stopTimer } from "./timer";
import { handleEndGame } from "./finishGameLogic";
import { addPoints } from "./result";

let currentQuestion: IQuestion | null = null;

/// Function to create a generator for random questions
function createQuestionGenerator() {
  let usedIndices: number[] = [];
  const maxQuestions = 10; // Limit to 10 questions

  // Set the total questions in the footer
  setTotalQuestions(maxQuestions);

  // Function to reset the usedIndices array
  function resetGenerator() {
    usedIndices = [];
    console.log("♻️Questions array reset");
  }

  // Function that returns the next random question or null if all questions are used
  function getNextQuestion(): IQuestion | null {
    if (usedIndices.length === maxQuestions) {
      return null; // No more questions
    }
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedIndices.includes(randomIndex));
    usedIndices.push(randomIndex);
    return questions[randomIndex];
  }

  return {
    getNextQuestion,
    resetGenerator,
  };
}

const questionGenerator = createQuestionGenerator();
export const getNextQuestion = questionGenerator.getNextQuestion;
export const resetQuestionGenerator = questionGenerator.resetGenerator;

export function showNextQuestion(radioButtons: NodeListOf<HTMLInputElement>) {
  const question = getNextQuestion();

  if (question) {
    currentQuestion = question; // Update the current question
    console.group("Current Question:");
    console.log(currentQuestion);

    console.groupEnd();
    // Update UI with flag and alternatives.
    const flagImage = document.getElementById("flag-image");
    const option1Label = document.querySelector('label[for="option1"]')!;
    const option2Label = document.querySelector('label[for="option2"]')!;
    const option3Label = document.querySelector('label[for="option3"]')!;

    flagImage?.setAttribute("src", question.flag);
    option1Label.textContent = question.alternative1;
    option2Label.textContent = question.alternative2;
    option3Label.textContent = question.alternative3;

    // Reset radio buttons
    radioButtons.forEach(resetRadioButton);
  } else {
    console.log("No more questions available.");
    stopTimer();
    handleEndGame();
  }
}

// Function to reset a radio button (uncheck it)
export function resetRadioButton(radioButton: HTMLInputElement) {
  radioButton.checked = false; // Uncheck the radio button
  const label = document.querySelector(`label[for="${radioButton.id}"]`);
  label?.classList.remove("correct", "incorrect"); // Remove old classes
}

// Function to validate the selected answer
export function handleRadioButtonChange(
  radioButtons: NodeListOf<HTMLInputElement>,
): void {
  const selectedOption = Array.from(radioButtons).find((rb) => rb.checked);

  if (selectedOption && currentQuestion) {
    const selectedAnswer = selectedOption.nextElementSibling?.textContent || "";
    const isCorrect = validateAnswer(selectedAnswer, currentQuestion);

    if (isCorrect) {
      console.log("✅Correct answer!");
      addPoints(); // Add points for the correct answer
      selectedOption.nextElementSibling?.classList.add("correct");
    } else {
      console.log("❌Wrong answer!");

      selectedOption.nextElementSibling?.classList.add("incorrect");
    }
  }

  setTimeout(() => {
    // Update the footer progress after a short delay
    updateFooterProgress();
    // Add the fade-out class to the current question elements
    const flagImage = document.getElementById("flag-image");
    const option1Label = document.querySelector('label[for="option1"]')!;
    const option2Label = document.querySelector('label[for="option2"]')!;
    const option3Label = document.querySelector('label[for="option3"]')!;

    flagImage?.classList.add("fade-out");
    option1Label.classList.add("fade-out");
    option2Label.classList.add("fade-out");
    option3Label.classList.add("fade-out");

    setTimeout(() => {
      // Show the next question
      showNextQuestion(radioButtons);

      // Add fade-in class for the new question elements
      flagImage?.classList.remove("fade-out");
      flagImage?.classList.add("fade-in");
      option1Label.classList.remove("fade-out");
      option1Label.classList.add("fade-in");
      option2Label.classList.remove("fade-out");
      option2Label.classList.add("fade-in");
      option3Label.classList.remove("fade-out");
      option3Label.classList.add("fade-in");

      setTimeout(() => {
        flagImage?.classList.remove("fade-in");
        option1Label.classList.remove("fade-in");
        option2Label.classList.remove("fade-in");
        option3Label.classList.remove("fade-in");
      }, 400); // Match the fade-in duration
    }, 400); // Match the fade-out duration
  }, 800); // Wait for initial delay before fade-out
}

// Function to reset event listeners for radio buttons
function resetRadioEventListeners(radioButtons: NodeListOf<HTMLInputElement>) {
  radioButtons.forEach((radioButton) => {
    const clone = radioButton.cloneNode(true) as HTMLInputElement; // Clone the button
    radioButton.replaceWith(clone); // Replace original with the clone (removes listeners)
  });
  // Return the updated NodeList of radio buttons
  return document.querySelectorAll(
    'input[name="quiz"]',
  ) as NodeListOf<HTMLInputElement>;
}

export function initializeAutoNextQuestion(
  radioButtons: NodeListOf<HTMLInputElement>,
) {
  const updatedRadioButtons = resetRadioEventListeners(radioButtons);

  updatedRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () =>
      handleRadioButtonChange(updatedRadioButtons),
    );
  });
}
