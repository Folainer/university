type Color = [number, number, number, number]

class View {
    public pixelCount : number

    private size: number
    private pixelSize : number
    private canvas : HTMLCanvasElement
    private ctx : CanvasRenderingContext2D | null
    private pixelBuffer : ArrayBuffer
    private pixels: Uint32Array
    private container : HTMLElement
    private desciptionBox : HTMLElement

    private rotateXMatrix : number[][]
    private rotateYMatrix : number[][]
    private rotateZMatrix : number[][]


    constructor(size: number, pixelSize: number) {
        this.size = size
        this.pixelSize = pixelSize
        this.canvas  = document.createElement('canvas')
        this.container = document.createElement('div')
        this.desciptionBox = document.createElement('div')
        this.ctx = this.canvas.getContext('2d')
        this.pixelCount = Math.ceil(this.size / this.pixelSize)
        this.pixelBuffer = new ArrayBuffer(this.pixelCount**2 * 16)
        this.pixels = new Uint32Array(this.pixelBuffer)
        // for ()

        this.canvas.classList.add('view__canvas')
        this.container.classList.add('view')
        this.desciptionBox.classList.add('view__description_box')
        document.body.appendChild(this.container)
        this.container.appendChild(this.canvas)
        this.container.appendChild(this.desciptionBox)
        this.canvas.width = this.size
        this.canvas.height = this.size

        // console.log(this.pixelCount)

        this.splitByPixels()

        this.rotateXMatrix = Matrix.getOneMatrix(4)
        this.rotateYMatrix = Matrix.getOneMatrix(4)
        this.rotateZMatrix = Matrix.getOneMatrix(4)
    }

    private splitByPixels() : void {
        if (!this.ctx) {
            return
        }

        for (let i = 0; i < this.size / this.pixelSize; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(i*this.pixelSize, 0)
            this.ctx.lineTo(i*this.pixelSize, this.size)
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.moveTo(0, i*this.pixelSize)
            this.ctx.lineTo(this.size, i*this.pixelSize)
            this.ctx.stroke()
        } 
    }

    private calcPosition(x : number, y : number, colNum : number) : number {
        return 4*y*this.pixelCount + 4*x + colNum
    }

    public setPixel(x: number, y: number, color?: [number, number, number, number]) : this {
        if (x < 0 || x >= this.pixelCount || y < 0 || y >= this.pixelCount) {
            return this
        }

        if (!this.ctx) {
            return this
        }
        
        if (!color) {
            color = [0, 0, 0, 100]
        }

        let i = 0
        for (let col of color) {
            this.pixels[this.calcPosition(x, y, i)] = col
            i++
        }

        // if (color) {
        //     this.ctx.fillStyle = `rgb(${color[0]}  ${color[1]} ${color[2]} / ${color[3]}%)`
        // } else {
        //     this.ctx.fillStyle = 'black'
        // }

        // this.ctx.fillRect(x*this.pixelSize, y*this.pixelSize, this.pixelSize, this.pixelSize)
        return this
    }

    public getPixel(x: number, y: number) : Color | null {
        if (x < 0 || x >= this.pixelCount || y < 0 || y >= this.pixelCount) {
            return null
        }

        if (!this.ctx) {
            return null
        }

        const res : number[] = []

        for (let i = 0; i < 4; i++) {
            res.push(this.pixels[this.calcPosition(x, y, i)])
        }

        const color : Color = [res[0], res[1], res[2], res[3]]
        return color
    }

    public render() : this {
        if (!this.ctx) {
            return this
        }

        for (let i = 0; i < this.pixelCount; i++) {
            for (let j = 0; j < this.pixelCount; j++) {
                const col : Number[] = []
                for (let k = 0; k < 4; k++) {
                    col[k] = this.pixels[4*i*this.pixelCount + 4*j + k]
                }
                this.ctx.fillStyle = `rgb(${col[0]}  ${col[1]} ${col[2]} / ${col[3]}%)`
                this.ctx.fillRect(j*this.pixelSize, i*this.pixelSize, this.pixelSize, this.pixelSize)
            }
        }
        return this
    }

    public clear() : this {
        if (!this.ctx) {
            return this
        }

        for (let i = 0; i < this.pixelCount**2 * 16; i++) {
            this.pixels[i] = 0
        }

        this.ctx.clearRect(0, 0, this.size, this.size)
        this.splitByPixels()
        return this
    }

    public addTitle(title : string) : this {
        const titleElement = document.createElement('p')
        titleElement.innerHTML = title
        titleElement.classList.add('view__title')
        this.desciptionBox.appendChild(titleElement)
        return this
    }

    public addText(text : string) : this {
        const textElement = document.createElement('p')
        textElement.innerHTML = text
        textElement.classList.add('view__text')
        this.desciptionBox.appendChild(textElement)
        return this
    }

    // private rotateZ(angle : number) : void {
    //     this.rotateXMatrix = [
    //         [Math.cos(angle), -Math.sin(angle), 0, 0],
    //         [Math.sin(angle), Math.cos(angle), 0, 0],
    //         [0, 0, 1, 0],
    //         [0, 0, 0, 1]
    //     ]
        
    // }

    // public rotate(angleX: number, angleY: number, angleZ: number) : this {
    //     this.rotateZ(angleZ)

    //     const prevPixels = this.pixels

    //     this.pixelBuffer = new ArrayBuffer(this.pixelCount**2 * 16)
    //     this.pixels = new Uint32Array(this.pixelBuffer)

    //     for (let i = 0; i < this.pixelCount; i++) {
    //         for (let j = 0; j < this.pixelCount; j++) {
    //             const vector = Matrix.multiplyMatrixByVector(this.rotateZMatrix, [
    //                 j, i, 0, 1
    //             ])
    //             const pixel : number[] = []
    //             for (let k = 0; k < 4; k++) {
    //                 this.pixels[this.calcPosition(Math.round(vector[0]), Math.round(vector[1]), k)] = prevPixels[this.calcPosition(j, i, k)]
    //             }
    //         }
    //     }
    //     return this
    // }
}