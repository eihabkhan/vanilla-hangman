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

function showNotification() {
    notification.classList.add("show")

    setTimeout(() => {
        notification.classList.remove("show")
    }, 1800);
}

function updateWrongLettersElement() {

    // Display wrong letter entered
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display hangman body part 
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length
        if(index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    // Check if out of attempts
    if (wrongLetters.length === figureParts.length) {
        endGameMessage.innerText = "You've lost 💀"
        popup.style.display = "flex"
    }
}

// Keydown
addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else { // Leter already entered
                showNotification()
            }
        } else { // Leter is incorrect
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersElement()
            } else {
                showNotification()
            }
        }
    }
});

playAgainBtn.addEventListener("click", ()=> {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    displayWord();
    updateWrongLettersElement();
    popup.style.display = "none"
});

displayWord();