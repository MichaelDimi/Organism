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

    startCell.checkNeighboringCells();

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
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.beginPath();
    ctx.arc(canvas.width/2 + 0.8, canvas.height/2 + 0.8, 4, 0, 2*Math.PI);
    ctx.fill();

    for (let i = 0; i < organism.cells.length; i++) { // draw all cells in organism
        let cell = organism.cells[i];

        cell.drawCell(GREEN);

        if (cell === organism.selected) {
            if (cell.hasNeighbors[0] == false) {
                cell.drawArrow(0, -22, DEFAULT_COLOR_transparent, Direction.above);
            }
            if (cell.hasNeighbors[1] == false) {
                cell.drawArrow(0, 22, DEFAULT_COLOR_transparent, Direction.below);
            }
            if (cell.hasNeighbors[2] == false) {
                cell.drawArrow(-22, 0, DEFAULT_COLOR_transparent, Direction.left);
            }
            if (cell.hasNeighbors[3] == false) {
                cell.drawArrow(22, 0, DEFAULT_COLOR_transparent, Direction.right);
            }
        }
    }

    requestAnimationFrame( draw );
}

