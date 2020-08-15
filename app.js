const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const endGameMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const wordPool = [
    "application",
    "coding",
    "society",
    "community",
    "language",
    "terminal",
    "system",
    "ninja",
    "wizard",
    "operator",
    "expression",
    "accumulator"
];

let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

let correctLetters = [];
let wrongLetters = [];

function displayWord() {
    // Shows hidden word
    wordElement.innerHTML = `
        ${selectedWord
            .split("")
                .map(letter => `<span class="letter"> ${correctLetters.includes(letter) ? letter : ''} </span>`)
                .join("")
        }
    `;
    
    const innerWord = wordElement.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord)  {
        endGameMessage.innerText = "You've Won! 😃";
        popup.style.display = "flex";
    }
}

displayWord();