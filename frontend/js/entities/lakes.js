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

                // ctx.fillStyle = "rgba(161, 213, 219, 1)";
                ctx.fillStyle = "#75BAFA";
                ctx.strokeStyle = "#2A92F2";
                ctx.lineWidth = CELL_STROKE; 

                let s = CELL_SIZE + 3;
                let x = a.scaledX * 30 - s/2 + 1.1;
                let y = b.scaledY * 30 - s/2 + 1.1;

                let state = this.getState(a.isLake ? 1 : 0, 
                                          b.isLake ? 1 : 0, 
                                          c.isLake ? 1 : 0, 
                                          d.isLake ? 1 : 0);
                switch (state) {
                    case 1: // A: 0; B: 0; C: 0; D: 1; 
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y + s);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke();
                        break;
                    case 2: // A: 0; B: 0; C: 1; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s*0.8, 10);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.lineTo(x, y + s);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s*0.8, 10);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.stroke();
                        break;
                    case 3: // A: 0; B: 0; C: 1; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.lineTo(x, y + s);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.lineTo(x, y + s/2);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke();
                        break;
                    case 4: // A: 0; B: 1; C: 0; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke();
                        break;
                    case 5: // A: 0; B: 1; C: 0; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x + s, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.stroke();
                        break;
                    case 6: // A: 0; B: 1; C: 1; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s*0.8, 10);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.lineTo(x, y + s);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s*0.8, 10);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.stroke();
                        break;
                    case 7: // A: 0; B: 1; C: 1; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y - s*0.8, 10);
                        ctx.lineTo(x + s/2, y);
                        ctx.lineTo(x + s, y);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x, y + s);
                        ctx.fill(); 
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y - s*0.8, 10);
                        ctx.lineTo(x + s/2, y);
                        ctx.stroke(); 
                        break;
                    case 8: // A: 1; B: 0; C: 0; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y - s*0.8, 10);
                        ctx.lineTo(x + s/2, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y - s*0.8, 10);
                        ctx.lineTo(x + s/2, y);
                        ctx.stroke();
                        break;
                    case 9: // A: 1; B: 0; C: 0; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y - s*0.8, 10);
                        ctx.lineTo(x + s/2, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y - s*0.8, 10);
                        ctx.lineTo(x + s/2, y);
                        ctx.stroke();
                        
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y + s);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke();
                        break;
                    case 10: // A: 1; B: 0; C: 1; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.lineTo(x + s/2, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.stroke();
                        break;
                    case 11: // A: 1; B: 0; C: 1; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x, y + s);
                        ctx.fill(); 
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke(); 
                        break;
                    case 12: // A: 1; B: 1; C: 0; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x, y + s/2);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke();
                        break;
                    case 13: // A: 1; B: 1; C: 0; D: 1;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s*0.8, 10);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.lineTo(x + s, y + s);
                        ctx.lineTo(x + s, y);
                        ctx.fill(); 
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.moveTo(x, y + s/2);
                        ctx.arcTo(x + s/2, y + s/2, x + s/2, y + s*0.8, 10);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.stroke(); 
                        break;
                    case 14: // A: 1; B: 1; C: 1; D: 0;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + s);
                        ctx.lineTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.lineTo(x + s, y);
                        ctx.fill(); 
                        ctx.beginPath();
                        ctx.moveTo(x + s/2, y + s);
                        ctx.arcTo(x + s/2, y + s/2, x + s*0.8, y + s/2, 10);
                        ctx.lineTo(x + s, y + s/2);
                        ctx.stroke(); 
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

        // TODO: remove:
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