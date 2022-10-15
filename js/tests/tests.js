function testSetType() {
    organism.cells[0].setType(CellTypes.bud);
    console.log("NEW: ", organism.cells[0]);
}

function testChangeDirection() {
    organism.cells[0].setDirection(Direction.below);
    console.log("NEW: ", organism.cells[0]);
}
