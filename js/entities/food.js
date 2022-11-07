class Food {
    static STATE = {
        idle: "idle",
        growing: "growing",
        grown: "grown"
    }

    constructor(scaledX, scaledY) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;

        this.color = FOOD_COLOR.light;

        this.neighborBuds = [];

        this.state = Food.STATE.idle;

        this.timeSinceGrown = 0;

    }

    drawFood() {

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4.2;
        ctx.lineCap = "round";

        let x = this.x + this.width / 2;
        let y = this.y + this.height / 2 + 1;

        ctx.beginPath();
        ctx.moveTo(x + 2, y - 6);
        ctx.lineTo(x - 1.5, y - 1);
        ctx.arcTo(x - 2, y + 0.5, x + 2, y + 0.5, 0.5);
        ctx.lineTo(x + 2, y+ 0.5);
        ctx.arcTo(x + 5.7, y + 0.5, x + 4.7, y + 1, 0.5)
        ctx.lineTo(x + 0.6, y + 6.6);
        ctx.stroke();
    }

    blink() {
        let blinkRate = 0.01 + (this.neighborBuds.length-1)/1000;
        // 1 Bud  -> 0.010
        // 2 Buds -> 0.011
        // ...
        // 8 Buds -> 0.017 (nearly impossible)

        let opacity = 0.33*(Math.cos(blinkRate*oldTimeStamp) + 2); 
        this.color = FOOD_COLOR.blink + opacity + ")";
    }
}