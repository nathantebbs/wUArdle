import { WORDS } from "./words.js";

const NUM_OF_GUESSES = 6;
let guessesRemaining = NUM_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);
