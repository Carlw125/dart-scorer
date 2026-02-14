const submit = document.getElementById("submit");
const userInput = document.getElementById("userInput");
const playerOneScore = document.getElementById("playerOneScore");
const playerTwoScore = document.getElementById("playerTwoScore");
const playerOneName = document.getElementById("playerOneName");
const playerTwoName = document.getElementById("playerTwoName");
const playerOneNameInput = document.getElementById("playerOneNameInput");
const playerTwoNameInput = document.getElementById("playerTwoNameInput");
const oneKOne = document.getElementById("1001");
const fiveOOne = document.getElementById("501");
const threeOOne = document.getElementById("301");
const startButton = document.getElementById("start");
const nameOne = document.getElementById("nameOne");
const nameTwo = document.getElementById("nameTwo");
const startGameDiv = document.getElementById("startGame");
const display = document.getElementById("displayOne");
const displayTwo = document.getElementById("displayTwo");
const thrower = document.getElementById("thrower");
const throwerButton = document.getElementById("throwerButton");
const playerOneFirst = document.getElementById("playerOneFirst");
const playerTwoFirst = document.getElementById("playerTwoFirst");
const clearBtn = document.getElementById("clear");
const undoBtn = document.getElementById("undo");
const checkoutsContainer = document.getElementById("checkoutsDiv");
let checkoutsData;

fetch('./checkouts.json' )
    .then((response) => response.json())
    .then((json) => {
        checkoutsData = json;
    });

let currentPlayer = 0;
let playerThrowFirst = 0;
let startingScore = 0;
let pOneScore = 0;
let pTwoScore = 0;
let lastScore = 0;
let pOneLegs = 0;
let pTwoLegs = 0;

/*function testUi() {
    document.getElementById("test").innerText = currentPlayer;
}*/

function numBtnInput(value) {
    userInput.value += value;
}

function undoLastScore() {
    if(lastScore == 0) {
        return;
    } else {
    if(currentPlayer == 1) {
        pOneScore += +lastScore;
        playerOneScore.innerHTML = pOneScore;
        currentPlayer--;
        marker();
        lastScore = 0;
        return;
    } if(currentPlayer == 0) {
        pTwoScore += +lastScore;
        playerTwoScore.innerHTML = pTwoScore;
        currentPlayer++;
        marker();
        lastScore = 0;
        return;
    }
}
}


function startGame() {
    playerOneName.innerText = playerOneNameInput.value;
    playerTwoName.innerText = playerTwoNameInput.value;
    nameOne.innerText = playerOneNameInput.value;
    nameTwo.innerText = playerTwoNameInput.value;
    if (oneKOne.checked) {
        pOneScore += 1001;
        pTwoScore += 1001;
        playerOneScore.innerText = pOneScore;
        playerTwoScore.innerText = pTwoScore;
    }
    if (fiveOOne.checked) {
        pOneScore += 501;
        pTwoScore += 501;
        playerOneScore.innerText = pOneScore;
        playerTwoScore.innerText = pTwoScore;
        startingScore++;
    }
    if (threeOOne.checked) {
        pOneScore += 301;
        pTwoScore += 301;
        playerOneScore.innerText = pOneScore;
        playerTwoScore.innerText = pTwoScore;
        startingScore += 2;
    }
    startGameDiv.style.display = "none";
    thrower.style.display = "block";
    noNames();

}

function noNames() {
    if (playerOneNameInput.value == "") {
        playerOneName.innerText = "Player One";
        nameOne.innerText = "Player One";
    }
    if (playerTwoNameInput.value == "") {
        playerTwoName.innerText = "Player Two";
        nameTwo.innerText = "Player Two";
    }
}

function whoThrows() {
    if (playerTwoFirst.checked) {
        currentPlayer++;
    }
    display.style.display = "grid";
    displayTwo.style.display = "grid";
    thrower.style.display = "none";
    marker();
}

function marker() {
    if (currentPlayer == 0) {
        playerTwoName.style.backgroundColor = "#a1a2b3";
        playerOneName.style.backgroundColor = "green";

    } if (currentPlayer == 1) {
        playerTwoName.style.backgroundColor = "green";
        playerOneName.style.backgroundColor = "#a1a2b3";
    }
}

function checkInvalidScore(score) {
    if (score > 180) {
        alert("Too High!");
        userInput.value = "";
        return true;
    } if (score < 0) {
        alert("Impossible!");
        userInput.value = "";
        return true;
    }
}

function bust() {
    let x = pOneScore - userInput.value;
    let y = pTwoScore - userInput.value;
    if((x < 0 || x == 1) && currentPlayer == 0) {
        userInput.value = "";
        currentPlayer++;
        marker();
        alert("P1 Bust!");
        return true;
    } if((y < 0 || y == 1) && currentPlayer == 1) {
        userInput.value = "";
        currentPlayer--;
        marker();
        alert("P2 Bust!");
        return true;
    }
}

function newLeg() {
    if (startingScore == 0) {
        pOneScore = 1001;
        playerOneScore.innerHTML = pOneScore;
        pTwoScore = 1001;
        playerTwoScore.innerHTML = pTwoScore;
    }
    if (startingScore == 1) {
        pOneScore = 501;
        playerOneScore.innerHTML = pOneScore;
        pTwoScore = 501;
        playerTwoScore.innerHTML = pTwoScore;
    }
    if (startingScore == 2) {
        pOneScore = 301;
        playerOneScore.innerHTML = pOneScore;
        pTwoScore = 301;
        playerTwoScore.innerHTML = pTwoScore;
    }
    lastScore = 0;
} // Start refractoring all code before adding anymore features.//

function checkout () { 
    if (currentPlayer == 0) {
        checkoutsContainer.innerHTML = checkoutsData[pOneScore];
    } if (currentPlayer == 1) {
        checkoutsContainer.innerHTML = checkoutsData[pTwoScore];
    } if (checkoutsContainer.innerHTML == "undefined") {
        checkoutsContainer.innerHTML = "";
    }
    
}


function winGame() {
    if(currentPlayer == 1 && pOneScore == 0) {
        pOneLegs++;
        document.getElementById("playerOneLegs").innerHTML = pOneLegs;
        newLeg();
        checkoutsContainer.innerHTML = "";
        alert("Player one wins!");
    } if(currentPlayer == 0 && pTwoScore == 0) {{
        pTwoLegs++;
        document.getElementById("playerTwoLegs").innerHTML = pTwoLegs;
        newLeg();
        checkoutsContainer.innerHTML = "";
        alert("Player two wins!");
    }}
}

function minusScore() {
    if (checkInvalidScore(userInput.value)) {
        return;
    } 
    if(bust()) {
        return;
    }
    else if (currentPlayer == 0) {
        lastScore = userInput.value;
        pOneScore -= userInput.value;
        playerOneScore.innerHTML = pOneScore;
        currentPlayer++;
        marker();

    } else if (currentPlayer == 1) {
        lastScore = userInput.value;
        pTwoScore -= userInput.value;
        playerTwoScore.innerHTML = pTwoScore;
        currentPlayer--;
        marker();
    }
    checkout();
    userInput.value = "";
    winGame();
}

function clear() {
    userInput.value = "";
}

startButton.addEventListener("click", startGame);
throwerButton.addEventListener("click", whoThrows);
submit.addEventListener("click", minusScore);
clearBtn.addEventListener("click", clear);
undoBtn.addEventListener("click", undoLastScore);