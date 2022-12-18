let oldTimeStamp = 0.0;
let fps;
let msPerTick = 1000;

let lake = new Lake();
var obstructions = [];

function startPaint() {
    gameBoard.create();

    center = { x: SCALED_CANVAS_W/2, y: SCALED_CANVAS_H/2 };
    ctx = gameBoard.context;
    ctx.imageSmoothingEnabled = false;

    requestAnimationFrame( painterLoop )
}

function painterLoop() {
    // if (!gameover && !paused) {
    //     update(secondsPassed);
    // }
    painterDraw();

    requestAnimationFrame( painterLoop );
}