import { Injectable } from "@angular/core"
import { BoardGridType } from "src/app/enums/board-grid-type.enum";
import { fabric } from 'fabric';

@Injectable({
  providedIn: "root"
})
export class FabricJsService {

    private canvas!: fabric.Canvas;
    private lines: fabric.Line[] = [];

    public initCanvas() {
        this.canvas = new fabric.Canvas('fabricSurface', {
            backgroundColor: '#FFF'
          });
    }

    public clearLines() {
        this.lines.forEach((line) => this.canvas.remove(line));
        while(this.lines.length !== 0) this.lines.pop();
    }

    public showGrid(type: BoardGridType) {
        this.clearLines();
        let gridSize = 0;
        switch (type) {
            case BoardGridType.Tiny:
                gridSize = 25;
                break;
            case BoardGridType.Medium:
                gridSize = 50;
                break;
            case BoardGridType.Large:
                gridSize = 100;
                break;
        }

        const gridCount = gridSize / 5;
        const canvasWidth = this.canvas.width ?? 1;
        const loopCount = canvasWidth / gridCount;
        for(let x = 1; x < loopCount; x++)
        {
            this.lines.push(new fabric.Line([gridSize*x, 0, gridSize*x, canvasWidth],{ 
                stroke: "#000000", 
                strokeWidth: 1, 
                selectable:false, 
                strokeDashArray: [2, 2],
                name:x.toString()
            }));
            this.lines.push(new fabric.Line([0, gridSize*x, canvasWidth, gridSize*x],{ 
                stroke: "#000000", 
                strokeWidth: 1, 
                selectable:false, 
                strokeDashArray: [2, 2],
                name:x.toString()
            }));
        }

        this.lines.forEach((line) => this.canvas.add(line));
    }
}