var Player = (function () {
    function Player() {
    }
    return Player;
}());
var Game = (function () {
    function Game() {
    }
    return Game;
}());
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    var randomDiceRoll = Math.floor(random * maxValue) + minValue;
    return randomDiceRoll;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
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
        var player1 = createNewPlayer("player1");
        var player2 = createNewPlayer("player2");
        console.log("players created");
        console.log(player1);
        console.log(player2);
        var game = new Game();
        game.playerTurn = player1;
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function verifyPlayerName(id) {
    if ($(id).value == null || $(id).value == "") {
        return false;
    }
    return true;
}
function createNewPlayer(id) {
    var player = new Player();
    player.name = $(id).value;
    player.score = 0;
    return player;
}
function rollDie() {
    var currTotal = getCurrentTotal();
    var roll = generateRandomValue(1, 6);
    alert(roll);
    if (roll == 1) {
        changePlayers();
        currTotal = 0;
    }
    else {
        currTotal += roll;
    }
    document.getElementById("die").value = roll.toString();
    document.getElementById("total").value = currTotal.toString();
}
function getCurrentTotal() {
    var currentTotal = parseInt($("total").value);
    return currentTotal;
}
function holdDie() {
    var currentTotal = getCurrentTotal();
    $("total").value = "0";
    changePlayers();
}
function $(id) {
    return document.getElementById(id);
}