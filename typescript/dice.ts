class Player{
    name:string;
    score:number;
    gameTotal:number;
}

class Game{
    playerTurn:Player;
    currentTurnTotal:number;
    gameOver:boolean;
    
    constructor(playerTurn:Player, currentTurnTotal:number, gameOver:boolean){
        this.playerTurn = playerTurn;
        this.currentTurnTotal = currentTurnTotal;
        this.gameOver = gameOver;
    }
}

//initialize players and game object
let player1:Player = new Player();
let player2:Player = new Player();
let game:Game = new Game(player1, 0, false);


function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    //TODO: use random to generate a number between min and max
    let randomDiceRoll = Math.floor(random * maxValue) + minValue;
    return randomDiceRoll;
}


function changePlayers():void{
    //let currentPlayerName = document.getElementById("current").innerText;
    // let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    // let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    //swap from player to player by comparing current name to player names
    if (game.playerTurn == player1){
        game.playerTurn = player2;
    }
    else{
        game.playerTurn = player1;
    }    
    //set currentPlayerName to the next player
    $("current").innerText = game.playerTurn.name;
}

window.onload = function(){
    
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0

    //verify each player has a name
    if(!verifyPlayerName("player1") || !verifyPlayerName("player2")){
        alert("Please enter a name for both players");
    }
    else{
        //create player one and set score
        player1.name = $("player1").value;
        player1.score = 0;
        player1.gameTotal = 0;

        //create player two and set score
        player2.name = $("player2").value;
        player2.score = 0;
        player2.gameTotal = 0;

        //show the players
        console.log("players created");
        console.log(player1);
        console.log(player2);
        console.log("game created");
        console.log(game);

        //set the current player to player 1
        game.playerTurn = player2;

        document.getElementById("turn").classList.add("open");
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
        $("total").value = game.playerTurn.gameTotal.toString();
    }
    //if both players don't have a name display error

    //if both players do have a name start the game!
}

function declareTheWinner(){
    alert("The winner is " + game.playerTurn.name + " with a score of " + game.playerTurn.gameTotal);
    resetPlayersAndGame();
}

function verifyPlayerName(id:string):boolean{
    if($(id).value == null || $(id).value == ""){
        return false;
    }
    return true;
    
}

function createNewPlayer(id:string){
    let player = new Player();
    player.name = $(id).value;
    player.score = 0;
    return player;
}

function rollDie():void{
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let roll = generateRandomValue(1, 6);

    //if the roll is 1
    //  change players
    //  set current total to 0
    if(roll == 1){
        game.playerTurn.score = 0;
        displayPlayerScore();
        changePlayers();
    }
    
    
    //if the roll is greater than 1
    //  add roll value to current total
    else{
        game.playerTurn.score += roll;
        //display the score
        displayPlayerScore(); 
    }

    //set the die roll to value player rolled
    //display current total on form
    (<HTMLInputElement>document.getElementById("die")).value = roll.toString();
    (<HTMLInputElement>document.getElementById("total")).value = game.playerTurn.gameTotal.toString();
}


function displayPlayerScore():void{
    if(game.playerTurn == player1){
        $("score1").value = player1.score.toString();
    }
    else{
        $("score2").value = player2.score.toString();
    }
}

function getCurrentTotal():number{
    let currentTotal = parseInt($("total").value);
    return currentTotal;
}

function holdDie():void{
    //reset the value of the die to no value
    $("die").value = "";
    
    //get the value of the player score and add it to the current players total
    game.playerTurn.gameTotal += game.playerTurn.score;

    if(game.playerTurn == player1){
        player1.score = 0;
    }
    else{
        player2.score = 0;
    }
    displayPlayerScore();
    
    if(isGameOver()){
        declareTheWinner();
    }
    
    changePlayers();
    //display the total of the next player
    $("total").value = game.playerTurn.gameTotal.toString();
    
}

function $(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}
function resetPlayersAndGame() {
    player1.score = 0;
    player1.gameTotal = 0;

    player2.score = 0;
    player2.gameTotal = 0;

    game.gameOver = false;
}
function isGameOver():boolean {
    if(game.playerTurn.gameTotal > 99){
        game.gameOver = true;
    }
    return game.gameOver;
}

