/* Vars */
// Elements needed from the DOM
const adviceNumber = document.getElementById("adviceNumber");
const adviceText = document.getElementById("adviceText");
const diceButton = document.getElementById("diceButton");
const diceImage = document.getElementById("diceImage");
// API URL
const urlAPI = "https://api.adviceslip.com/advice";

/* Functions */
// Function to get a random advice
async function getAdvice(urlAPI) {
  const response = await fetch(`${urlAPI}?${new Date().getTime()}`);
  const data = await response.json();
  return data;
}

// Function to show the random advice
const showAdvice = async (urlAPI) => {
  try {
    const advice = await getAdvice(urlAPI);
    adviceNumber.textContent = `Advice #${advice.slip.id}`;
    adviceText.textContent = `“${advice.slip.advice}”`;
  } catch {
    adviceNumber.textContent = "Notice";
    adviceText.textContent = "Advice slip not found.";
  }
};

// Animation function to rotate the dice
function diceRotate() {
  // Add the class to start the animation
  diceImage.classList.add("dice-rotate");
  // Remove the class when the animation ends to be able to restart it on the next click
  diceImage.addEventListener("animationend", () => {
    diceImage.classList.remove("dice-rotate");
  });
}

/* Events */
// Event load to show a random advice when the page loads
document.addEventListener("DOMContentLoaded", () => {
  diceRotate();
  showAdvice(urlAPI);
});

// Click event to get a random advice
diceButton.addEventListener("click", () => {
  diceRotate();
  showAdvice(urlAPI);
});
