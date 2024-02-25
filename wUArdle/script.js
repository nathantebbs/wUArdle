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

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return
  }
  pressedKey = pressedKey.toLowerCase()

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
  let box = row.children[nextLetter]
  box.textContent = pressedKey
  console.log("pressedKey")
  box.classList.add("filled-box")
  currentGuess.push(pressedKey)
  nextLetter += 1
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
  let box = row.children[nextLetter - 1]
  box.textContent = ""
  box.classList.remove("filled-box")
  currentGuess.pop()
  nextLetter -= 1
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
  let guessString = ""
  let rightGuess = Array.from(rightGuessString)
  for (const val of currentGuess) {
    guessString += val
  }
  if (guessString.length != 5) {
    toastr.error("Not enogh letters!")
    return
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Word not found in list!")
    return
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = ""
    let box = row.children[i]
    let letter = currentGuess[i]
    
    let letterPosition = rightGuess.indexOf(currentGuess[i])
    if (letterPosition === -1) {
      letterColor = 'grey'
    } else {
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = 'green'
      } else {
        letterColor = 'yellow'
      }
      rightGuess[letterPosition] = "#"
    }

    let delay = 0 * i;
    setTimeout(() => {
      box.style.backgroundColor = letterColor
      shadeKeyboard(letter, letterColor)
    }, delay);
  }

  if (guessString === rightGuessString) {
    toastr.success("You guessed right!")
    guessesRemaining = 0
    return
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      toastr.error('You lost!');
      toastr.info(`The correct guess was ${rightGuessString}`);
    }
  }
}

function shadeKeyboard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor
      if (oldColor === 'green') {
        return
      }
      if (oldColor === 'yellow' & oldColor !== 'green') {
        return
      }
      elem.style.backgroundColor = color
      break
    } 
  }
}

function registerOnScreenInput(event) {
  let inputLetter =  event.target.textContent;

  if (guessesRemaining === 0) {
    return
  }
  
  if (inputLetter === "Del" && nextLetter !== 0) {
    deleteLetter()
    return
  }

  if (inputLetter === "Enter"){
    checkGuess()
    return
  }
  let found = inputLetter.match(/[a-z]/gi)
  if (!found || found.length > 1) {
    return
  } else {
    insertLetter(inputLetter)
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

  if (pressedKey === "Enter") {
    checkGuess()
    return
  }

  let found = pressedKey.match(/[a-z]/gi)
  if (!found || found.length > 1) {
    return
  } else {
    insertLetter(pressedKey)
  }
})

let onScreenKeyboard = document.getElementById("keyboard-cont")
onScreenKeyboard.addEventListener("click", registerOnScreenInput)


initBoard();
