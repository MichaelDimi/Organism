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
        let isValid = checkDirection(organism.cells, parentCell, directions[i]);
        // If a cell is spawned
        if (isValid) { 
            dir = directions[i];

            // Create the cell and add to organism
            let childCell = new Cell(parentCell.scaledX + dir.x, parentCell.scaledY + dir.y, CELL_SIZE, CELL_SIZE, CellTypes.bud, dir);
            organism.cells.push(childCell);
            
            // If there is a cell above
            if (!checkDirection(organism.cells, childCell, Direction.above)) {
                // Set the child cell to have no top arrow
                childCell.setTopArrow(null);
                // Update the cell above to have not bottom arrow
                organism.getCell(childCell.scaledX, childCell.scaledY - 1).setBottomArrow(null);
            }
            if (!checkDirection(organism.cells, childCell, Direction.below)) {
                childCell.setBottomArrow(null);
                organism.getCell(childCell.scaledX, childCell.scaledY + 1).setTopArrow(null);
            }
            if (!checkDirection(organism.cells, childCell, Direction.left)) {
                childCell.setLeftArrow(null);
                organism.getCell(childCell.scaledX - 1, childCell.scaledY).setRightArrow(null);
            }
            if (!checkDirection(organism.cells, childCell, Direction.right)) {
                childCell.setRightArrow(null);
                organism.getCell(childCell.scaledX + 1, childCell.scaledY).setLeftArrow(null);
            }

            return;
        }
    }
    
    console.log("Not Valid Direction");
    // Removes it from being checked in the futur
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

function killRandBud(n){
    let buds = organism.getBuds();
    for(let i = 0; i<n; i++){
        let rand = randomInt(buds.length+1);
        buds[rand].setType(CellTypes.dead);
    }
}

