const letters = "abcdefghijktslmnopqruvwxyz";
let lettresArray = Array.from(letters);

let letterContainer = document.querySelector(".letters");

lettresArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);

    span.appendChild(theLetter);
    span.className = 'letter-box';

    letterContainer.appendChild(span);
});

const words = {
    movies: ["Inception", "Parasite", "Interstellar", "Fallen angel", "Her"],
    sports: ["football", "basketball", "tennis", "golf", "volleyball"],
    people: ["Albert Einstein", "Hitchcock", "Cleopatra", "Gandhi"],
    countries: ["Syria", "Jordan", "Yemen", "Qatar", "Egypt"]
}

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValue.toLowerCase()); // Convert randomValue to lowercase

lettersAndSpace.forEach(letter => {
    let span = document.createElement("span");

    if (letter === " ") {
        span.className = "with-space"
    }

    lettersGuessContainer.appendChild(span);
});

let theChosenWord = Array.from(randomValue.toLowerCase());

let wrongAttempts = 0;
let correcrAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");
// ... Your existing code ...

let correctGuessedLetters = []; // Track correct guessed letters

document.addEventListener('click', (e) => {
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();

        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (theClickedLetter === wordLetter) {
                theStatus = true;
                correctGuessedLetters.push(wordIndex); // Track the index of correct letter
                guessSpans[wordIndex].innerHTML = theClickedLetter;
            }
        });

        if (correctGuessedLetters.length === randomValue.length) {
            letterContainer.classList.add("finished");
            endGameWinner();
        }
        if (!theStatus) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            if (wrongAttempts === 5) {
                letterContainer.classList.add("finished");
                endGame();
            }
        }
    }
});



let guessSpans = document.querySelectorAll(".letters-guess span"); // Move this line after creating guess spans

// end game fun
function endGame() {

    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, the world is ${randomValue} `)
    let mySpan = document.createElement("span");
    mySpan.innerHTML = "Play again";
    div.className = "popup";
    div.appendChild(mySpan);
    div.appendChild(divText);



    mySpan.addEventListener("click", () => {
        location.reload();
    })
    document.body.appendChild(div);
}
function endGameWinner() {

    let div = document.createElement("div");
    let divText = document.createTextNode(`congrats, you won`)
    let mySpan = document.createElement("span");
    mySpan.innerHTML = "Play again";
    div.appendChild(mySpan);
    div.appendChild(divText);
    div.className = "popup";



    mySpan.addEventListener("click", () => {
        location.reload();
    })
    document.body.appendChild(div);
}

