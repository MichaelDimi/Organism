var gameBoard = {
    canvas: document.createElement("canvas"),
    draw: function() {
        // Make canvas a multiple of 30
        this.canvas.width = CANVAS_W; 
        this.canvas.height = CANVAS_H;
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas-container").insertBefore(this.canvas, document.getElementById("canvas-container").childNodes[0]);
    }
}

let canvas = gameBoard.canvas;
let ctx;

const CellTypes = {
    default: "Default",
    bud: "Bud",
    dead: "Dead" 
}



// where a new cell will be placed relative to parent
const Direction = {
    above: { x: 0, y: -1, name: "above" },
    below: { x: 0, y: 1, name: "below" },
    left: { x: -1, y: 0, name: "left" },
    right: { x: 1, y: 0, name: "right" }
}

// function killCell(x){
//     let cell=x;
//     cell.type="Dead";
//     cell.drawCell();
// }
class cell {
    constructor(scaledX, scaledY, width, height, type, direction) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;
        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
        this.width = width;
        this.height = height;
        this.type = type;
        this.direction = direction;

        this.drawCell(this.type);
        
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
        ctx.roundedRect(this.x, this.y, this.width, this.height, 8).stroke();
    }

    drawArrow() {
        ctx.stokeWidth = 2;    
        ctx.strokeStyle = DEFAULT_COLOR;
        ctx.lineCap = "round";

        let d = this.direction;

        switch (d) {
            case Direction.below:
                ctx.beginPath();
                ctx.moveTo(this.x + 8            , this.y + CELL_SIZE/2 - 1);
                ctx.lineTo(this.x + CELL_SIZE / 2, this.y + CELL_SIZE/2 + 3); // arrow tip
                ctx.lineTo(this.x + CELL_SIZE - 8, this.y + CELL_SIZE/2 - 1);
                ctx.stroke();
                break;
            case Direction.above:
                ctx.beginPath();
                ctx.moveTo(this.x + 8            , this.y + CELL_SIZE/2 + 1);
                ctx.lineTo(this.x + CELL_SIZE / 2, this.y + CELL_SIZE/2 - 3); // arrow tip
                ctx.lineTo(this.x + CELL_SIZE - 8, this.y + CELL_SIZE/2 + 1);
                ctx.stroke();
                break;
            case Direction.left:
                ctx.beginPath();
                ctx.moveTo(this.x + CELL_SIZE/2 + 1, this.y + 8            );
                ctx.lineTo(this.x + CELL_SIZE/2 - 3, this.y + CELL_SIZE / 2); // arrow tip
                ctx.lineTo(this.x + CELL_SIZE/2 + 1, this.y + CELL_SIZE - 8);
                ctx.stroke();
                break;
            case Direction.right:
                ctx.beginPath();
                ctx.moveTo(this.x + CELL_SIZE/2 - 1, this.y + 8            );
                ctx.lineTo(this.x + CELL_SIZE/2 + 3, this.y + CELL_SIZE / 2); // arrow tip
                ctx.lineTo(this.x + CELL_SIZE/2 - 1, this.y + CELL_SIZE - 8);
                ctx.stroke();
                break;
        }
    }

    setType(newType) {
        this.type = newType
    }

    setDirection(newDirection) {
        this.direction = newDirection
    }
}

//array of cells
var organism = [];

let cameraOffset = { 
    x: 0, 
    y: 0 
}
let cameraZoom = 4
let viewCenter;

function start() {
    gameBoard.draw();

    center = { x: SCALED_X/2, y: SCALED_Y/2 };
    ctx = gameBoard.context;

    let startTile = new cell(center.x, center.y, CELL_SIZE, CELL_SIZE, CellTypes.default, Direction.down);
    organism.push(startTile);

    draw();
}

function draw() {
    gameBoard.draw();

    // Translate to the canvas centre before zooming 
    // - so you'll always zoom on what you're looking directly at
    ctx.translate( canvas.width / 2, canvas.height / 2); // move to middle
    ctx.scale(cameraZoom, cameraZoom); // scale (always scale from the center)
    // move back plus offset
    ctx.translate( -canvas.width/2 + cameraOffset.x, -canvas.height/2 + cameraOffset.y);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clear for drawing

    // TODO: Compute rendering box

    // MARK: Do all rendering here // only render things that are bounded by the rendering box
    for (let i = 0; i < organism.length; i++) { // draw all cells in organism
        organism[i].drawCell();
    }

    

    requestAnimationFrame( draw );
}

// Get the relevent x and y positions of mouse or single touch event
function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) { // checks for touch screen and only 1 finger
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.clientX && e.clientY) { // checks for x and y position of mouse
        return { x: e.clientX, y: e.clientY }
    }
}

// MARK: Listener functions
let isDragging = false;
let dragStart = { x: 0, y: 0 }
let initialPinchDistance = null
let lastZoom = cameraZoom

function onPointerDown(e) {
    isDragging = true;
    dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
    isDragging = false;
    // Reset these to defaults: 
    initialPinchDistance = null;
    lastZoom = cameraZoom
}

function onPointerMove(e){
    if (isDragging) {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
    }
}

function adjustZoom(zoomAmount, zoomFactor) {
    if (!isDragging) {
        if (zoomAmount) {
            cameraZoom += zoomAmount
        } else if (zoomFactor) {

        }

        // Bound the zooming
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM );
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM );

    }
}

// Render curved rectangles
CanvasRenderingContext2D.prototype.roundedRect = function (x, y, w, h, r) {
    // make sure radius is not bigger than the height or width
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

// Mouse event listeners
canvas.addEventListener("mousedown", onPointerDown);
canvas.addEventListener("mouseup", onPointerUp);
canvas.addEventListener("mousemove", onPointerMove);

canvas.addEventListener("wheel", (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))