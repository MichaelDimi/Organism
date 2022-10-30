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

    spawnRandomFood(center, 5);
    spawnRandomFood(center, 5);
    spawnRandomFood(center, 5);
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
    } else if (organism.energy < 20) {
        bar.style.backgroundColor = RED;
        barContainer.style.backgroundColor = LIGHT_RED;
    } else if (organism.energy < 55) {
        bar.style.backgroundColor = ORANGE;
        barContainer.style.backgroundColor = LIGHT_ORANGE;
    }

    // 1/10 second clock
    if (timeout >= 0.1) {

        clock++;
        if (clock % 40 == 0) { // Every 4 seconds
            spawnNewBud();
        }

        if (clock % 50 == 0) { // Every 5 seconds
            if (organism.energy < 90) {
                // Kill random bud
                // organism.killRandomBud(); // TODO: Bring this back
            }
        }

        timeout -= 0.1;
    }

    dEnergy = organism.energy - (seconds * (organism.getSize() / 12));
    organism.energy = dEnergy;
    
    bar.style.width = (organism.energy) + "%";
} 

function gamePausedUpdate() {
    for (const food of foods) {
        if (food.neighborBuds.length > 0) {
            food.state = Food.STATE.growing;
            if (food.timeSinceGrown == 500) {
                food.color = FOOD_COLOR.normal;
                continue;
            } else {
                food.timeSinceGrown += 1
            }

            food.blink();
        } else {
            food.color = FOOD_COLOR.light;
            if (food.state == Food.STATE.growing) {
                food.timeSinceGrown = 0;
                food.state = Food.STATE.idle;
            }
        }
    }

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