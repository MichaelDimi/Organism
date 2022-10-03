
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
        let canvasWindow = document.getElementById("canvas-container").getBoundingClientRect()
        let canvasBounds = canvas.getBoundingClientRect();

        let canvasOffsetX = ((canvasBounds.width - canvasWindow.width / cameraZoom) / 2) - cameraOffset.x;
        let canvasClickX = (click.x - canvasWindow.x) / cameraZoom + canvasOffsetX;
        let canvasOffsetY = ((canvasBounds.height - canvasWindow.height / cameraZoom) / 2) - cameraOffset.y;
        let canvasClickY = (click.y - canvasWindow.y) / cameraZoom + canvasOffsetY;
        let scaledClickX = Math.round( canvasClickX / 30 );
        let scaledClickY = Math.round( canvasClickY / 30 );
        console.log({ x: scaledClickX, y: scaledClickY })
        organism.getSelectedCell(scaledClickX, scaledClickY);

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