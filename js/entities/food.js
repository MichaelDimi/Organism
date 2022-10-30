class Food {
    static STATE = {
        idle: "idle",
        growing: "growing",
        growm: "grown"
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

    // MARK: Depricated
    setShouldBlink(blink) {
        if (blink == false) {
            this.color = FOOD_COLOR.normal
        }
        this.shouldBlink = blink
    }

    drawFood() {
        // console.log(this);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4.2;
        ctx.lineCap = "round";

        let x = this.x + this.width / 2;
        let y = this.y + this.height / 2;

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
        let opacity = 0.33*(Math.cos(0.01*oldTimeStamp) + 2); 
        this.color = FOOD_COLOR.blink + opacity + ")";
    }
}