import { IQuestion } from "./questionsData";

export function validateAnswer(
  selectedAnswer: string,
  currentQuestion: IQuestion,
): boolean {
  console.log("Selected Answer:", selectedAnswer);
  console.log("Correct Answer:", currentQuestion.correctAnswer);
  return selectedAnswer === currentQuestion.correctAnswer;
}
