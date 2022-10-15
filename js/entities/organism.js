class Organism {
    constructor() {
        this.energy = 100.0; 
        this.cells = [];
        this.selected;

        this.cells.push = function () {
            //Do what you want here...
            document.getElementById("cell-counter").innerHTML++;
            return Array.prototype.push.apply(this, arguments);
        }
    }

    get getEnergy() {
        return this.energy;
    }

    set setEnergy(newEnergy) {
        this.energy = newEnergy;
    }

    getSize() {
        return this.cells.length;
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

    getSelectedCell() {
        return this.selected;
    }
}