class Organism {
    constructor() {
        this.cells = [];
        this.energy = 100.0;
        this.selected;
    }

    getDefaultCells() {
        let defaultCells = [];
        for (const cell of this.cells) {
            if (cell.type == CellTypes.default) {
                defaultCells.push(cell);
            }
        }

        return defaultCells;
    }

    getBuds() {
        let budCells = [];
        for (const cell of this.cells) {
            if (cell.type == CellTypes.bud) {
                budCells.push(cell);
            }
        }

        return budCells;
    }

    getDeadCells() {
        let deadCells = [];
        for (const cell of this.cells) {
            if (cell.type == CellTypes.dead) {
                deadCells.push(cell);
            }
        }

        return deadCells;
    }

    getPossibleParents() {
        let possibleParents = [];
        for (const cell of this.cells) {
            if (cell.isPossibleParent) {
                possibleParents.push(cell);
            }
        }

        return possibleParents;
    }

    getCell(scaledX, scaledY) {
        for (const cell of this.cells) {
            if (cell.scaledX == scaledX && cell.scaledY == scaledY) {
                return cell;
            }
        }

        console.log("No such cell exists");
        return null;
    }

    setSelectedCell(scaledX, scaledY) {
        for (const cell of this.cells) {
            if (cell.scaledX == scaledX && cell.scaledY == scaledY) {
                if (cell.type == CellTypes.bud) {
                    // set the cell to be selected
                    this.selected = cell;
                    return;
                } else {
                    return;
                }
            }
        }

        this.selected = null;
    }
}