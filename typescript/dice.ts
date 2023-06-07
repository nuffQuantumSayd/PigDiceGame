class Player{
    name:string;
    score:number;
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
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    
    //set currentPlayerName to the next player
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

        //create player two and set score
        player2.name = $("player2").value;
        player2.score = 0;

        //show the players
        console.log("players created");
        console.log(player1);
        console.log(player2);
        console.log("game created");
        console.log(game);

        //set the current player to player 1
        game.playerTurn = player1;

        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
    //if both players don't have a name display error

    //if both players do have a name start the game!
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
    
    let currTotal = getCurrentTotal();
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let roll = generateRandomValue(1, 6);
    alert(roll);
    //if the roll is 1
    //  change players
    //  set current total to 0
    if(roll == 1){
        changePlayers();
        currTotal = 0;
    }
    
    //if the roll is greater than 1
    //  add roll value to current total
    else{
        currTotal += roll;
    }

    //set the die roll to value player rolled
    //display current total on form
    (<HTMLInputElement>document.getElementById("die")).value = roll.toString();
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

function getCurrentTotal():number{
    let currentTotal = parseInt($("total").value);
    return currentTotal;
}

function holdDie():void{
    //get the current turn total
    let currentTotal = getCurrentTotal();

    //determine who the current player is
    //add the current turn total to the player's total score

    //reset the turn total to 0
    (<HTMLInputElement>$("total")).value = "0";
    //change players
    changePlayers();
}

function $(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}