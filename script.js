const cards_normal = document.querySelectorAll('.mode-normal');
const cards_hard = document.querySelectorAll('.mode-hard');
const cards_alterra = document.querySelectorAll('.mode-alterra');

let cards = cards_normal

// default tampilan awal
document.getElementById("game-hard").style.display = "none";
document.getElementById("game-normal").style.display = "flex";
document.getElementById("game-alterra").style.display = "none";

// tampilan ketika memilih mode normal
document.getElementById("choose-normal").onclick = function () {
    document.getElementById("game-hard").style.display = "none";
    document.getElementById("game-normal").style.display = "flex";
    document.getElementById("game-alterra").style.display = "none";
    cards = cards_normal;
}

// tampilan ketika memilih mode hard
document.getElementById("choose-hard").onclick = function () {
    document.getElementById("game-hard").style.display = "flex";
    document.getElementById("game-normal").style.display = "none";
    document.getElementById("game-alterra").style.display = "none";
    cards = cards_hard;
    console.log("testss")
}

// tampilan ketika memilih mode alterra
document.getElementById("choose-alterra").onclick = function () {
    document.getElementById("game-alterra").style.display = "flex";
    document.getElementById("game-hard").style.display = "none";
    document.getElementById("game-normal").style.display = "none";
    cards = cards_alterra;
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
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// the code that runs the program
cards.forEach(card => card.addEventListener('click', flipCard));
