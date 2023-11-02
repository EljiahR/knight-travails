let gameBoard = [];
for(let column = 0; column < 7; column++){
    let arr = [];
    for(let row = 0; row < 7; row++){
        arr.push([column, row]);
    }
    gameBoard.push(arr);
}
console.log(gameBoard[0][6])