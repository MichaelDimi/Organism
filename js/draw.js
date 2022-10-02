let canvas = gameBoard.canvas;
let ctx;

let cameraOffset = { x: 0, y: 0 }
let cameraZoom = 1
let viewCenter;

// array of cells
var organism = new Organism();

function startGame() {
    gameBoard.create();

    center = { x: SCALED_X/2, y: SCALED_Y/2 };
    ctx = gameBoard.context;

    let startCell = new cell(center.x, center.y, 
                             CELL_SIZE, CELL_SIZE, 
                             CellTypes.default, 
                             Direction.left);
    organism.cells.push(startCell);
    console.log(startCell);

    draw();
}

function draw() {
    gameBoard.update();

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
    for (let i = 0; i < organism.cells.length; i++) { // draw all cells in organism
        organism.cells[i].drawCell();
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
let isMouseDown = false;
let dragStart = { x: 0, y: 0 }
let initialPinchDistance = null
let lastZoom = cameraZoom

function onPointerDown(e) {
    isDragging = false;
    isMouseDown = true;
    dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
    isMouseDown = false;

    if (!isDragging) {
        // Register click
        let click = getEventLocation(e);
        let canvasWindow = { w: document.getElementById("canvas-container").offsetWidth, h: document.getElementById("canvas-container").offsetHeight }
        console.log(canvasWindow)
        console.log(click)
        let scaledClickX = click.x - canvasWindow.w;
        console.log(scaledClickX);
    }

    isDragging = false;
    // Reset these to defaults: 
    initialPinchDistance = null;
    lastZoom = cameraZoom
}

function onPointerMove(e){
    if (isMouseDown) {
        isDragging = true;
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y

        console.log(cameraOffset.x);
    }
}

function adjustZoom(zoomAmount, zoomFactor) {
    if (!isDragging) {
        if (zoomAmount) {
            cameraZoom += zoomAmount
        } else if (zoomFactor) {
            // TODO
        }

        // Bound the zooming
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM );
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM );
    }
}

function onClick(e) {
    if (isDragging) {
        let click = getEventLocation(e);
        console.log(click);
    }
}

// Helper draw Fncitons
// Render curved rectangles
CanvasRenderingContext2D.prototype.roundedRect = function (x, y, w, h, r) {
    // Make sure radius is not bigger than the height or width
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