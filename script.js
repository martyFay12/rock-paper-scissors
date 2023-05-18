// generate the computers play of rock paper or scissors
// use prompt to allow the user to pick a play. should be case sensitive, but need to check to make sure that
// they have picked a valid play
// compare computers play to users play - pick winner of round, display winner
// keep track of number of round wins, first to 5 wins game.

function getComputerPlay() {
  let computerPlay = Math.floor(Math.random() * 3);
  return computerPlay === 0
    ? "rock"
    : computerPlay === 1
    ? "paper"
    : "scissors";
}

function getUserPlay() {
  while (true) {
    let userPlay = prompt("Rock, Paper or Scissors?").toLowerCase();
    if (
      userPlay === "rock" ||
      userPlay === "paper" ||
      userPlay === "scissors"
    ) {
      return userPlay;
    } else {
      console.log(`${userPlay} is not a valid play, please pick again.`);
    }
  }
}

function decideRoundWinner(picks) {
  if (picks[0] === "rock") {
    if (picks[1] === "rock") {
      return "tie";
    }
    if (picks[1] === "paper") {
      return "user";
    }
    return "computer";
  } else if (picks[0] === "paper") {
    if (picks[1] === "paper") {
      return "tie";
    }
    if (picks[1] === "scissors") {
      return "user";
    }
    return "computer";
  } else {
    if (picks[1] === "scissors") {
      return "tie";
    }
    if (picks[1] === "rock") {
      return "user";
    }
    return "computer";
  }
}

function decideWinner(roundsWon) {
  return roundsWon[0] > roundsWon[1] ? "computer" : "user";
}

function displayRoundScore(round, roundsWon) {
  console.log(
    `round ${round}: current score: user: ${roundsWon[1]}, computer: ${roundsWon[0]}`
  );
}

function getPicks() {
  return [getComputerPlay(), getUserPlay()];
}

function iterateScores(roundWinner, roundsWon) {
  if (roundWinner === "user") {
    roundsWon[1]++;
    return roundsWon;
  } else if (roundWinner === "computer") {
    roundsWon[0]++;
    return roundsWon;
  } else {
    return roundsWon;
  }
}

function displayRoundWinner(roundWinner, picks) {
  if (roundWinner === "tie") {
    console.log(`tie round, both picked ${picks[0]}`);
    return `tie round, both picked ${picks[0]}`;
  } else if (roundWinner === "user") {
    console.log(`user wins, ${picks[1]} beats ${picks[0]}`);
    return `you win, ${picks[1]} beats ${picks[0]}`;
  } else {
    console.log(`computer wins, ${picks[0]} beats ${picks[1]}`);
    return `computer wins, ${picks[0]} beats ${picks[1]}`;
  }
}

function isGameOver(roundsWon) {
  return roundsWon[0] === 5 || roundsWon[1] === 5;
}

function displayEndText(round, gameWinner, roundsWon) {
  console.log(
    `The game is decided; after ${round} rounds: \n
     final score: user: ${roundsWon[1]}, computer: ${roundsWon[0]}.\n
     The winner is ${gameWinner}`
  );
  return;
}

function gameOf5() {
  let roundWinner;
  // first entry is computer, second is user for the following 2 variables
  let roundsWon = [0, 0];
  let picks = ["computer pick", "user pick"];
  let round = 1;
  while (true) {
    displayRoundScore(round, roundsWon);
    picks = getPicks();
    roundWinner = decideRoundWinner(picks);
    roundsWon = iterateScores(roundWinner, roundsWon);
    displayRoundWinner(roundWinner, picks);
    if (isGameOver(roundsWon)) {
      gameWinner = decideWinner(roundsWon);
      displayEndText(round, gameWinner, roundsWon);
      return gameWinner;
    }
    round++;
  }
}

function playRound(playerPick) {
  const picks = [getComputerPlay(), playerPick];
  const roundWinner = decideRoundWinner(picks);
  updateRoundResultPara(roundWinner, picks);
  updateScores(roundWinner);
  return roundWinner;
  // if (roundWinner === "computer") incrementScore(computer);
  // else incrementScore(user);
}

function updateRoundResultPara(roundWinner, picks) {
  const p = document.querySelector("#round-result");
  p.textContent = displayRoundWinner(roundWinner, picks);
}

function updateScores(roundWinner) {
  if (roundWinner === "tie") return;
  let currentScore;
  let p;
  if (roundWinner === "computer") {
    p = document.querySelector("#computer-score");
  } else {
    p = document.querySelector("#user-score");
  }
  currentScore = parseInt(p.textContent);
  p.textContent = ++currentScore;
}

function removeText(e) {
  console.log(e);
  // if(box.textContent === '') return;
  this.textContent = "";
  return;
}

buttons = document.querySelectorAll(".weapon");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id);
  });
});

const roundResult = document.querySelector("#round-result");
roundResult.addEventListener("transitionend", removeText);
