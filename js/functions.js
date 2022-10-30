function spawnNewBud() {
    // Get a shuffled array of directions to check - so it doesn't always check starting at the same direction
    let directions = getRandomDirections();

    // Get a random (possible) parent cell that
    let possibleParentCells = organism.getPossibleParents();
    if (possibleParentCells.length < 1) {
        console.log("No valid parents");
        return;
    }

    let cellIndex = randomInt(possibleParentCells.length);
    let parentCell = possibleParentCells[cellIndex]; 

    let dir;

    // Break once a valid direction is found
    for (let i = 0; i < directions.length; i++) {
        let isValid = checkDirection(parentCell, directions[i]);
        // If a cell is spawned
        if (isValid) { 
            dir = directions[i];

            // Create the cell and add to organism
            let childCell = new Bud(parentCell.scaledX + dir.x, parentCell.scaledY + dir.y, CELL_SIZE, CELL_SIZE, dir);
            organism.cells.push(childCell);
            obstructions.push({ x: childCell.scaledX, y: childCell.scaledY });
            
            childCell.computeAdjacentCellArrows();

            return;
        }
    }
    
    console.log("Not Valid Direction");
    // Removes it from being checked in the future
    parentCell.isPossibleParent = false;
}

function spawnRandomFood(origin, scaledD) {
    console.log(origin)

    let randX = randomIntRange(origin.x - scaledD, origin.x + scaledD);
    let randY = randomIntRange(origin.y - scaledD, origin.y + scaledD);

    // Make sure there is no obstruction at (randX, randY)
    if (isObstructedAt(randX, randY)) {
        console.log("Couldn't spawn food")
        return;
    }

    let newFood = new Food(randX, randY);
    foods.push(newFood);
    obstructions.push({ x: newFood.scaledX, y: newFood.scaledY });
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

    // return the shuffled directions
    return possibleDirections;
}

function checkDirection(origin, dir) {
    // Loop through obstructions to see if there is something there
    for (let i = 0; i < obstructions.length; i++) {
        let obstr = obstructions[i];
        if (origin.scaledX + dir.x == obstr.x && origin.scaledY + dir.y == obstr.y) {
            return false;
        }
    }

    return true;
}

function isObstructedAt(scaledX, scaledY) {
    for (let i = 0; i < obstructions.length; i++) {
        let obstr = obstructions[i];
        if (scaledX == obstr.x && scaledY == obstr.y) {
            return true;
        }
    }
    return false;
}