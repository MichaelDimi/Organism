class Food {
    constructor(scaledX, scaledY) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;

        this.color = ORANGE;

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
    }

    drawFood() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4.5;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2 + 2, this.y + 10);
        ctx.lineTo(this.x + this.width / 2 - 1, this.y + this.height / 2 + 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2 + 2.5, this.y + 15);
        ctx.lineTo(this.x + this.width / 2 - 0.5, this.y + this.height / 2 + 6);
        ctx.stroke();
    }
}