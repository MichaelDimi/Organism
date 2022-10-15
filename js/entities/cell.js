
class Cell {
    constructor(scaledX, scaledY, width, height, type, direction) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;
        this.width = width;
        this.height = height;
        this.direction = direction;

        this.topArrow = null;
        this.bottomArrow = null;
        this.leftArrow = null;
        this.rightArrow = null;

        this.setType(type);

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
    }

    setType(newType) {
        this.type = newType;
        this.isPossibleParent = this.type == CellTypes.default;
        if (this.type == CellTypes.bud) {
            this.centerArrow = new CellArrow(this.scaledX, this.scaledY, 0, 0, this.direction, DEFAULT_COLOR);

            // MARK: May remove - Not sure if we ever go from dead or default, to bud.
            this.computeCellArrows()

        } else {
            this.centerArrow = null;
            this.topArrow = null;
            this.bottomArrow = null;
            this.leftArrow = null;
            this.rightArrow = null;
        }
    }

    computeCellArrows() {
        // Check its neighbors and then set arrows
        if (checkDirection(organism.cells, this, Direction.above)) {
            this.topArrow = new CellArrow(this.scaledX, this.scaledY, 0, -22, Direction.above, DEFAULT_COLOR_transparent);
        } else {
            this.setTopArrow(null);
            organism.getCell(this.scaledX, this.scaledY - 1).setBottomArrow(null);
        }
        if (checkDirection(organism.cells, this, Direction.below)) {
            this.bottomArrow = new CellArrow(this.scaledX, this.scaledY, 0, 22, Direction.below, DEFAULT_COLOR_transparent);
        } else {
            this.setBottomArrow(null);
            organism.getCell(this.scaledX, this.scaledY + 1).setTopArrow(null);
        }
        if (checkDirection(organism.cells, this, Direction.left)) {
            this.leftArrow = new CellArrow(this.scaledX, this.scaledY, -22, 0, Direction.left, DEFAULT_COLOR_transparent);
        } else {
            this.setLeftArrow(null);
            organism.getCell(this.scaledX - 1, this.scaledY).setRightArrow(null);
        }
        if (checkDirection(organism.cells, this, Direction.right)) {
            this.rightArrow = new CellArrow(this.scaledX, this.scaledY, 22, 0, Direction.right, DEFAULT_COLOR_transparent);
        } else {
            this.setRightArrow(null);
            organism.getCell(this.scaledX + 1, this.scaledY).setLeftArrow(null);
        }
    }

    setDirection(newDirection) {
        this.direction = newDirection;
        this.centerArrow.direction = newDirection;
    }
    
    drawCell(color) {
        ctx.lineWidth = CELL_STROKE;
        switch (this.type) {
            case CellTypes.default:
                ctx.strokeStyle = DEFAULT_COLOR;
                break;
            case CellTypes.bud:
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
                ctx.strokeStyle = color;
                break;
            case CellTypes.dead:
                ctx.strokeStyle = RED;
                break;
        } 
        ctx.roundedRect(this.x + 1.6, this.y + 1.6, this.width-1.6, this.height-1.6, 8).stroke();
    }

    moveCell(direction) {
        console.log(direction)
        // Set the new scaledX/Y (Also recomputes x and y)
        this.setScaledPos(this.scaledX + direction.x, this.scaledY + direction.y);
        this.setDirection(direction);
        
        // spawn a new cell in the cells previous position
        let newCell = new Cell(this.scaledX - direction.x, 
                               this.scaledY - direction.y,
                               CELL_SIZE, CELL_SIZE, CellTypes.default, 
                               Direction.down);
        organism.cells.push(newCell);
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
}