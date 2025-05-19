class Point {
    public point : number[]

    constructor(point : number[]) {
        this.point = point
    }

    public rotateZ(angle : number) : Point {
        const res = []

        res[0] = Math.round(this.point[0]*Math.cos(angle) - this.point[1]*Math.sin(angle))
        res[1] = Math.round(this.point[0]*Math.sin(angle) + this.point[1]*Math.cos(angle))

        return new Point(res)
    }

    public scale (scaleX : number = 1, scaleY : number = 1) : Point {
        const res = []
        
        res[0] = Math.round(this.point[0]*scaleX)
        res[1] = Math.round(this.point[1]*scaleY)

        return new Point(res)
    }

    public translate (translateX : number = 0, translateY : number = 0) : Point {
        const res = []
        
        res[0] = Math.round(this.point[0] + translateX)
        res[1] = Math.round(this.point[1] + translateY)

        return new Point(res)
    }

    public minus(p : Point) {
        return new Point([this.x - p.x, this.y - p.y])
    }

    public plus(p : Point) {
        return new Point([this.x + p.x, this.y + p.y])
    }

    public plusK(k : number) {
        return new Point([k + this.x, k + this.y])
    }

    public minusK(k : number) {
        return new Point([k - this.x, k - this.y])
    }

    public divideK(k : number) {
        return new Point([k / this.x, k / this.y])
    }

    public multiplyK(k : number) {
        return new Point([k * this.x, k * this.y])
    }

    public getLength(p : Point) {
        return Math.sqrt((this.x - p.x)**2 + (this.y - p.y)** 2)
    }

    public normilize() {
        const length = this.length
        return new Point([this.x / length, this.y / length])
    }

    public static findNormal(p1 : Point, p2 : Point) {
        const direction = p1.minus(p2)
        return new Point([-direction.y, direction.x]).normilize()
    }

    public distribution(k : number, p : Point) {
        // const direction = p.minus(this)
        // const adjustion = direction.divideK(k)
        // return this.plus(adjustion)
        const part1 = this.multiplyK(1 - k)
        const part2 = p.multiplyK(k)
        return part1.plus(part2)
    } 

    public get x() : number {
        return this.point[0];
    }

    public get y() : number {
        return this.point[1];
    }

    public get rx() : number {
        return Math.round(this.point[0]);
    }

    public get ry() : number {
        return Math.round(this.point[1]);
    }

    public get length() : number {
        return Math.sqrt(this.x**2 + this.y**2)
    }

    public get comlexPow2() {
        const real : number = this.x
        const imaginary : number = this.y

        return new Point([real ** 2 - imaginary ** 2, 2 * imaginary * real])
    }

    public static MandelbrotMap(x: number, y: number, width : number, height: number) {
        const scaleX = x / width * 4
        const scaleY = y / height * 4
        
        const alignX = scaleX - 2
        const alignY = scaleY - 2

        return new Point([alignX, -alignY])
    }
}