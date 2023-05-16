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

function whoWinsRound(computersPick, usersPick) {
  if (computersPick === "rock") {
    if (usersPick === "rock") {
      return "tie";
    }
    if (usersPick === "paper") {
      return "user";
    }
    return "computer";
  } else if (computersPick === "paper") {
    if (usersPick === "paper") {
      return "tie";
    }
    if (usersPick === "scissors") {
      return "user";
    }
    return "computer";
  } else {
    if (usersPick === "scissors") {
      return "tie";
    }
    if (usersPick === "rock") {
      return "user";
    }
    return "computer";
  }
}
