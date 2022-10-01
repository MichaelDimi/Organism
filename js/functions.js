function spawnNewCell() {
    // Get a shuffled array of directions to check - so it doesn't always check starting at the same direction
    let directions = getRandomDirections();

    // Get a random Parent cell
    let cellIndex = randomInt(organism.length);
    let parentCell = organism[cellIndex];

    let dir;
    

    // Check each direction that there is not cell there, and break once a valid direction is found
    for (let i = 0; i < directions.length; i++) {
        let isValid = checkDirection(organism, parentCell, directions[i]);
        if (isValid) { 
            // console.log(directions[i]);
            dir = directions[i];

            let childCell = new cell(parentCell.scaledX + dir.x, parentCell.scaledY + dir.y, CELL_SIZE, CELL_SIZE, CellTypes.bud);
            organism.push(childCell);
            setTimeout(() => {
                childCell.setType(CellTypes.dead);
              }, CELL_TIMEOUT);
            break;
        } else {
            console.log("Not Valid Direction");
        }
        
    }
    console.log(organism.length);
   
    
}

function getRandomDirections() {
    // Get a random direction
    let possibleDirections = [Direction.above, Direction.below, Direction.left, Direction.right];
    // shuffle possible directions
    for (let i = possibleDirections.length - 1; i > 0; i--) {
        let rand = randomInt(i + 1);
        let temp = possibleDirections[i];
        possibleDirections[i] = possibleDirections[rand];
        possibleDirections[rand] = temp;
    }

    // return the first shuffled directions
    return possibleDirections;
}

// TODO: make as a function of organism
function checkDirection(organism, parent, dir) {
    // loop through organism to check if there is a cell in that direction
    for (let i = 0; i < organism.length; i++) {
        // console.log(parent);
        // console.log(organism[i]);
        // if (parent == organism[i]) continue;
        if (parent.scaledX + dir.x == organism[i].scaledX && parent.scaledY + dir.y == organism[i].scaledY) {
            return false;
        }
    }

    return true
}

// Returns random int from 0 (inclusive) -> max (exlusive)
function randomInt(max) {
    return Math.floor(Math.random() * max);
}