// ======================================
// Note: These functions are completely disconnected from the main game, 
// and serve as helper functions.
// ======================================

// Returns random int from 0 (inclusive) -> max (exlusive)
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

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