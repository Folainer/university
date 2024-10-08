"use strict";
class View {
    constructor(size, pixelSize) {
        this.size = size;
        this.pixelSize = pixelSize;
        this.canvas = document.createElement('canvas');
        this.container = document.createElement('div');
        this.desciptionBox = document.createElement('div');
        this.ctx = this.canvas.getContext('2d');
        this.pixelCount = Math.ceil(this.size / this.pixelSize);
        this.pixelBuffer = new ArrayBuffer(Math.pow(this.pixelCount, 2) * 4);
        this.pixels = new Uint32Array(this.pixelBuffer);
        // for ()
        this.canvas.classList.add('view__canvas');
        this.container.classList.add('view');
        this.desciptionBox.classList.add('view__description_box');
        document.body.appendChild(this.container);
        this.container.appendChild(this.canvas);
        this.container.appendChild(this.desciptionBox);
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.splitByPixels();
    }
    splitByPixels() {
        if (!this.ctx) {
            return;
        }
        for (let i = 0; i < this.size / this.pixelSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.pixelSize, 0);
            this.ctx.lineTo(i * this.pixelSize, this.size);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.pixelSize);
            this.ctx.lineTo(this.size, i * this.pixelSize);
            this.ctx.stroke();
        }
    }
    setPixel(x, y, color) {
        // this.Pixels[]
        // add something to pixels, because I just draw without anything
        if (!this.ctx) {
            return this;
        }
        if (x < 0 || x > this.pixelCount || y < 0 || y > this.pixelCount) {
            return this;
        }
        if (color) {
            this.ctx.fillStyle = `rgb(${color[0]}  ${color[1]} ${color[2]} / ${color[3]}%)`;
        }
        else {
            this.ctx.fillStyle = 'black';
        }
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
        return this;
    }
    addTitle(title) {
        const titleElement = document.createElement('p');
        titleElement.innerHTML = title;
        titleElement.classList.add('view__title');
        this.desciptionBox.appendChild(titleElement);
        return this;
    }
    addText(text) {
        const textElement = document.createElement('p');
        textElement.innerHTML = text;
        textElement.classList.add('view__text');
        this.desciptionBox.appendChild(textElement);
        return this;
    }
}
