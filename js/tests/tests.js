function testUpdateCellType() {
    organism[0].setType(CellTypes.bud);
    console.log("NEW: ", organism[0]);
}

function testChangeDirection() {
    organism[0].setDirection(Direction.below);
    console.log("NEW: ", organism[0]);
}