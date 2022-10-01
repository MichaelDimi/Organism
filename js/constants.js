let CANVAS_W = 130*30;
let CANVAS_H = 100*30;
let SCALED_X = CANVAS_W / 30; // 100 scaled x-positions * 120 scaled y-positions
let SCALED_Y = CANVAS_H / 30;

let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.005
let CELL_SIZE = 27;
let CELL_STROKE = 5;

let CELL_OFFSET = CELL_SIZE + CELL_STROKE;

let BACKGROUND_COLOR = "#EDE5E1";
let DEFAULT_COLOR = "#071D29";
let GREEN = "#018535";
let RED = "#9E0039";
let ORANGE = "#D24A3B";