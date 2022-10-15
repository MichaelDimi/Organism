class CellArrow  {
    constructor(cellScaledX, cellScaledY, offsetX, offsetY, direction, color) {
        this.cellScaledX = cellScaledX;
        this.cellScaledY = cellScaledY;

        this.direction = direction;

        this.color = color;

        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.x = (this.cellScaledX * 30 - CELL_SIZE / 2) + this.offsetX;
        this.y = (this.cellScaledY * 30 - CELL_SIZE / 2) + this.offsetY;
    }

    setColor(color) {
        this.color = color;
    }

    draw() {
        ctx.stokeWidth = 1;    
        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";

        let d = this.direction;

        let x = this.x;
        let y = this.y;

        switch (d) {
            case Direction.below:
                ctx.beginPath();
                ctx.moveTo(x + 8.6                 , y + CELL_SIZE/2 - 0.7);
                ctx.lineTo(x + CELL_SIZE / 2 + 0.75, y + CELL_SIZE/2 + 3.3); 
                ctx.lineTo(x + CELL_SIZE - 7       , y + CELL_SIZE/2 - 0.7);
                ctx.stroke();
                break;
            case Direction.above:
                ctx.beginPath();
                ctx.moveTo(x + 8.6                 , y + CELL_SIZE/2 + 2);
                ctx.lineTo(x + CELL_SIZE / 2 + 0.75, y + CELL_SIZE/2 - 2); 
                ctx.lineTo(x + CELL_SIZE - 7       , y + CELL_SIZE/2 + 2);
                ctx.stroke();
                break;
            case Direction.left:
                ctx.beginPath();
                ctx.moveTo(x + CELL_SIZE/2 + 2, y + 8.6               );
                ctx.lineTo(x + CELL_SIZE/2 - 2, y + CELL_SIZE/2 + 0.75);
                ctx.lineTo(x + CELL_SIZE/2 + 2, y + CELL_SIZE - 7     );
                ctx.stroke();
                break;
            case Direction.right:
                ctx.beginPath();
                ctx.moveTo(x + CELL_SIZE/2 - 0.7, y + 8.6               );
                ctx.lineTo(x + CELL_SIZE/2 + 3.3, y + CELL_SIZE/2 + 0.75); 
                ctx.lineTo(x + CELL_SIZE/2 - 0.7, y + CELL_SIZE - 7     );
                ctx.stroke();
                break;
        }
    }

    setCellScaledPos(cellScaledX, cellScaledY) {
        this.cellScaledX = cellScaledX;
        this.x = (this.cellScaledX * 30 - CELL_SIZE / 2) + this.offsetX;
        this.cellScaledY = cellScaledY;
        this.y = (this.cellScaledY * 30 - CELL_SIZE / 2) + this.offsetY;

        console.log(this)
    }
}

const ArrowType = {
    center: "center",
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right"
}