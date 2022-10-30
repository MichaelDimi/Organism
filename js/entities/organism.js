class Organism {
    constructor() {
        this.energy = 100.0; 
        this.cells = [];
        this.selected;

        this.cells.push = function () {
            document.getElementById("cell-counter").innerHTML++;
            return Array.prototype.push.apply(this, arguments);
        }
    }

    killRandomBud() {
        // Get list of buds
        let buds = this.getBuds();
        if (buds.length < 1) {
            return;
        }
        // Get random bud
        let randBudIndex = randomInt(buds.length)
        let randomBud = buds[randBudIndex];
        let randCellIndex = organism.cells.indexOf(randomBud);
        
        // Replace bud with new dead cell
        let newDeadCell = new Dead(randomBud.scaledX, randomBud.scaledY, CELL_SIZE, CELL_SIZE);
        organism.cells.splice(randCellIndex, 1, newDeadCell); 

        // Make sure to remove the bud from each foods neighboring buds
        for (const food of foods) {
            if (food.neighborBuds.includes(randomBud)) {
                food.neighborBuds.splice(food.neighborBuds.indexOf(randomBud), 1);
            }
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
            if (cell instanceof Bud) {
                budCells.push(cell);
            }
        }

        return budCells;
    }

    getDeadCells() {
        let deadCells = [];
        for (const cell of this.cells) {
            if (cell instanceof Dead) {
                deadCells.push(cell);
            }
        }

        return deadCells;
    }

    getPossibleParents() {
        let possibleParents = [];
        for (const cell of this.cells) {
            if (!(cell instanceof Bud) && !(cell instanceof Dead)) {
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
                if (cell instanceof Bud) {
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

    // Depricated
    getBudPositions() { 
        let positions = [];
        for (const bud of organism.getBuds()) {
            positions.push({ x: bud.scaledX, y: bud.scaledY })
        }
        return positions;
    }
}