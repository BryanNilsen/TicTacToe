// player names variables
let playerOne = ""
let playerTwo = ""

// player name inputs
const playerOneInput = document.querySelector("#input_player_one")
const playerTwoInput = document.querySelector("#input_player_two")

// player name locations in DOM
let playerOneName = document.querySelector("#player_one_name")
let playerTwoName = document.querySelector("#player_two_name")

// event listener to player one name submit button
document.querySelector("#player_one_btn").addEventListener("click", () => {
  if (playerOneInput.value !== "") {
    playerOne = playerOneInput.value
    playerOneName.textContent = playerOneInput.value
  } else {
    alert("Player One, please enter a name")
  }
})

// event listener to player two name submit button
document.querySelector("#player_two_btn").addEventListener("click", () => {
  if (playerTwoInput.value !== "") {
    playerTwo = playerTwoInput.value
    playerTwoName.textContent = playerTwoInput.value
  } else {
    alert("Player Two, please enter a name")
  }
})

// player win totals in DOM
let playerOneWins = document.querySelector("#player_one_wins")
let playerTwoWins = document.querySelector("#player_two_wins")

// player win total counters
let playerOneWinTotal = 0
let playerTwoWinTotal = 0

// all game board squares
const game_squares = document.querySelectorAll(".game_square")

// player turn - click counter
let clickCounter = 0

// game board array - index location corresponds to div id in game_container section
let game_array = ["", "", "", "", "", "", "", "", ""]

// evaluate whether same symbols appear in game squares matching winning sequence
let winning_combos = (symbol) => {
  if (
    game_array[0] === symbol && game_array[1] === symbol && game_array[2] === symbol ||
    game_array[3] === symbol && game_array[4] === symbol && game_array[5] === symbol ||
    game_array[6] === symbol && game_array[7] === symbol && game_array[8] === symbol ||
    game_array[0] === symbol && game_array[3] === symbol && game_array[6] === symbol ||
    game_array[1] === symbol && game_array[4] === symbol && game_array[7] === symbol ||
    game_array[2] === symbol && game_array[5] === symbol && game_array[8] === symbol ||
    game_array[0] === symbol && game_array[4] === symbol && game_array[8] === symbol ||
    game_array[2] === symbol && game_array[4] === symbol && game_array[6] === symbol
  ) {
    return true
  }
}

// START GAME
// ! game board hidden until player names entered and start button clicked
const startGame = () => {
  // check if players have entered names
  if (playerOne !== "" && playerTwo !== "") {
    const gameContainer = document.getElementById("game_container")
    gameContainer.classList.remove("hidden")
  } else {
    alert("Please enter names for both players")
  }
}

const startGameButton = document.getElementById("start_game")
startGameButton.addEventListener("click", startGame)

// RESTART GAME
const restartGame = () => {
  // reset click counter, clear game array, add event listeners, reset classes
  clickCounter = 0;
  game_array = ["", "", "", "", "", "", "", "", ""];
  game_squares.forEach(square => {
    square.addEventListener("click", squareEvent)
    square.textContent = "";
    square.classList.add("game_square")
    square.classList.remove("red")
    square.classList.remove("blue")
  })
  // update player win totals
  playerOneWins.textContent = playerOneWinTotal
  playerTwoWins.textContent = playerTwoWinTotal
}

const symbolDecider = () => {
  if (clickCounter % 2 === 0) {
    return "X"
  } else {
    return "O"
  }
}

const squareEvent = (evt) => {
  const squareContainer = document.getElementById(evt.target.id)
  let symbol = symbolDecider()
  let currentPlayer = playerOne
  let symbolClass = "red"
  squareContainer.textContent = symbol
  if (symbol != "X") {
    symbolClass = "blue"
    currentPlayer = playerTwo
  }
  squareContainer.classList.add(symbolClass)
  squareContainer.classList.remove("game_square")
  game_array[evt.target.id] = symbol
  clickCounter++
  squareContainer.removeEventListener("click", squareEvent)
  console.log("CLICK COUNT", clickCounter)
  console.log("Game Array", game_array)
  const didWin = winning_combos(symbol)
  if (didWin) {
    let newGame = confirm(`${currentPlayer} won!\nPlay again?`)
    if (currentPlayer === playerOne) {
      playerOneWinTotal++
    } else {
      playerTwoWinTotal++
    }

    if (newGame) {
      restartGame()
      return
    }
    game_squares.forEach(square => {
      square.removeEventListener("click", squareEvent)
    })
  }

  if (clickCounter === 9) {
    let playAgain = confirm("game over, no winner\nPlay again?")
    if (playAgain) {
      restartGame()
    }
  }

}

// add event listener to all game squares
game_squares.forEach(square => {
  square.addEventListener("click", squareEvent)
})


