function spawnNewCell() {
    let directions = getRandomDirections();

    let cellIndex = randomInt(organism.length);
    let parentCell = organism[cellIndex];

    let dir;

    for (let i = 0; i < directions.length; i++) {
        let isValid = checkDirection(organism, parentCell, directions[i]);
        if (isValid) { 
            // console.log(directions[i]);
            dir = directions[i];

            let childCell = new cell(parentCell.scaledX + dir.x, parentCell.scaledY + dir.y, CELL_SIZE, CELL_SIZE, CellTypes.bud, dir);
            organism.push(childCell);

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