const cards_normal = document.querySelectorAll('.mode-normal');
const cards_hard = document.querySelectorAll('.mode-hard');
const cards_alterra = document.querySelectorAll('.mode-alterra');

// let difficulty = document.getElementById("choosing-mode");
let difficulty = document.getElementById("");
let cards = cards_normal;
let moves = 0;
let timeinterval;

// if (difficulty === "choose-normal") {
//     cards = cards_normal;
// } else if (difficulty === "choose-hard") {
//     cards = cards_hard;
// } else {
//     card = cards_alterra;
// }

// default tampilan awal
document.getElementById("game-hard").style.display = "none";
document.getElementById("game-normal").style.display = "flex";
document.getElementById("game-alterra").style.display = "none";

// tampilan ketika memilih mode normal
// if (document.getElementById("choose-normal").onclick )
document.getElementById("choose-normal").onclick = function () {
    clearInterval(timeinterval);
    document.getElementById("game-hard").style.display = "none";
    document.getElementById("game-normal").style.display = "flex";
    document.getElementById("game-alterra").style.display = "none";
    cards = cards_normal;
    moves = 0;
    timeinterval = startTimer(30);
    return cards
}

// tampilan ketika memilih mode hard
document.getElementById("choose-hard").onclick = function () {
    clearInterval(timeinterval);
    document.getElementById("game-hard").style.display = "flex";
    document.getElementById("game-normal").style.display = "none";
    document.getElementById("game-alterra").style.display = "none";
    cards = cards_hard;
    moves = 0;
    timeinterval = startTimer(30);
    return cards

}

// tampilan ketika memilih mode alterra
document.getElementById("choose-alterra").onclick = function () {
    clearInterval(timeinterval);
    document.getElementById("game-alterra").style.display = "flex";
    document.getElementById("game-hard").style.display = "none";
    document.getElementById("game-normal").style.display = "none";
    cards = cards_alterra;
    moves = 0;
    timeinterval = startTimer(60);
    return cards
}


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// function to flip the selected card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

// function to check if the selected cards are matched
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    moves += 1;
    isMatch ? disableCards() : unflipCards();

}

// function to disable cards that have already been guessed correctly
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// function to flip-back cards that have been guessed incorrectly
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 750);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

// the code that runs the program
cards.forEach(card => card.addEventListener('click', flipCard));

// function timer

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    display = document.querySelector('#time');
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer == 0) {
            // alert("GAME OVER!!")
            // break;
            clearInterval(timer)
        }
        if (timer > 0) {
            --timer;
        }
        // alert("GAME OVER!")
        // if (--timer < 0) {
        //     // timer = duration;
        // }
    }, 1000);
    return interval;
}


// need to change it to only start when the mode has been chosen
// function setTimer() {
//     let timer = 10;
//     display = document.querySelector('#time');
//     startTimer(timer, display);
// };