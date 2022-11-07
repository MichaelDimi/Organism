var gameBoard = {
    canvas: document.createElement("canvas"),
    create: function() {
        // Initializes context and inserts canvas into DOM
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas-container").insertBefore(this.canvas, document.getElementById("canvas-container").childNodes[0]);
    },
    update: function() {
        // Make canvas a multiple of 30
        // TODO: Include device pixel ratio
        this.canvas.width = CANVAS_W; 
        this.canvas.height = CANVAS_H;
    }
}