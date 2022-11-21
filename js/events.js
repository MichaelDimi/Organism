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

/* Stores the position of the mouse 
    relative to the pan and zoom of the canvas */
let canvasPosX = 0;
let canvasPosY = 0;

function onPointerDown(e) {
    isDragging = false;
    isMouseDown = true;
    dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
    isMouseDown = false;

    if (!isDragging) {
        if (!gameover) {
            // Register click
            let click = getEventLocation(e);

            let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
            let canvasBounds = canvas.getBoundingClientRect();

            let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
            let canvasClickX = (click.x - canvasWindow.x) / cameraZoom + canvasOffsetX;
            let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
            let canvasClickY = (click.y - canvasWindow.y) / cameraZoom + canvasOffsetY;
            let scaledClickX = Math.round( canvasClickX / 30 );
            let scaledClickY = Math.round( canvasClickY / 30 );

            if (organism.selected != null && !paused && organism.selected.cooldown <= 0) {
                let selectedCell = organism.getSelectedCell();

                // Check if an arrow was just clicked
                let topArrowScaledPos, bottomArrowScaledPos, leftArrowScaledPos, rightArrowScaledPos;
                if (selectedCell.topArrow != null) {
                    topArrowScaledPos = { 
                        x: selectedCell.topArrow.cellScaledX, 
                        y: selectedCell.topArrow.cellScaledY - 1 
                    }
                    if (canvasClickX <= organism.selected.x+CELL_SIZE && canvasClickX >= organism.selected.x &&
                        canvasClickY <= organism.selected.y && canvasClickY >= organism.selected.y-CELL_SIZE*(2/3)) {
                        selectedCell.moveCell(Direction.above);
                    }
                }
                if (selectedCell.bottomArrow != null) {
                    bottomArrowScaledPos = { 
                        x: selectedCell.bottomArrow.cellScaledX, 
                        y: selectedCell.bottomArrow.cellScaledY + 1 
                    }
                    if (canvasClickX <= organism.selected.x+CELL_SIZE && canvasClickX >= organism.selected.x &&
                        canvasClickY >= organism.selected.y+CELL_SIZE && canvasClickY <= organism.selected.y+CELL_SIZE+CELL_SIZE*(2/3)) {
                        selectedCell.moveCell(Direction.below);
                    }
                }
                if (selectedCell.leftArrow != null) {
                    leftArrowScaledPos = { 
                        x: selectedCell.leftArrow.cellScaledX - 1, 
                        y: selectedCell.leftArrow.cellScaledY 
                    }
                    if (canvasClickX <= organism.selected.x && canvasClickX >= organism.selected.x-CELL_SIZE*(2/3) &&
                        canvasClickY >= organism.selected.y && canvasClickY <= organism.selected.y+CELL_SIZE) {
                        selectedCell.moveCell(Direction.left);
                    }
                }
                if (selectedCell.rightArrow != null) {
                    rightArrowScaledPos = { 
                        x: selectedCell.rightArrow.cellScaledX + 1, 
                        y: selectedCell.rightArrow.cellScaledY 
                    }
                    if (canvasClickX >= organism.selected.x+CELL_SIZE && canvasClickX <= organism.selected.x+CELL_SIZE+CELL_SIZE*(2/3) &&
                        canvasClickY >= organism.selected.y && canvasClickY <= organism.selected.y+CELL_SIZE) {
                        selectedCell.moveCell(Direction.right);
                    }
                }

                selectedCell.computeCellArrows();
            }

            organism.setSelectedCell(scaledClickX, scaledClickY);

            // Check if a food was clicked
            if (!paused) {
                for (const food of foods) {
                    if (scaledClickX == food.scaledX && scaledClickY == food.scaledY) {
                        console.log(food.neighborBuds.length);
                        if (food.state == Food.STATE.grown) {
                            food.timeSinceGrown = 0;
                            food.state = Food.STATE.idle;

                            if (organism.energy + 10 > 100) {
                                organism.energy += 100-organism.energy;
                            } else {
                                organism.energy += 10
                            }
                        }
                        return;
                    }
                }
            }
        }
    } else {
        document.body.style.cursor = "default";
    }

    if (isMapPainter) {
        let click = getEventLocation(e);

        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();

        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        let canvasClickX = (click.x - canvasWindow.x) / cameraZoom + canvasOffsetX;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        let canvasClickY = (click.y - canvasWindow.y) / cameraZoom + canvasOffsetY;
        let scaledClickX = Math.round( canvasClickX / 30 );
        let scaledClickY = Math.round( canvasClickY / 30 );

        lake.addLakeTile(scaledClickX, scaledClickY);
    }

    isDragging = false;
    // Reset these to defaults: 
    initialPinchDistance = null;
    lastZoom = cameraZoom
}

function onPointerMove(e) {
    document.body.style.cursor = "default";
    if (isMouseDown) { // TODO: Give some error to movement
        document.body.style.cursor = "move";

        isDragging = true;

        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x;    
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y;
        
        // BOUNDS D: [-500,500] R: [-500,500]
        if (cameraOffset.x >= 500) {
            cameraOffset.x = 500;
            dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
        } else if (cameraOffset.x <= -500) {
            cameraOffset.x = -500;
            dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
        }
        if (cameraOffset.y >= 500) {
            cameraOffset.y = 500;
            dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
        } else if (cameraOffset.y <= -500) {
            cameraOffset.y = -500;
            dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
        }

        // TODO: Used with LERP
        // cameraOffset.x = lerp(cameraOffset.x, getEventLocation(e).x/cameraZoom - dragStart.x, 0.5);
        // cameraOffset.y = lerp(cameraOffset.y, getEventLocation(e).y/cameraZoom - dragStart.y, 0.5);
    } else {
        if (isMapPainter) return;

        let pos = getEventLocation(e);
        if (pos == undefined || pos == null) {
            console.log("Error with pos")
            return;
        }

        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();

        // Do hover checks
        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        canvasPosX = (pos.x - canvasWindow.x) / cameraZoom + canvasOffsetX;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        canvasPosY = (pos.y - canvasWindow.y) / cameraZoom + canvasOffsetY;

        let scaledPosX = Math.round(canvasPosX / 30.0);
        let scaledPosY = Math.round(canvasPosY / 30.0);

        // Check bud hover
        for (const bud of organism.buds) {
            if (bud.scaledX == scaledPosX && bud.scaledY == scaledPosY) {
                document.body.style.cursor = "pointer";
                break;
            }
        }

        // Check food hover
        for (const food of foods) {
            if (food.scaledX == scaledPosX && food.scaledY == scaledPosY) {
                document.body.style.cursor = "pointer";
                break;
            }
        }

        if (!gameover && !paused && organism.selected != null) {

            // Disable arrow hovers if selected cooldown > 0
            if (organism.selected.cooldown > 0) {
                if (organism.selected.topArrow != null)
                    organism.selected.topArrow.setColor(DEFAULT_COLOR_transparent);
                if (organism.selected.bottomArrow != null)
                    organism.selected.bottomArrow.setColor(DEFAULT_COLOR_transparent);
                if (organism.selected.leftArrow != null)
                    organism.selected.leftArrow.setColor(DEFAULT_COLOR_transparent);
                if (organism.selected.rightArrow != null)
                    organism.selected.rightArrow.setColor(DEFAULT_COLOR_transparent);
                return;  
            }

            checkCellArrowHover();
        }
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

// TODO: Used in linear Interpolation - May come back to
function lerp (start, end, amt) {
    return (1-amt)*start+amt*end
}

// Mouse event listeners
canvas.addEventListener("mousedown", onPointerDown);
canvas.addEventListener("mousemove", onPointerMove);
canvas.addEventListener("mouseup", onPointerUp);
// Pass the event directly, since we don't need the location
canvas.addEventListener("wheel", (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
