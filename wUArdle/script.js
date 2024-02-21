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

initBoard();
