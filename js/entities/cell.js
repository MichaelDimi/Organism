
class Cell {
    constructor(scaledX, scaledY, width, height, type, direction) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;
        this.width = width;
        this.height = height;
        this.direction = direction;

        this.setType(type);

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
    }

    setType(newType) {
        this.type = newType;
        this.isPossibleParent = this.type == CellTypes.default;
        if (this.type == CellTypes.bud) {
            this.centerArrow = new CellArrow(this.scaledX, this.scaledY, 0, 0, this.direction, DEFAULT_COLOR);

            // MARK: May remove - Not sure if we ever go from dead or default to bud.
            // Check its neighbors and then set arrows
            if (checkDirection(organism.cells, this, Direction.above)) {
                this.topArrow = new CellArrow(this.scaledX, this.scaledY, 0, -22, Direction.above, DEFAULT_COLOR_transparent);
            }
            if (checkDirection(organism.cells, this, Direction.below)) {
                this.bottomArrow = new CellArrow(this.scaledX, this.scaledY, 0, 22, Direction.below, DEFAULT_COLOR_transparent);
            }
            if (checkDirection(organism.cells, this, Direction.left)) {
                this.leftArrow = new CellArrow(this.scaledX, this.scaledY, -22, 0, Direction.left, DEFAULT_COLOR_transparent);
            }
            if (checkDirection(organism.cells, this, Direction.right)) {
                this.rightArrow = new CellArrow(this.scaledX, this.scaledY, 22, 0, Direction.right, DEFAULT_COLOR_transparent);
            }

        } else {
            this.centerArrow = null;
            this.topArrow = null;
            this.bottomArrow = null;
            this.leftArrow = null;
            this.rightArrow = null;
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