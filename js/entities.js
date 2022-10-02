var gameBoard = {
    canvas: document.createElement("canvas"),
    create: function() {
        // Initializes context and inserts canvas into DOM
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas-container").insertBefore(this.canvas, document.getElementById("canvas-container").childNodes[0]);
    },
    update: function() {
        // Make canvas a multiple of 30
        this.canvas.width = CANVAS_W; 
        this.canvas.height = CANVAS_H;
    }
}

class cell {
    constructor(scaledX, scaledY, width, height, type, direction) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;
        this.width = width;
        this.height = height;
        this.type = type;
        if (this.type == CellTypes.default) {
            this.isPossibleParent = true;
        } else {
            this.isPossibleParent = false;
        }
        this.direction = direction;

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
    }

    setType(newType) {
        this.type = newType

        if (this.type == CellTypes.default) {
            this.isPossibleParent = true;
        } else {
            this.isPossibleParent = false;
        }
    }

    setDirection(newDirection) {
        this.direction = newDirection
    }
    
    drawCell() {
        ctx.lineWidth = CELL_STROKE;
        switch (this.type) {
            case CellTypes.default:
                ctx.strokeStyle = DEFAULT_COLOR;
                break;
            case CellTypes.bud:
                this.drawArrow();

                ctx.lineWidth = CELL_STROKE;
                ctx.strokeStyle = GREEN;
                break;
            case CellTypes.dead:
                ctx.strokeStyle = RED;
                break;
        } 
        ctx.roundedRect(this.x + 1.6, this.y + 1.6, this.width-1.6, this.height-1.6, 8).stroke();
    }

    drawArrow() {
        ctx.stokeWidth = 1;    
        ctx.strokeStyle = DEFAULT_COLOR;
        ctx.lineCap = "round";

        let d = this.direction;

        switch (d) {
            case Direction.below:
                ctx.beginPath();
                ctx.moveTo(this.x + 8.6                 ,this.y + CELL_SIZE/2 - 0.7);
                ctx.lineTo(this.x + CELL_SIZE / 2 + 0.75,this.y + CELL_SIZE/2 + 3.3); 
                ctx.lineTo(this.x + CELL_SIZE - 7       ,this.y + CELL_SIZE/2 - 0.7);
                ctx.stroke();
                break;
            case Direction.above:
                ctx.beginPath();
                ctx.moveTo(this.x + 8.6                 ,this.y + CELL_SIZE/2 + 2);
                ctx.lineTo(this.x + CELL_SIZE / 2 + 0.75,this.y + CELL_SIZE/2 - 2); 
                ctx.lineTo(this.x + CELL_SIZE - 7       ,this.y + CELL_SIZE/2 + 2);
                ctx.stroke();
                break;
            case Direction.left:
                ctx.beginPath();
                ctx.moveTo(this.x + CELL_SIZE/2 + 2,this.y + 8.6                 );
                ctx.lineTo(this.x + CELL_SIZE/2 - 2,this.y + CELL_SIZE / 2 + 0.75);
                ctx.lineTo(this.x + CELL_SIZE/2 + 2,this.y + CELL_SIZE - 7       );
                ctx.stroke();
                break;
            case Direction.right:
                ctx.beginPath();
                ctx.moveTo(this.x + CELL_SIZE/2 - 0.7,this.y + 8.6                 );
                ctx.lineTo(this.x + CELL_SIZE/2 + 3.3,this.y + CELL_SIZE / 2 + 0.75); 
                ctx.lineTo(this.x + CELL_SIZE/2 - 0.7,this.y + CELL_SIZE - 7       );
                ctx.stroke();
                break;
        }
    }
}

class Organism {
    constructor() {
        this.cells = [];
        this.energy = 100.0;
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
}