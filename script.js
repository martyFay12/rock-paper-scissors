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

function playRound(playerPick) {
  if (getMaxScore() > 4) return; // game is over as someone already has a score of 5.
  const picks = [getComputerPlay(), playerPick];
  const roundWinner = decideRoundWinner(picks);
  updateRoundResultPara(roundWinner, picks);
  updateScores(roundWinner);
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
  if (currentScore === 5) {
    endGame(roundWinner);
  }
}

function getMaxScore() {
  let computerScore = parseInt(
    document.querySelector("#computer-score").textContent
  );
  let userScore = parseInt(document.querySelector("#user-score").textContent);
  return computerScore > userScore ? computerScore : userScore;
}

function endGame(roundWinner) {
  let text;
  if (roundWinner === "computer") {
    text = "Wow... you suck, you lost to the computer...";
  } else {
    text = "Congrats, you beat a non intelligent being...";
  }
  const p = document.querySelector("#round-result");
  p.textContent = text;
  makeRematchButton();
}

function makeRematchButton() {
  const newGame = document.createElement("button");
  newGame.textContent = "REMATCH";
  newGame.setAttribute("id", "new-game");
  document.body.appendChild(newGame);
  newGame.addEventListener("click", () => (window.location = "./index.html"));
}

const buttons = document.querySelectorAll(".weapon");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id);
  });
});
