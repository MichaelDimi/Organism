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
let painterCanvasPosX = 0;
let painterCanvasPosY = 0;

function onPointerDown(e) {
    isDragging = false;
    isMouseDown = true;
    dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
    dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
    isMouseDown = false;

    if (!isDragging) {
        let click = getEventLocation(e);

        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();

        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        let canvasClickX = (click.x - canvasWindow.x) / cameraZoom + canvasOffsetX + CELL_SIZE/2;
        let canvasClickY = (click.y - canvasWindow.y) / cameraZoom + canvasOffsetY + CELL_SIZE/2;
        let scaledClickX = Math.round( canvasClickX / 30 );
        let scaledClickY = Math.round( canvasClickY / 30 );

        if (scaledClickX == center.x && scaledClickY == center.y) return;
        if (scaledClickX == center.x+1 && scaledClickY == center.y) return;
        if (scaledClickX == center.x+1 && scaledClickY == center.y+1) return;
        if (scaledClickX == center.x && scaledClickY == center.y+1) return;

        let vert = lake.vertices[scaledClickX][scaledClickY];
        vert.isLake = !vert.isLake;
        if (vert.isLake) { // Don't add if it's there already
            // Add to obstructions
            obstructions.push({ x: scaledClickX, y: scaledClickY });
            obstructions.push({ x: scaledClickX-1, y: scaledClickY-1 });
            obstructions.push({ x: scaledClickX-1, y: scaledClickY });
            obstructions.push({ x: scaledClickX, y: scaledClickY-1 });
        } else {
            // Remove from obstrctions
            let removeIndex;
            for (let i = 0; i < obstructions.length; i++) {
                if (obstructions[i].x == scaledClickX && 
                    obstructions[i].y == scaledClickY) {
                        removeIndex = i;
                        break;
                }
            }
            obstructions.splice(removeIndex, 1);
        }
        // console.log(obstructions)
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
    } else {
        let pos = getEventLocation(e);

        if (pos == undefined || pos == null) {
            console.log("Error with pos")
            return;
        }

        // Convert position
        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();
        
        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        painterCanvasPosX = (pos.x - canvasWindow.x) / cameraZoom + canvasOffsetX;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        painterCanvasPosY = (pos.y - canvasWindow.y) / cameraZoom + canvasOffsetY;
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

// Mouse event listeners
canvas.addEventListener("mousedown", onPointerDown);
canvas.addEventListener("mousemove", onPointerMove);
canvas.addEventListener("mouseup", onPointerUp);
// Pass the event directly, since we don't need the location
canvas.addEventListener("wheel", (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))