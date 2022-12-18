let canvas = gameBoard.canvas;
let ctx;

let cameraOffset = { x: 0, y: 0 }
let cameraZoom = 1

let viewCenter;

// Used for map painter
let brushSize = 35; 

function painterDraw() {
    gameBoard.update();

    // Translate to the canvas centre before zooming 
    // - so you'll always zoom on what you're looking directly at
    ctx.translate( canvas.width / 2, canvas.height / 2); // move to middle
    ctx.scale(cameraZoom, cameraZoom); // scale (always scale from the center)
    // move back plus offset
    ctx.translate( -canvas.width/2 + cameraOffset.x, -canvas.height/2 + cameraOffset.y);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear for drawing

    lake.drawLake();

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.beginPath();
    ctx.arc(canvas.width/2 + 0.8, canvas.height/2 + 0.8, 4, 0, 2*Math.PI);
    ctx.fill();

    // Draw the background lines
    for (let i = 16; i < CANVAS_W; i+=CELL_SIZE+3) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_H);
        ctx.stroke();
    }
    for (let i = 16; i < CANVAS_H; i+=CELL_SIZE+3) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_W, i);
        ctx.stroke();
    }

    // Draw a circle for the brush
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 0.5;
    ctx.roundedRect(painterCanvasPosX - brushSize/2, painterCanvasPosY - brushSize/2, brushSize, brushSize, 12).stroke();
}