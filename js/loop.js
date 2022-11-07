let oldTimeStamp = 0.0;
let fps;
let msPerTick = 1000;

let clock = 0;

let paused = false;
let gameover = false;

// array of cells
var organism = new Organism();
var foods = [];
// An array of coordinates where there is something 
// Cell, Food, Wall*
var obstructions = [];

function startGame() {
    gameBoard.create();

    center = { x: SCALED_CANVAS_W/2, y: SCALED_CANVAS_H/2 };
    ctx = gameBoard.context;
    ctx.imageSmoothingEnabled = false;

    let startCell = new Cell(center.x, center.y, CELL_SIZE, CELL_SIZE);
    organism.cells.push(startCell);
    obstructions.push({ x: startCell.scaledX, y: startCell.scaledY });

    window.setTimeout(() => {
        spawnNewBud();
    }, 1000)

    spawnRandomFood(center, 1);
    // spawnRandomFood(center, 5);
    // spawnRandomFood(center, 5);
    // spawnRandomFood(center, 5);
    // spawnRandomFood(center, 5);

    requestAnimationFrame( loop )
}

let timeout = 0.0;
function update(seconds) {
    timeout += seconds;

    let bar = document.getElementById("energy-bar");
    let barContainer = document.getElementById("energy-bar-container")

    if (organism.energy < 0) {
        bar.style.opacity = 0;
        gameover = true;
        return;
    } else if (organism.energy < 55) {
        bar.style.backgroundColor = RED;
        barContainer.style.backgroundColor = LIGHT_RED;
    }

    // Handle food rendering // TODO: Test this shit
    for (const food of foods) {
        if (food.state == Food.STATE.grown) { // TODO: TEST
            continue;
        }
        if (food.neighborBuds.length > 0) {
            
            if (food.timeSinceGrown >= -125*(food.neighborBuds.length - 1) + 500) {
                food.color = FOOD_COLOR.normal;
                food.state = Food.STATE.grown;
                continue;
            }

            food.state = Food.STATE.growing;
            food.timeSinceGrown += 1

            food.blink();
        } else {
            food.color = FOOD_COLOR.light;
            if (food.state == Food.STATE.growing) {
                food.timeSinceGrown = 0;
                food.state = Food.STATE.idle;
            }
        }
    }

    // 1/10 second clock
    if (timeout >= 0.1) {

        clock++;
        if (clock % 100 == 0) { // TODO:Every 20 seconds
            spawnNewBud();
        }

        // Every 10 seconds
        if (clock % 100 == 0) {
            if (organism.energy < 50) {
                // Kill random bud
                organism.killRandomBud();
            }
        }

        let buds = organism.buds;
        for (const bud of buds) {
            if (bud.cooldown >= 0) {
                bud.cooldown -= 0.01;
            } 
            if (bud.cooldown <= 0.01 && bud.cooldown > 0) {
                checkCellArrowHover(canvasPosX, canvasPosY);
            }
        }

        timeout -= 0.1;
    }

    dEnergy = organism.energy - (seconds * (organism.getSize() / 12));
    organism.energy = dEnergy;
    
    bar.style.width = (organism.energy) + "%";
} 

function gamePausedUpdate() {
    
}

function loop(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    let secondsPassed = (timeStamp - oldTimeStamp) / msPerTick;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    if (!gameover && !paused) {
        update(secondsPassed);
    }
    gamePausedUpdate();
    draw();

    requestAnimationFrame( loop );
}