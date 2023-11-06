const knight = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
const gameBoard = [new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false), new Array(8).fill(false)]

function isPossible(x, y){
    if(x >= 0 && y >= 0 && x <= 7 && y <= 7){
        return true;
    }
    return false;
}

function knightMoves(start, end){
    let queue = [{x: start[0],y:start[1], previous: null}];
    while(queue.length > 0){
        
        let currentStep = queue.shift();
        //console.log(currentStep);
        
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
        gameBoard[currentStep.x][currentStep.y] = true
        
        knight.forEach(move =>{
            if(isPossible(currentStep.x + move[0], currentStep.y + move[1]) && !gameBoard[currentStep.x + move[0]][currentStep.y + move[1]]){
                queue.push({x:currentStep.x + move[0], y:currentStep.y + move[1], previous: currentStep})
                gameBoard[currentStep.x + move[0]][currentStep.y + move[1]] = true;
            }
        })
        
    }
}

function getSteps(move){
    if(!move.previous){
        return [move]
    }
    let lastMove = getSteps(move.previous);
    return lastMove.concat(move);
}

knightMoves([0,0],[7,7])