// getting the values of all the cards from each game mode
const cards_normal = document.querySelectorAll('.mode-normal');
const cards_hard = document.querySelectorAll('.mode-hard');
const cards_alterra = document.querySelectorAll('.mode-alterra');

// setting the default mode as normal
let cards = cards_normal;

let timeInterval;

let wonStatus = false;
let checkGameOver = false;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const bakaSound = new Audio('./audios/baka.mp3')
const goodJobuSound = new Audio('./audios/good-jobu.mp3')
const narutoTrapSound = new Audio('./audios/naruto-trap.mp3')


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
            clearInterval(timeInterval)
            if (wonStatus === false) {
                checkGameOver = true;
                document.getElementById("game-over").style.display = "block";
            }
            clearInterval(timer)
        }
        if (timer > 0) {
            --timer;
        }
    }, 1000);
    return interval;
}


// default game mode
document.getElementById("game-hard").style.display = "none";
document.getElementById("game-normal").style.display = "flex";
document.getElementById("game-alterra").style.display = "none";

// chunin game mode
document.getElementById("choose-normal").onclick = function () {
    clearInterval(timeInterval);
    document.getElementById("game-hard").style.display = "none";
    document.getElementById("game-normal").style.display = "flex";
    document.getElementById("game-alterra").style.display = "none";
    cards = cards_normal;
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
    timeInterval = startTimer(30);
    return cards
}

// jounin game mode
document.getElementById("choose-hard").onclick = function () {
    clearInterval(timeInterval);
    document.getElementById("game-hard").style.display = "flex";
    document.getElementById("game-normal").style.display = "none";
    document.getElementById("game-alterra").style.display = "none";
    cards = cards_hard;
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
    timeInterval = startTimer(30);
    return cards
}

// hokage game mode
document.getElementById("choose-alterra").onclick = function () {
    clearInterval(timeInterval);
    document.getElementById("game-alterra").style.display = "flex";
    document.getElementById("game-hard").style.display = "none";
    document.getElementById("game-normal").style.display = "none";
    cards = cards_alterra;
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
    timeInterval = startTimer(60);
    return cards
}


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

let count = 0
// function to check if the selected cards are matched
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    let display = document.getElementById("move-counter")
    count++;
    display.innerHTML = count;
    isMatch ? openCards() : unflipCards();
}

let cardsLength = 0

// function to open cards that have already been guessed correctly
function openCards() {
    goodJobuSound.play()
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    cardsLength += 2
    if (cardsLength === cards.length && checkGameOver === false) {
        wonStatus = true;
        document.getElementById("game-win").style.display = "block";

    }
    resetCardBoard();
}
// function to flip-back cards that have been guessed incorrectly
function unflipCards() {
    lockBoard = true;
    bakaSound.play();
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCardBoard();
    }, 750);

}

function resetCardBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
};

shuffle();

// function to reload window
function reloadWindow() {
    location.reload()
}

// the code that runs the program
cards.forEach(card => card.addEventListener('click', flipCard));

window.onload = function () {
    document.getElementById("my_starting_audio").play();
    console.log("tests")
}