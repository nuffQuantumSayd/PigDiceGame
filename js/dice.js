var Player = (function () {
    function Player() {
    }
    return Player;
}());
var Game = (function () {
    function Game(playerTurn, currentTurnTotal, gameOver) {
        this.playerTurn = playerTurn;
        this.currentTurnTotal = currentTurnTotal;
        this.gameOver = gameOver;
    }
    return Game;
}());
var player1 = new Player();
var player2 = new Player();
var game = new Game(player1, 0, false);
var rpgDiceRollSound = new Audio("audio/rpg-dice.mp3");
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    var randomDiceRoll = Math.floor(random * maxValue) + minValue;
    return randomDiceRoll;
}
function changePlayers() {
    if (game.playerTurn == player1) {
        game.playerTurn = player2;
    }
    else {
        game.playerTurn = player1;
    }
    $("current").innerText = game.playerTurn.name;
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    if (!verifyPlayerName("player1") || !verifyPlayerName("player2")) {
        alert("Please enter a name for both players");
    }
    else {
        player1.name = $("player1").value;
        player1.score = 0;
        player1.gameTotal = 0;
        player2.name = $("player2").value;
        player2.score = 0;
        player2.gameTotal = 0;
        console.log("players created");
        console.log(player1);
        console.log(player2);
        console.log("game created");
        console.log(game);
        game.playerTurn = player2;
        document.getElementById("turn").classList.add("open");
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
        $("total").value = game.playerTurn.gameTotal.toString();
    }
}
function declareTheWinner() {
    alert("The winner is " + game.playerTurn.name + " with a score of " + game.playerTurn.gameTotal);
    resetPlayersAndGame();
}
function verifyPlayerName(id) {
    if ($(id).value == null || $(id).value == "") {
        return false;
    }
    return true;
}
function rollDie() {
    rpgDiceRollSound.play();
    var roll = generateRandomValue(1, 6);
    if (roll == 1) {
        game.playerTurn.score = 0;
        displayPlayerScore();
        changePlayers();
    }
    else {
        game.playerTurn.score += roll;
        displayPlayerScore();
    }
    document.getElementById("die").value = roll.toString();
    document.getElementById("total").value = game.playerTurn.gameTotal.toString();
}
function displayPlayerScore() {
    if (game.playerTurn == player1) {
        $("score1").value = player1.score.toString();
    }
    else {
        $("score2").value = player2.score.toString();
    }
}
function holdDie() {
    $("die").value = "";
    game.playerTurn.gameTotal += game.playerTurn.score;
    if (game.playerTurn == player1) {
        player1.score = 0;
    }
    else {
        player2.score = 0;
    }
    displayPlayerScore();
    if (isGameOver()) {
        declareTheWinner();
    }
    changePlayers();
    $("total").value = game.playerTurn.gameTotal.toString();
}
function $(id) {
    return document.getElementById(id);
}
function resetPlayersAndGame() {
    player1.score = 0;
    player1.gameTotal = 0;
    player2.score = 0;
    player2.gameTotal = 0;
    game.gameOver = false;
}
function isGameOver() {
    if (game.playerTurn.gameTotal > 99) {
        game.gameOver = true;
    }
    return game.gameOver;
}
