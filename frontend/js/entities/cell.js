
class Cell {
    constructor(scaledX, scaledY, width, height) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;
        this.width = width;
        this.height = height;

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
    }

    setType(newType) {
        this.type = newType;
    }
    
    drawCell() {
        ctx.lineWidth = CELL_STROKE;
        ctx.strokeStyle = DEFAULT_COLOR;
            
        ctx.roundedRect(this.x + 1.6, this.y + 1.6, this.width-1.6, this.height-1.6, 8).stroke();
    }

    setScaledPos(scaledX, scaledY) {
        this.scaledX = scaledX;
        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.scaledY = scaledY;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
    }
}

class Bud extends Cell {
    constructor(scaledX, scaledY, width, height, direction) {
        super(scaledX, scaledY, width, height);
        this.direction = direction

        this.topArrow = null;
        this.bottomArrow = null;
        this.leftArrow = null;
        this.rightArrow = null;
        this.drawArrows = true;

        this.cooldown = 1;
        // this.drawCooldown = false;

        this.centerArrow = new CellArrow(this.scaledX, this.scaledY, 0, 0, this.direction, DEFAULT_COLOR);

        // Set the arrows when a new cell spawns
        this.computeCellArrows();

        // Assign this cell to nearby food when it spawns
        this.assignToFood();
    }

    // TODO FIX: Moving out of the range of food, causes it to re-blink even if theres another bud their that should load it
    moveCell(direction) { 
        // Get the current x and y for use after moving
        // Used to figure out if the food should stop flashing
        let prevX = this.scaledX;
        let prevY = this.scaledY;

        // Set the new scaledX/Y (Also recomputes x and y)
        this.setScaledPos(this.scaledX + direction.x, this.scaledY + direction.y);
        this.setDirection(direction);

        obstructions.push({ x: this.scaledX, y: this.scaledY });
        
        // spawn a new cell in the cells previous position
        let newCell = new Cell(prevX, prevY, CELL_SIZE, CELL_SIZE);
        organism.cells.push(newCell);
        // No need to add this to the obstructions, 
        //  since that coord was already added when the bud was spawned or moved

        this.cooldown = 1;

        this.assignToFood();
    }

    computeCellArrows() {
        // Check its neighbors and then set arrows
        if (checkDirection(this, Direction.above)) {
            this.topArrow = new CellArrow(this.scaledX, this.scaledY, 0, -22, Direction.above, DEFAULT_COLOR_transparent);
        } else {
            this.setTopArrow(null);
            let adjacentCell = organism.getCell(this.scaledX, this.scaledY - 1);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setBottomArrow(null);
            }
        }
        if (checkDirection(this, Direction.below)) {
            this.bottomArrow = new CellArrow(this.scaledX, this.scaledY, 0, 22, Direction.below, DEFAULT_COLOR_transparent);
        } else {
            this.setBottomArrow(null);
            let adjacentCell = organism.getCell(this.scaledX, this.scaledY + 1);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setTopArrow(null);
            }
        }
        if (checkDirection(this, Direction.left)) {
            this.leftArrow = new CellArrow(this.scaledX, this.scaledY, -22, 0, Direction.left, DEFAULT_COLOR_transparent);
        } else {
            this.setLeftArrow(null);
            let adjacentCell = organism.getCell(this.scaledX - 1, this.scaledY);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setRightArrow(null);
            }
        }
        if (checkDirection(this, Direction.right)) {
            this.rightArrow = new CellArrow(this.scaledX, this.scaledY, 22, 0, Direction.right, DEFAULT_COLOR_transparent);
        } else {
            this.setRightArrow(null);
            let adjacentCell = organism.getCell(this.scaledX + 1, this.scaledY);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setLeftArrow(null);
            }
        }
    }

    computeAdjacentCellArrows() {
        // If there is a cell above
        if (!checkDirection(this, Direction.above)) {
            // Set the child cell to have no top arrow
            this.setTopArrow(null);
            // Update the cell above to have not bottom arrow
            let adjacentCell = organism.getCell(this.scaledX, this.scaledY - 1);
            // Check not null in case the obstruction is not a cell (food, etc.)
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setBottomArrow(null);
            }            
        } else if (!checkDirection(this, Direction.below)) {
            this.setBottomArrow(null);
            let adjacentCell = organism.getCell(this.scaledX, this.scaledY + 1);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setTopArrow(null);
            }
        } else if (!checkDirection(this, Direction.left)) {
            this.setLeftArrow(null);
            let adjacentCell = organism.getCell(this.scaledX - 1, this.scaledY);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setRightArrow(null);
            }
        } else if (!checkDirection(this, Direction.right)) {
            this.setRightArrow(null);
            let adjacentCell = organism.getCell(this.scaledX + 1, this.scaledY);
            if (adjacentCell != undefined && adjacentCell instanceof Bud) {
                adjacentCell.setLeftArrow(null);
            }
        }
    }

    assignToFood() {
        for (const food of foods) {
            if ((this.scaledX == food.scaledX - 1 && this.scaledY == food.scaledY + 1) ||
                (this.scaledX == food.scaledX     && this.scaledY == food.scaledY + 1) ||
                (this.scaledX == food.scaledX + 1 && this.scaledY == food.scaledY + 1) ||
                (this.scaledX == food.scaledX - 1 && this.scaledY == food.scaledY    ) ||
                (this.scaledX == food.scaledX + 1 && this.scaledY == food.scaledY    ) ||
                (this.scaledX == food.scaledX - 1 && this.scaledY == food.scaledY - 1) ||
                (this.scaledX == food.scaledX     && this.scaledY == food.scaledY - 1) ||
                (this.scaledX == food.scaledX + 1 && this.scaledY == food.scaledY - 1)) {
                    if (!food.neighborBuds.includes(this)) {
                        food.neighborBuds.push(this);
                    }
            } else {
                if (food.neighborBuds.includes(this)) {
                    food.neighborBuds.splice(this, 1);
                }
            }
        }
    }

    setScaledPos(scaledX, scaledY) {
        this.scaledX = scaledX;
        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.scaledY = scaledY;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;

        // Move the arrows too
        this.centerArrow.setCellScaledPos(this.scaledX, this.scaledY);
        if (this.topArrow != null)
            this.topArrow.setCellScaledPos(this.scaledX, this.scaledY);
        if (this.bottomArrow != null)
            this.bottomArrow.setCellScaledPos(this.scaledX, this.scaledY);
        if (this.leftArrow != null)
            this.leftArrow.setCellScaledPos(this.scaledX, this.scaledY);
        if (this.rightArrow != null)
            this.rightArrow.setCellScaledPos(this.scaledX, this.scaledY);
    }
    setDirection(newDirection) {
        this.direction = newDirection;
        this.centerArrow.direction = newDirection;
    }
    setCenterArrow(centerArrow) {
        this.centerArrow = centerArrow
    }
    setTopArrow(topArrow) {
        this.topArrow = topArrow
    }
    setBottomArrow(bottomArrow) {
        this.bottomArrow = bottomArrow
    }
    setLeftArrow(leftArrow) {
        this.leftArrow = leftArrow
    }
    setRightArrow(rightArrow) {
        this.rightArrow = rightArrow
    }

    drawCell() {
        ctx.lineWidth = CELL_STROKE;

        // Draw transparent rectangle, height based on cooldown
        let d = 2; 
        ctx.fillStyle = "rgba(1, 133, 53, 0.25)";
        ctx.fillRect(
            this.x + d,
            this.y + CELL_SIZE - d, 
            CELL_SIZE - d, 
            (-CELL_SIZE+6)*this.cooldown
        );

        this.centerArrow.draw();

        // if it is selected, draw the side arrows that are not null
        if (this == organism.selected) {
            if (this.topArrow != null)
                this.topArrow.draw();
            if (this.bottomArrow != null)
                this.bottomArrow.draw();
            if (this.leftArrow != null)
                this.leftArrow.draw();
            if (this.rightArrow != null)
                this.rightArrow.draw();
        }

        ctx.lineWidth = CELL_STROKE;
        ctx.strokeStyle = GREEN;

        ctx.roundedRect(this.x + 1.6, this.y + 1.6, this.width-1.6, this.height-1.6, 8).stroke();
    }
}

class Dead extends Cell {
    constructor(scaledX, scaledY, width, height) {
        super(scaledX, scaledY, width, height);
    }

    drawCell() {
        ctx.strokeStyle = RED;
        // ctx.strokeStyle = "rgba(255,0,0,0.5";
        ctx.roundedRect(this.x + 1.6, this.y + 1.6, this.width-1.6, this.height-1.6, 8).stroke();
    }
}