// generate the computers play of rock paper or scissors
// use prompt to allow the user to pick a play. should be case sensitive, but need to check to make sure that
// they have picked a valid play
// compare computers play to users play - pick winner of round, display winner
// keep track of number of wins, since it is a best of five, only need to keep track of first 3 wins.
// first to win 3 games wins.

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

function whoWinsRound(picks) {
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
  return roundsWon[0] > roundsWon[1]
    ? "computer"
    : roundsWon[0] < roundsWon[1]
    ? "user"
    : "tie";
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
    return;
  } else if (roundWinner === "user") {
    console.log(`user wins, ${picks[1]} beats ${picks[0]}`);
    return;
  } else {
    console.log(`computer wins, ${picks[0]} beats ${picks[1]}`);
    return;
  }
}

function isGameOver(round, roundsWon) {
  return Math.abs(roundsWon[1] - roundsWon[0]) > 5 - round;
}

function displayEndText(gameWinner, roundsWon) {
  console.log(
    `The game is decided; final score: user: ${roundsWon[1]}, computer: ${roundsWon[0]}`
  );
  if (gameWinner === "tie") {
    console.log("no winner, tie game");
  } else {
    console.log(`The winner is ${gameWinner}`);
  }
  return;
}

function gameOf5() {
  let roundWinner;
  // first entry is computer, second is user for the following variables
  let roundsWon = [0, 0];
  let picks = ["computer pick", "user pick"];
  for (let round = 1; round <= 5; round++) {
    // display current round and score
    displayRoundScore(round, roundsWon);
    // get picks for round
    picks = getPicks();
    // see who won round
    roundWinner = whoWinsRound(picks);
    // iterate scores according to who won round
    roundsWon = iterateScores(roundWinner, roundsWon);
    // display who won round, with what was picked by each team
    displayRoundWinner(roundWinner, picks);
    // see if game is over.
    if (isGameOver(round, roundsWon)) {
      // see who won game
      gameWinner = decideWinner(roundsWon);
      // display final score, and winner
      displayEndText(gameWinner, roundsWon);
      // return the game winner
      return gameWinner;
    }
  }
}
