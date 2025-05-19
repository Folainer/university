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

    public get x() : number {
        return this.point[0];
    }

    public get y() : number {
        return this.point[1];
    }
}