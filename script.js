//store game status
const statusDisplay = document.querySelector('.game-status');


//some variables to store the progress of game
let gameActive = true;  //to pause the game in an end scenario
let currentPlayer ="X";  //storing the current player
let gameState = ["","","","","","","","",""]; //storing current game status 


//Displaying certain messages for varoious scenarios
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It is ${currentPlayer}'s turn`;

//initial message
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleCellClick(clickedCellEvent) {
    
    //save clicked html element in a variable for easier further use 
    const clickedCell = clickedCellEvent.target;

     /*Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid.
     Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an integer(number)*/
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    //if game is paused or if that particular cell has been checked then we do nothing
    if(gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }



function handleCellPlayed(){
    //reflect the palyed move
    //update the UI to reflect the played move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}


function handlePlayerChange(){
    currentPlayer = currentPlayer === "X"? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleResultValidation() {
    let roundWon = false;
     for(let i = 0; i<=7; i++){
         const winCondition = winningConditions[i];
         let a = gameState[winCondition[0]];
         let b = gameState[winCondition[1]];
         let c = gameState[winCondition[2]];
         if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
     }
     if(roundWon){
         statusDisplay.innerHTML = winningMessage();
         gameActive = false;
         return;
     }
  
     /* We will check weather there are any values in our game state array 
     that are still not populated with a player sign*/
     let roundDraw = !gameState.includes("");
     if(roundDraw){
         statusDisplay.innerHTML = drawMessage();
         gameActive = false;
         return;
     }
     /*If we get to here we know that the no one won the game yet,
     and that there are still moves to be played, so we continue by changing the current player.*/
     handlePlayerChange();
}


    //proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}


function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


//adding event listeners to actual game listeners
document.querySelectorAll('.cell').forEach(cell =>cell.addEventListener('click',handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
