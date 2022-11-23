class Lake {
    constructor() {
        this.vertices = [];
        for (let i = 0; i < SCALED_CANVAS_W; i++) {
            let row = [];
            for (let j = 0; j < SCALED_CANVAS_H; j++) {
                row.push(new Vertex(i, j));
            }
            this.vertices.push(row);
        }
    }

    drawLake() {
        for (let i = 0; i < SCALED_CANVAS_W-1; i++) {
            for (let j = 0; j < SCALED_CANVAS_H-1; j++) {
                let a = this.vertices[i    ][j    ];
                let b = this.vertices[i + 1][j    ];
                let c = this.vertices[i    ][j + 1];
                let d = this.vertices[i + 1][j + 1];

                // ctx.fillStyle = "rgba("+ Math.random()*255 +", "+Math.random()*255+", " + Math.random()*255 + ", 1)";

                ctx.fillStyle = "rgba(161, 213, 219, 1)";

                let s = CELL_SIZE + 3;
                let x = a.scaledX * 30 - s/2 + 1.5;
                let y = b.scaledY * 30 - s/2 + 1.5;

                let state = this.getState(a.isLake ? 1 : 0, 
                                          b.isLake ? 1 : 0, 
                                          c.isLake ? 1 : 0, 
                                          d.isLake ? 1 : 0);
                switch (state) {
                    case 1: // A: 0; B: 0; C: 0; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.lineTo(x + s/2, y + s*0.66);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.66, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y + s);
                        ctx.fill();
                        break;
                    case 2: // A: 0; B: 0; C: 1; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s, 15);
                        ctx.lineTo(x, y + s);
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
                        ctx.arcTo(x + s/2, y + s/2, x + s, y + s/2, 15);
                        ctx.lineTo(x + s, y);
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
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s, 15);
                        ctx.lineTo(x, y + s);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s, y + s/2, 15);
                        ctx.lineTo(x + s, y);
                        ctx.fill();
                        break;
                    case 7: // A: 0; B: 1; C: 1; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x + s, y);
                        ctx.fill(); 
                        ctx.fillStyle = "white";
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y, 15);
                        ctx.fill();
                        break;
                    case 8: // A: 1; B: 0; C: 0; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y, 15);
                        ctx.fill();
                        break;
                    case 9: // A: 1; B: 0; C: 0; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s, y + s/2, 15);
                        ctx.lineTo(x + s, y + s);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y, 15);
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
                        ctx.lineTo(x + s, y);
                        ctx.fill(); 
                        ctx.fillStyle = "white";
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s, y + s/2, 15);
                        ctx.lineTo(x + s, y);
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
                        ctx.lineTo(x, y + s);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x + s, y);
                        ctx.fill(); 
                        ctx.fillStyle = "white";
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s, 15);
                        ctx.lineTo(x, y + s);
                        ctx.fill();
                        break;
                    case 14: // A: 1; B: 1; C: 1; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x + s, y);
                        ctx.fill(); 
                        ctx.fillStyle = "white";
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s, y + s/2, 15);
                        ctx.lineTo(x + s, y + s);
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
            }
        }

        // Drawing vertices
        // ctx.strokeStyle = "black"
        // ctx.fillStyle = "black"
        // for (let i = 0; i < this.vertices.length; i++) {
        //     for (let j = 0; j < this.vertices[i].length; j++) {
        //         let vertex = this.vertices[i][j];
        //         if (vertex.isLake) {
        //             ctx.fillRect(vertex.scaledX * 30 - 16.5, vertex.scaledY * 30 - 16.5, 5, 5);
        //         } else {
        //             ctx.strokeRect(vertex.scaledX * 30 - 16.5, vertex.scaledY * 30 - 16.5, 5, 5);
        //         }
        //     }
        // }

    }

    getState(a, b, c, d) {
        return a * 8 + b * 4 + c * 2 + d * 1;
    }
}

class Vertex {
    constructor(scaledX, scaledY) {
        this.scaledX = scaledX;
        this.scaledY = scaledY;
        this.isLake = false;
    }
}



// // Contain lake tiles, handle connecting lake tiles and drawing lake
// class Lake {
//     constructor() {
//         this.lakeTiles = [];
//         this.lakeTilePos = []; // TODO
//     }

//     drawLake() {

//         for (let i = 0; i < this.lakeTiles.length; i++) {
//             let tile = this.lakeTiles[i];
//             let state = LakeTile.getState(tile.vertA, tile.vertB, tile.vertC, tile.vertD);

//             ctx.fillStyle = "rgba(118, 209, 222, 1)";

//             let s = CELL_SIZE + 3;
//             let x = tile.x - 0.5;
//             let y = tile.y - 0.5;
//             switch (state) {
//                 case 1: // A: 0; B: 0; C: 0; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x + s/2, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.fill();
//                     break;
//                 case 2: // A: 0; B: 0; C: 1; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y + s/2);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s/2, y + s);
//                     ctx.fill();
//                     break;
//                 case 3: // A: 0; B: 0; C: 1; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y + s/2);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.fill();
//                     break;
//                 case 4: // A: 0; B: 1; C: 0; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x + s/2, y);
//                     ctx.lineTo(x + s, y);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.fill();
//                     break;
//                 case 5: // A: 0; B: 1; C: 0; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x + s/2, y);
//                     ctx.lineTo(x + s/2, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y);
//                     ctx.fill();
//                     break;
//                 case 6: // A: 0; B: 1; C: 1; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y + s/2);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s/2, y + s);
//                     ctx.fill();
//                     ctx.beginPath();
//                     ctx.moveTo(x + s/2, y);
//                     ctx.lineTo(x + s, y);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.fill();
//                     break;
//                 case 7: // A: 0; B: 1; C: 1; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y + s/2);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y);
//                     ctx.lineTo(x + s/2, y);
//                     ctx.fill();
//                     break;
//                 case 8: // A: 1; B: 0; C: 0; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s/2);
//                     ctx.lineTo(x + s/2, y);
//                     ctx.fill();
//                     break;
//                 case 9: // A: 1; B: 0; C: 0; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s/2);
//                     ctx.lineTo(x + s/2, y);
//                     ctx.fill();
//                     ctx.beginPath();
//                     ctx.moveTo(x + s/2, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.fill();
//                     break;
//                 case 10: // A: 1; B: 0; C: 1; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s/2, y + s);
//                     ctx.lineTo(x + s/2, y);
//                     ctx.fill();
//                     break;
//                 case 11: // A: 1; B: 0; C: 1; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.lineTo(x + s/2, y);
//                     ctx.fill();
//                     break;
//                 case 12: // A: 1; B: 1; C: 0; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s/2);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.lineTo(x + s, y);
//                     ctx.fill();
//                     break;
//                 case 13: // A: 1; B: 1; C: 0; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s/2);
//                     ctx.lineTo(x + s/2, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y);
//                     ctx.fill();
//                     break;
//                 case 14: // A: 1; B: 1; C: 1; D: 0;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s/2, y + s);
//                     ctx.lineTo(x + s, y + s/2);
//                     ctx.lineTo(x + s, y);
//                     ctx.fill(); 
//                     break;
//                 case 15: // A: 1; B: 1; C: 1; D: 1;
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(x, y + s);
//                     ctx.lineTo(x + s, y + s);
//                     ctx.lineTo(x + s, y);
//                     ctx.fill(); 
//                     break;
//             }
//         }
//     }

//     addLakeTile(x, y) {
//         let primaryTile = new LakeTile(x, y);
//         primaryTile.vertA = 1;
//         primaryTile.vertB = 1;
//         primaryTile.vertC = 1;
//         primaryTile.vertD = 1;

//         let topTile = new LakeTile(x, y-1);
//         topTile.vertC = 1;
//         topTile.vertD = 1;

//         lake.lakeTiles.push(primaryTile);
//         lake.lakeTiles.push(topTile);

//         console.log(lake.lakeTiles);
//     }
// }

// // Handle position and color of lake tiles
// class LakeTile {
//     constructor(scaledX, scaledY) {
//         this.scaledX = scaledX;
//         this.scaledY = scaledY;

//         this.x = this.scaledX * 30 - CELL_SIZE / 2;
//         this.y = this.scaledY * 30 - CELL_SIZE / 2;
//         this.width = CELL_SIZE;
//         this.height = CELL_SIZE;

// //         A-------B
// //         |       |
// //         |       |
// //         C-------D
//         this.vertA = 0;
//         this.vertB = 0;
//         this.vertC = 0;
//         this.vertD = 0;
//     }

//     static getState(a, b, c, d) {
//         return a * 8 + b * 4 + c * 2 + d * 1;
//     }

//     compareAdjacent(tile, xoff, yoff) {
//         let res = (this.scaledX == tile.scaledX+xoff) && (this.scaledY == tile.scaledY+yoff);
//         return res;
//     }
// }