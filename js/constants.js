let CANVAS_W = 130*30; // 
let CANVAS_H = 100*30; // 3000
let SCALED_X = CANVAS_W / 30; // 100 scaled x-positions * 120 scaled y-positions
let SCALED_Y = CANVAS_H / 30;

let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.005

let CELL_SIZE = 27;
let CELL_STROKE = 5;
let CELL_TIMEOUT = 5000.0;

let BACKGROUND_COLOR = "#EDE5E1";
let DEFAULT_COLOR = "#071D29";
let GREEN = "#018535";
let RED = "#9E0039";
let ORANGE = "#D24A3B";

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