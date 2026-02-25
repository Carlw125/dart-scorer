const submit = document.getElementById("submit");
const userInput = document.getElementById("userInput");
const playerOneScore = document.getElementById("playerOneScore");
const playerTwoScore = document.getElementById("playerTwoScore");
const playerOneName = document.getElementById("playerOneName");
const playerTwoName = document.getElementById("playerTwoName");
const playerOneLegs = document.getElementById("playerOneLegs");
const playerTwoLegs = document.getElementById("playerTwoLegs");
const playerOneNameInput = document.getElementById("playerOneNameInput");
const playerTwoNameInput = document.getElementById("playerTwoNameInput");
const startButton = document.getElementById("start");
const nameOne = document.getElementById("nameOne");
const nameTwo = document.getElementById("nameTwo");
const startGameDiv = document.getElementById("startGame");
const display = document.getElementById("displayOne");
const displayTwo = document.getElementById("displayTwo");
const thrower = document.getElementById("thrower");
const throwerButton = document.getElementById("throwerButton");
const clearBtn = document.getElementById("clear");
const undoBtn = document.getElementById("undo");
const checkoutsContainer = document.getElementById("checkoutsDiv");
const invalidScores = [163, 166, 169, 172, 173, 175, 176, 178, 179];
const players = [{name: "Player one", score: 0, scoreDisplay: playerOneScore, legs: 0, legsDisplay: playerOneLegs},
                {name: "Player two", score: 0, scoreDisplay: playerTwoScore, legs: 0, legsDisplay: playerTwoLegs}];
let checkoutsData;

fetch('./checkouts.json' )
    .then((response) => response.json())
    .then((json) => {
        checkoutsData = json;
    });

let currentPlayer = 0;
let startingScore = 0;
let lastScore = 0;
let startingPlayer = 0;

function startGame() {
    players[0].name = playerOneNameInput.value || "Player One";
    players[1].name = playerTwoNameInput.value || "Player Two";
    playerOneName.innerText = players[0].name;
    playerTwoName.innerText = players[1].name;
    nameOne.innerText = players[0].name;
    nameTwo.innerText = players[1].name;
    const selected = document.querySelector('input[name="starting"]:checked');
    const value = selected ? selected.value : null;
    players[0].score += +value;
    players[1].score += +value;
    playerOneScore.innerText = players[0].score;
    playerTwoScore.innerText = players[1].score;
    startingScore += +value;
    startGameDiv.style.display = "none";
    thrower.style.display = "block";
    noNames();
}

function switchPlayer() {
    return currentPlayer == 1 ? currentPlayer-- : currentPlayer++;
}

function switchPlayerMarker() {
    if (currentPlayer == 0) {
        playerTwoName.style.backgroundColor = "#121212";
        playerOneName.style.backgroundColor = "green";

    } if (currentPlayer == 1) {
        playerTwoName.style.backgroundColor = "green";
        playerOneName.style.backgroundColor = "#121212";
    }
}

function whoThrowsFirst() {
    if (playerTwoFirst.checked) {
        switchPlayer();
        startingPlayer++;
    }
    display.style.display = "grid";
    displayTwo.style.display = "grid";
    thrower.style.display = "none";
    switchPlayerMarker();
}

function numBtnInput(value) {
    userInput.value += value;
}

function checkInvailid() {
    return invalidScores.some((score => +userInput.value === score));
}

function checkInvalidScore(score) {
    if (score > 180) {
        alert("Too High!");
        clearInput();
        return true;
    } if (checkInvailid()) {
        alert("Impossible!");
        clearInput();
        return true;
    }
}

function bust() {
    let x = players[currentPlayer].score - userInput.value;
    if(x < 0 || x == 1) {
        clearInput();
        alert(players[currentPlayer].name + " Busts!");
    }
}

function checkout () { 
    checkoutsContainer.innerHTML = checkoutsData[players[currentPlayer].score];
     if (checkoutsContainer.innerHTML == "undefined") {
        checkoutsContainer.innerHTML = "";
    }   
}

function undoLastScore() {
    if(lastScore == 0) {
        return;
    } else {
        switchPlayer();
        players[currentPlayer].score += +lastScore;
        players[currentPlayer].scoreDisplay.innerHTML = players[currentPlayer].score;
        switchPlayerMarker();
        checkout();
        lastScore = 0;
        return;
}
}

function clearInput() {
    userInput.value = "";
}

function minusScore() {
    if (checkInvalidScore(userInput.value)) {
        return;
    } 
    if(bust()) {
        switchPlayer();
        switchPlayerMarker();
        return;
    }
    lastScore = userInput.value;
    players[currentPlayer].score -= userInput.value;        
    players[currentPlayer].scoreDisplay.innerHTML = players[currentPlayer].score;
    winGame();
    switchPlayer();
    switchPlayerMarker();
    checkout();
    clearInput();
}

function winGame() {
    if(players[currentPlayer].score == 0) {
        players[currentPlayer].legs++;
        players[currentPlayer].legsDisplay.innerHTML = players[currentPlayer].legs;
        newLeg();
        checkoutsContainer.innerHTML = "";
        alert(players[currentPlayer].name + " Wins!");
    }
}

function whoStarted () {
    startingPlayer == 0 ? startingPlayer++ : startingPlayer --;
    currentPlayer == startingPlayer ? switchPlayer() : currentPlayer;
}

function newLeg() {
        players[0].score = startingScore;
        playerOneScore.innerHTML = startingScore;
        players[1].score = startingScore;
        playerTwoScore.innerHTML = startingScore;
        lastScore = 0;
        whoStarted();
}

startButton.addEventListener("click", startGame);
throwerButton.addEventListener("click", whoThrowsFirst);
submit.addEventListener("click", minusScore);
clearBtn.addEventListener("click", clearInput);
undoBtn.addEventListener("click", undoLastScore);