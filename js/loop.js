let oldTimeStamp = 0.0;
let fps;
let msPerTick = 1000;

let paused = false;
let gameover = false;

// array of cells
var organism = new Organism();
var foods = [];

function startGame() {
    gameBoard.create();

    center = { x: SCALED_X/2, y: SCALED_Y/2 };
    ctx = gameBoard.context;
    ctx.imageSmoothingEnabled = false;

    let startCell = new Cell(center.x, center.y, 
                             CELL_SIZE, CELL_SIZE, 
                             CellTypes.default, 
                             Direction.left);
    organism.cells.push(startCell);

    window.setTimeout(() => {
        spawnNewBud();
    }, 1000)

    let firstFood = new Food(63, 50);
    foods.push(firstFood);

    console.log(organism.cells[0]);

    requestAnimationFrame( loop )
}

let timout = {
    
    four: 0.0
}
function update(seconds) {
    timout.four += seconds;

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

    // 4 second clock
    if (timout.four >= 0.1) {
        spawnNewBud();

        if (foods[0].color == ORANGE) {
            foods[0].color = LIGHT_ORANGE;
        } else if (foods[0].color == LIGHT_ORANGE) {
            foods[0].color = ORANGE;
        }

        timout.four -= 0.1;
    }

    dEnergy = organism.energy - (seconds * (organism.getSize() / 12));
    organism.energy = dEnergy;
    
    bar.style.width = (organism.energy) + "%";
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
    draw();

    requestAnimationFrame( loop );
}