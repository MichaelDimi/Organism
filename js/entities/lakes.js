// Contain lake tiles, handle connecting lake tiles and drawing lake
class Lake {
    constructor() {
        this.lakeTiles = [];
    }

    drawLake() {

        for (let i = 0; i < this.lakeTiles.length; i++) {
            let tile = this.lakeTiles[i];
            let state = LakeTile.getState(tile.vertA, tile.vertB, tile.vertC, tile.vertD);

            ctx.fillStyle = "rgba(118, 209, 222, 1)";

            let s = CELL_SIZE + 3;
            let x = tile.x - 0.5;
            let y = tile.y - 0.5;
            switch (state) {
                case 1: // A: 0; B: 0; C: 0; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x + s/2, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.fill();
                    break;
                case 2: // A: 0; B: 0; C: 1; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x, y + s/2);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.fill();
                    break;
                case 3: // A: 0; B: 0; C: 1; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y + s/2);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.fill();
                    break;
                case 4: // A: 0; B: 1; C: 0; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x + s/2, y);
                    ctx.lineTo(x + s, y);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.fill();
                    break;
                case 5: // A: 0; B: 1; C: 0; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x + s/2, y);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y);
                    ctx.fill();
                    break;
                case 6: // A: 0; B: 1; C: 1; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x, y + s/2);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(x + s/2, y);
                    ctx.lineTo(x + s, y);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.fill();
                    break;
                case 7: // A: 0; B: 1; C: 1; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y + s/2);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y);
                    ctx.lineTo(x + s/2, y);
                    ctx.fill();
                    break;
                case 8: // A: 1; B: 0; C: 0; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s/2);
                    ctx.lineTo(x + s/2, y);
                    ctx.fill();
                    break;
                case 9: // A: 1; B: 0; C: 0; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s/2);
                    ctx.lineTo(x + s/2, y);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(x + s/2, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.fill();
                    break;
                case 10: // A: 1; B: 0; C: 1; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.lineTo(x + s/2, y);
                    ctx.fill();
                    break;
                case 11: // A: 1; B: 0; C: 1; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.lineTo(x + s/2, y);
                    ctx.fill();
                    break;
                case 12: // A: 1; B: 1; C: 0; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s/2);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.lineTo(x + s, y);
                    ctx.fill();
                    break;
                case 13: // A: 1; B: 1; C: 0; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s/2);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y);
                    ctx.fill();
                    break;
                case 14: // A: 1; B: 1; C: 1; D: 0;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s/2, y + s);
                    ctx.lineTo(x + s, y + s/2);
                    ctx.lineTo(x + s, y);
                    ctx.fill(); 
                    break;
                case 15: // A: 1; B: 1; C: 1; D: 1;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + s);
                    ctx.lineTo(x + s, y + s);
                    ctx.lineTo(x + s, y);
                    ctx.fill(); 
                    break;
            }

            // TODO: Remove this junk
            ctx.fillStyle = "black";
            if (tile.vertA) {
                ctx.beginPath();
                ctx.rect(tile.x, tile.y, 3, 3);
                ctx.fill();
            }
            if (tile.vertB) {
                ctx.beginPath();
                ctx.rect(tile.x + CELL_SIZE - 1, tile.y, 3, 3);
                ctx.fill();
            }
            if (tile.vertC) {
                ctx.beginPath();
                ctx.rect(tile.x, tile.y + CELL_SIZE - 1, 3, 3);
                ctx.fill();
            }
            if (tile.vertD) {
                ctx.beginPath();
                ctx.rect(tile.x + CELL_SIZE - 1, tile.y + CELL_SIZE - 1, 3, 3);
                ctx.fill();
            }
        }
    }

    addLakeTile(x, y) {
        // Add clicks to lakes array
        console.log(x, y);
        // Check if the tile is the newly added tile
        for (const tile of lake.lakeTiles) {
            if (tile.scaledX == x && tile.scaledY == y) {
                return;
            }
        }
        console.log("Tile added");
        let newTile = new LakeTile(x, y)
        // Check adjacent tiles
        for (const tile of lake.lakeTiles) {
            if (newTile.compareAdjacent(tile, -1, 0) || 
                newTile.compareAdjacent(tile, -1, -1) || 
                newTile.compareAdjacent(tile, 0, -1)) {

                    newTile.vertD = 1;
                    tile.vertA = 1;
            }
            if (newTile.compareAdjacent(tile, 0, -1) || 
                newTile.compareAdjacent(tile, 1, -1) || 
                newTile.compareAdjacent(tile, 1, 0)) {

                    newTile.vertC = 1;
                    tile.vertB = 1;
            }
            if (newTile.compareAdjacent(tile, 1, 0) || 
                newTile.compareAdjacent(tile, 1, 1) || 
                newTile.compareAdjacent(tile, 0, 1)) {

                    newTile.vertA = 1;
                    tile.vertD = 1;
            }
            if (newTile.compareAdjacent(tile, 0, 1) || 
                newTile.compareAdjacent(tile, -1, 1) || 
                newTile.compareAdjacent(tile, -1, 0)) {

                    newTile.vertB = 1;
                    tile.vertC = 1;
            }
        }
        
        // Update the verteces of the adjacent tiles, and the new tile

        // If you add at the end you don't worry that the new tile is in the array 
        //  when checking
        lake.lakeTiles.push(newTile); 
    }
}

// Handle position and color of lake tiles
class LakeTile {
    constructor(scaledX, scaledY) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;

        this.x = this.scaledX * 30 - CELL_SIZE / 2;
        this.y = this.scaledY * 30 - CELL_SIZE / 2;
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;

//         A-------B
//         |       |
//         |       |
//         C-------D
        this.vertA = 0;
        this.vertB = 0;
        this.vertC = 0;
        this.vertD = 0;
    }

    static getState(a, b, c, d) {
        return a * 8 + b * 4 + c * 2 + d * 1;
    }

    compareAdjacent(tile, xoff, yoff) {
        let res = (this.scaledX == tile.scaledX+xoff) && (this.scaledY == tile.scaledY+yoff);
        return res;
    }
}