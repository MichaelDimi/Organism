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

            let selectedCell = organism.getSelectedCell();
            
            if (organism.selected != null && !paused) {
                // Check if an arrow was just clicked
                let topArrowScaledPos, bottomArrowScaledPos, leftArrowScaledPos, rightArrowScaledPos;
                if (selectedCell.topArrow != null) {
                    topArrowScaledPos = { 
                        x: selectedCell.topArrow.cellScaledX, 
                        y: selectedCell.topArrow.cellScaledY - 1 
                    }
                    if (scaledClickX == topArrowScaledPos.x && scaledClickY == topArrowScaledPos.y) {
                        selectedCell.moveCell(Direction.above);
                    }
                }
                if (selectedCell.bottomArrow != null) {
                    bottomArrowScaledPos = { 
                        x: selectedCell.bottomArrow.cellScaledX, 
                        y: selectedCell.bottomArrow.cellScaledY + 1 
                    }
                    if (scaledClickX == bottomArrowScaledPos.x && scaledClickY == bottomArrowScaledPos.y) {
                        selectedCell.moveCell(Direction.below);
                    }
                }
                if (selectedCell.leftArrow != null) {
                    leftArrowScaledPos = { 
                        x: selectedCell.leftArrow.cellScaledX - 1, 
                        y: selectedCell.leftArrow.cellScaledY 
                    }
                    if (scaledClickX == leftArrowScaledPos.x && scaledClickY == leftArrowScaledPos.y) {
                        selectedCell.moveCell(Direction.left);
                    }
                }
                if (selectedCell.rightArrow != null) {
                    rightArrowScaledPos = { 
                        x: selectedCell.rightArrow.cellScaledX + 1, 
                        y: selectedCell.rightArrow.cellScaledY 
                    }
                    if (scaledClickX == rightArrowScaledPos.x && scaledClickY == rightArrowScaledPos.y) {
                        selectedCell.moveCell(Direction.right);
                    }
                }

                selectedCell.computeCellArrows();
            }

            organism.setSelectedCell(scaledClickX, scaledClickY);
        }
    }

    isDragging = false;
    // Reset these to defaults: 
    initialPinchDistance = null;
    lastZoom = cameraZoom
}

function onPointerMove(e){
    if (isMouseDown) { // TODO: Give some error to movement
        isDragging = true;

        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();

        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x;    
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y;

        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        
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
        let pos = getEventLocation(e);

        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();

        // Do hover checks
        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        let canvasClickX = (pos.x - canvasWindow.x) / cameraZoom + canvasOffsetX;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        let canvasClickY = (pos.y - canvasWindow.y) / cameraZoom + canvasOffsetY;
        let scaledPosX = Math.round( canvasClickX / 30 );
        let scaledPosY = Math.round( canvasClickY / 30 );

        if (!gameover && !paused && organism.selected != null) {
            // UP
            if (organism.selected.topArrow != null) {
                if (scaledPosX == organism.selected.scaledX && scaledPosY == organism.selected.scaledY - 1) {
                    organism.selected.topArrow.setColor(DEFAULT_COLOR);
                } else {
                    organism.selected.topArrow.setColor(DEFAULT_COLOR_transparent);
                }
            }
            // DOWN
            if (organism.selected.bottomArrow != null) {
                if (scaledPosX == organism.selected.scaledX && scaledPosY == organism.selected.scaledY + 1) {
                    organism.selected.bottomArrow.setColor(DEFAULT_COLOR);
                } else {
                    organism.selected.bottomArrow.setColor(DEFAULT_COLOR_transparent);
                }
            }
            // LEFT
            if (organism.selected.leftArrow != null) {
                if (scaledPosX == organism.selected.scaledX - 1 && scaledPosY == organism.selected.scaledY) {
                    organism.selected.leftArrow.setColor(DEFAULT_COLOR);
                } else {
                    organism.selected.leftArrow.setColor(DEFAULT_COLOR_transparent);
                }
            }
            // RIGHT
            if (organism.selected.rightArrow != null) {
                if (scaledPosX == organism.selected.scaledX + 1 && scaledPosY == organism.selected.scaledY) {
                    organism.selected.rightArrow.setColor(DEFAULT_COLOR);
                } else {
                    organism.selected.rightArrow.setColor(DEFAULT_COLOR_transparent);
                }
            }
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
