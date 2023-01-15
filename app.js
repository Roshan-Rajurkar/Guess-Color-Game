// variable to display generated color code on screen.
const colorCodeContainer = document.getElementById("color-code");

// variable to display 6 options
const optionContainer = document.getElementById("options-container");

const scoreContainer = document.getElementById("score");

let randomColor = null; // getting color code

// variable to store the score
let score = 0;

// generate random number form 0 t0 0,255
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

// Generate code onload the  on page
function generateRandomColorRGB() {
  let red = random(0, 255);
  let green = random(0, 255);
  let blue = random(0, 255);

  // returning generated random colors
  return `rgb(${red}, ${green}, ${blue})`;
}

// increment score
function incrementScore() {
  score += 1;
  scoreContainer.innerText = score;
}

// checking whether th clicked element having sae color as our generated random color
function checkValidColor(el) {
  // passing elements
  // target return the targeted element
  const selectedColor = el.target.style.backgroundColor;

  if (selectedColor === randomColor) {
    incrementScore();
  } else {
    score = 0;
  }
  // Save Data to Local Storage
  // localStorage.setItem(key, value);
  window.localStorage.setItem("score", score);

  //   after guess start game again
  startGame();
}

// start game function

function startGame() {
  // getting initial value of score
  score = Number(window.localStorage.getItem("score")) ?? 0; // ?? -> nullish operator : check whether the element is null or not.

  scoreContainer.innerText = score;

  // initially options are empty
  optionContainer.innerHTML = null;
  randomColor = generateRandomColorRGB();
  // console.log(randomColor);
  // placing color code in the top means h1 tag
  colorCodeContainer.innerText = randomColor.toLocaleUpperCase();

  // generating ans at any index from 0 to 5
  const ansIndex = random(0, 5);

  // generating 6 options
  for (let i = 0; i < 6; i++) {
    // creating div as a option
    const div = document.createElement("div");

    // add event listener on each div to check color is valid or not
    div.addEventListener("click", checkValidColor);

    // Logic : if the i is equal to the ansIndex then put our ans here otherwise generate random color
    div.style.backgroundColor =
      i === ansIndex ? randomColor : generateRandomColorRGB();

    // adding that div in options container
    optionContainer.append(div);
  }
}

// start the game when window get loaded

window.addEventListener("load", () => {
  startGame();
});
