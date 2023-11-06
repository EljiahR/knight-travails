//Possible modifiers to any given position for a legal knight move
const knight = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];

//Initializing simulation of chess spaces, all with a boolean value representing
//whether they've been visited
const gameBoard = [new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false)]

//Checks if in or outside the board
function isPossible(x, y){
    if(x >= 0 && y >= 0 && x <= 7 && y <= 7){
        return true;
    }
    return false;
}

// Main operating function, takes initial and target coordinates and spits out an optimized path to the target
function knightMoves(start, end){

    // Initializing queue to start while loop
    let queue = [{x: start[0],y:start[1], previous: null}];
    while(queue.length > 0){
        
        // Taking next step in queue
        let currentStep = queue.shift();
        
        // Checking if target location
        if(currentStep.x == end[0] && currentStep.y == end[1]){
            
            let steps = getSteps(currentStep);
            let stepString = ''
          
            steps.forEach(step => {
                if(step.x == start[0] && step.y == start[1]){
                    stepString = `[${step.x}, ${step.y}] `
                }else {
                    stepString += `-> [${step.x}, ${step.y}] `
                }
            })
            
            console.log(`[${start[0]}, ${start[1]}] to [${end[0]}, ${end[1]}] found in ${steps.length - 1} move(s)`);
            console.log(stepString);
            
            return
        }

        // Setting current space to visited to avoid overflowing queue with repeat spaces
        gameBoard[currentStep.x][currentStep.y] = true  
       
        // Filling queue with possible moves from current space that have not been previously visited
        knight.forEach(move =>{
            if(isPossible(currentStep.x + move[0], currentStep.y + move[1]) && !gameBoard[currentStep.x + move[0]][currentStep.y + move[1]]){
                queue.push({x:currentStep.x + move[0], y:currentStep.y + move[1], previous: currentStep})
                gameBoard[currentStep.x + move[0]][currentStep.y + move[1]] = true;
            }
        })
        
    }
}

// Recursive function to get array of moves to end in order
function getSteps(move){
    if(!move.previous){
        return [move]
    }
    let lastMove = getSteps(move.previous);
    return lastMove.concat(move);
}

knightMoves([0,0],[7,7])