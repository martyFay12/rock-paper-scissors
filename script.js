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

function decideWinner(computerScore, userScore) {
  return computerScore > userScore
    ? "computer"
    : computerScore < userScore
    ? "user"
    : "tie";
}
function gameOf5() {
  let userRoundsWon = 0;
  let computerRoundsWon = 0;
  let roundWinner;
  let usersPick;
  let computersPick;
  for (let i = 1; i <= 5; i++) {
    // display current round and score
    console.log(
      `round ${i}: current score: user: ${userRoundsWon}, computer: ${computerRoundsWon}`
    );
    // get picks for round
    usersPick = getUserPlay();
    computersPick = getComputerPlay();
    // see who won, and then display it with what each picked, iterate scores accordingly
    roundWinner = whoWinsRound(computersPick, usersPick);
    if (roundWinner === "user") {
      console.log(`user wins, ${usersPick} beats ${computersPick}`);
      userRoundsWon++;
    } else if (roundWinner === "computer") {
      console.log(`computer wins, ${computersPick} beats ${usersPick}`);
      computerRoundsWon++;
    } else {
      console.log(`tie round, both picked ${usersPick}`);
    }
    // see if game is over.
    if (Math.abs(userRoundsWon - computerRoundsWon) > 5 - i) {
      console.log(
        `The game is decided; final score: user: ${userRoundsWon}, computer: ${computerRoundsWon}`
      );
      winner = decideWinner(computerRoundsWon, userRoundsWon);
      console.log(`The winner is ${winner}`);
      return winner;
    }
  }
}
