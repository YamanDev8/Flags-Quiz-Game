//counter for tracking the number of questions
export let clickCount = 0;

export function incrementClickCount(): void {
  clickCount++;
}

export function resetClickCount(): void {
  clickCount = 0;
  console.log("♻️Click count reset.");
}
