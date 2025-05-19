import { Canvas, createCanvas, CanvasRenderingContext2D } from 'canvas';
import * as fs from 'fs';

export class Graph {
    private readonly canvas: Canvas;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly unitSize: number;

    constructor(
        private readonly height: number,
        private readonly width: number,
        private readonly a: number,
        private readonly b: number,
        private readonly scale: number
    ) {
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.unitSize = this.scale * 100;
        this.drawGrid();
    }

    private drawGrid() {
        this.ctx.fillStyle = 'aliceblue';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.drawHorizontalLines();
        this.drawVerticalLines();
        this.drawAxes();
    }

    private drawHorizontalLines() {
        const centerY = this.height / 2;
        const unitsVisible = this.height / this.unitSize / this.scale;
        const yStart = Math.floor(-unitsVisible / 2);
        const yEnd = Math.ceil(unitsVisible / 2);

        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = 'gray';
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'black';

        for (let y = yStart; y <= yEnd; y++) {
            const screenY = this.screenY(y);
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, screenY);
            this.ctx.lineTo(this.width, screenY);
            this.ctx.stroke();

            if (y !== 0) {
                this.ctx.fillText(y.toString(), 5, screenY - 2);
            }
        }
    }

    private drawVerticalLines() {
        const xStart = Math.floor(this.a);
        const xEnd = Math.ceil(this.b);

        this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = 'gray';
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'black';

        for (let x = xStart; x <= 2* xEnd; x++) {
            const screenX = this.screenX(x);

            this.ctx.beginPath();
            this.ctx.moveTo(screenX, 0);
            this.ctx.lineTo(screenX, this.height);
            this.ctx.stroke();

            if (x !== 0) {
                this.ctx.fillText(x.toString(), screenX - 10, this.height / 2 + 15);
            }
        }
    }

    private drawAxes() {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.font = '14px Arial';
        
        const yAxisY = this.screenY(0);
        if (yAxisY >= 0 && yAxisY <= this.height) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, yAxisY);
            this.ctx.lineTo(this.width, yAxisY);
            this.ctx.stroke();
        }

        const xAxisX = this.screenX(0);
        if (xAxisX >= 0 && xAxisX <= this.width) {
            this.ctx.beginPath();
            this.ctx.moveTo(xAxisX, 0);
            this.ctx.lineTo(xAxisX, this.height);
            this.ctx.stroke();
            this.ctx.fillText('0', xAxisX - 15, yAxisY + 15);
        }
    }

    drawFunction(f: (x: number) => number, color: string, bounded: boolean = false) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        const points: [number, number][] = [];
        const [startX, endX, step] = this.calculateDrawingBounds(bounded);

        for (let x = startX; x <= endX; x += step) {
            try {
                const y = f(x);
                if (!isFinite(y)) continue;
                points.push([x, y]);
            } catch (e) {
                continue;
            }
        }

        let firstPoint = true;
        for (const [x, y] of points) {
            const screenX = this.screenX(x);
            const screenY = this.screenY(y);

            if (screenY >= 0 && screenY <= this.height) {
                if (firstPoint) {
                    this.ctx.moveTo(screenX, screenY);
                    firstPoint = false;
                } else {
                    this.ctx.lineTo(screenX, screenY);
                }
            }
        }

        this.ctx.stroke();
    }

    private calculateDrawingBounds(bounded: boolean): [number, number, number] {
        if (bounded) {
            return [this.a, this.b, 1 / this.unitSize];
        } else {
            const margin = (this.b - this.a) * 0.1; 
            return [
                this.a - margin,
                this.b + margin,
                1 / this.unitSize
            ];
        }
    }

    private screenX(x: number): number {
        return (x - this.a) * this.unitSize;
    }

    private screenY(y: number): number {
        return this.height / 2 - y * this.unitSize;
    }

    export(filepath: string) {
        const out = fs.createWriteStream(filepath);
        const stream = this.canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('PNG file created successfully.'));
    }
}