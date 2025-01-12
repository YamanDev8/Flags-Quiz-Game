export function setupLabelKeyboardEvents() {
  // Select all labels and input elements
  const labels = document.querySelectorAll(
    "label[tabindex='0']",
  ) as NodeListOf<HTMLElement>;
  const inputs = document.querySelectorAll(
    "input[tabindex='0']",
  ) as NodeListOf<HTMLInputElement>;

  // Combine the labels and inputs into one array to manage focus
  const allElements = [...labels, ...inputs];

  // Function to handle navigation using Arrow keys
  function handleArrowNavigation(event: KeyboardEvent) {
    const currentIndex = allElements.findIndex(
      (el) => el === document.activeElement,
    );

    if (currentIndex === -1) {
      return; // Ensure the currently focused element is in the array
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowDown") {
      // Move focus to the next element (down)
      nextIndex = Math.min(currentIndex + 1, allElements.length - 1);
    } else if (event.key === "ArrowUp") {
      // Move focus to the previous element (up)
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    // Set focus to the next element in the list
    allElements[nextIndex].focus();
    event.preventDefault(); // Prevent default scrolling behavior
  }

  // Function to handle Enter key press
  function handleEnterKey(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default actions

      const activeElement = document.activeElement as HTMLElement;

      // Check if the active element is a label and corresponds to a radio input
      if (activeElement && activeElement.tagName === "LABEL") {
        const inputId = activeElement.getAttribute("for");
        const radio = document.getElementById(
          inputId as string,
        ) as HTMLInputElement;

        if (radio) {
          // Simulate selecting the radio button
          radio.checked = true;
          radio.dispatchEvent(new Event("change")); // Trigger the change event for the input
          console.log(`Radio button ${radio.id} selected.`);
        }
      }
    }
  }

  // Add the event listener for keydown (Arrow Up, Arrow Down, and Enter)
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      handleArrowNavigation(event);
    } else if (event.key === "Enter") {
      handleEnterKey(event);
    }
  });
}
