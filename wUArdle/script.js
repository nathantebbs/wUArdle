import { WORDS } from "./words.js";

const NUM_OF_GUESSES = 6;
let guessesRemaining = NUM_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

function initBoard(params) {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUM_OF_GUESSES; i++) {
    let row = document.createElement("div")
    row.className = "letter-row"

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div")
      box.className = "letter-box"
      row.appendChild(box)
    }

    board.appendChild(row)  
  }
}



document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return
  }
  let pressedKey = String(e.key)
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter()
    return
  }

  let found = pressedKey.match(/[a-z]/gi)
  if (pressedKey === "Enter") {
    if (!found || found.length > 1) {
      return
    } else {
      insertLetter(pressedKey)
    }
  }
})

initBoard();
