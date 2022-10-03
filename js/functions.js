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

    // Check each direction that there is not cell there, and break once a valid direction is found
    for (let i = 0; i < directions.length; i++) {
        let isValid = checkDirection(organism.cells, parentCell, directions[i]);
        if (isValid) { 
            dir = directions[i];

            let childCell = new cell(parentCell.scaledX + dir.x, parentCell.scaledY + dir.y, CELL_SIZE, CELL_SIZE, CellTypes.bud, dir);
            organism.cells.push(childCell);

            setTimeout(() => {
                childCell.setType(CellTypes.dead);
            }, CELL_TIMEOUT);

            return;
        } else {
            // Remove from possible parents
            console.log("Not Valid Direction");
        }
    }

    // If it checks all directions and does not return the function, set the parent cell to be invalid
    // Removes it from being checked in the future
    parentCell.isPossibleParent = false;
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

function checkDirection(cells, parent, dir) {
    // loop through cells to check if there is a cell in that direction
    for (let i = 0; i < cells.length; i++) {
        if (parent.scaledX + dir.x == cells[i].scaledX && parent.scaledY + dir.y == cells[i].scaledY) {
            return false;
        }
    }

    return true
}