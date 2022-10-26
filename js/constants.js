let SCALED_CANVAS_W = 130;
let SCALED_CANVAS_H = 100;
let CANVAS_W = SCALED_CANVAS_W*30; // 
let CANVAS_H = SCALED_CANVAS_H*30; // 3000
const dpr = window.devicePixelRatio || 1;

let MAX_ZOOM = 3
let MIN_ZOOM = 0.1    // 0.5
let SCROLL_SENSITIVITY = 0.005

let CELL_SIZE = 27;
let CELL_STROKE = 5;
let CELL_TIMEOUT = 5000.0;

// let BACKGROUND_COLOR = "#EDE5E1";
let BACKGROUND_COLOR = "#FFF";

let DEFAULT_COLOR = "#071D29";
let DEFAULT_COLOR_transparent = "rgba(7, 29, 41, 0.30)";
let GREEN = "#018535";
let LIGHT_GREEN = "#BFE0CD";
let RED = "#C90000";
let LIGHT_RED = "#FABFCD"
let ORANGE = "#F15353";
let LIGHT_ORANGE = "#FBD8BF"
let CELL_SELECT_COLOR = "#0885CB";
let FOOD_COLOR = {
    normal: "rgba(42, 146, 242, 100)",
    light: "rgba(42, 146, 242, 25)",
    blink: "rgba(42, 146, 242, "
}

const CellTypes = {
    default: "Default",
    bud: "Bud",
    dead: "Dead" 
}

// Where a new cell will be placed relative to parent
const Direction = {
    above: { x: 0, y: -1, name: "above" },
    below: { x: 0, y: 1, name: "below" },
    left: { x: -1, y: 0, name: "left" },
    right: { x: 1, y: 0, name: "right" }
}