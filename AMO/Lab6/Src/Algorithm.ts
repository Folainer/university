export function f(x: number) {
    if (x === 0) {
        return 0
    }
    return 0.1 * x ** 2 * Math.log10(Math.abs(Math.sin(x / 1.7)) / 2)
}

export class Spline {
    h: number
    coefficient: number[][] = []
    private moments: number[] = []
    private readonly MAX_ITERATIONS = 1000

    constructor(
        private a: number, 
        private b: number, 
        private n: number, 
        private epsilon: number = 1e-6
    ) {
        this.h = (b - a) / n
        this.findMoments()
        this.findCoef()
    }

    private findX(index: number) {
        return this.a + this.h * index
    }

    private findIndex(x: number) {
        if (x < this.a || x >= this.b) {
            return null
        }
        return Math.floor((x - this.a) / this.h)
    }

    private findMoments() {
        const n = this.n
        let moments = Array(n).fill(0)
        let nextMoments = Array(n).fill(0)
        let maxDiff = Infinity
        let iterations = 0

        while (maxDiff > this.epsilon && iterations < this.MAX_ITERATIONS) {
            for (let i = 1; i < n - 1; i++) {
                const xi = this.findX(i)
                const hi = this.h

                const fip1 = f(this.findX(i + 1))
                const fi = f(xi)
                const fim1 = f(this.findX(i - 1))

                nextMoments[i] = (
                    (6 / (hi * hi)) * (fim1 - 2 * fi + fip1) -
                    (moments[i - 1] + moments[i + 1])
                ) / 4
            }

            nextMoments[0] = 0
            nextMoments[n - 1] = 0

            maxDiff = Math.max(
                ...nextMoments.map((m, i) => Math.abs(m - moments[i]))
            )

            moments = [...nextMoments]
            iterations++
        }

        if (iterations === this.MAX_ITERATIONS) {
            console.warn('Maximum iterations reached without convergence')
        }

        this.moments = moments
    }

    private findCoef() {
        this.coefficient = []
        for (let i = 0; i < this.n - 1; i++) {
            const xi = this.findX(i)
            const xip1 = this.findX(i + 1)
            const hi = xip1 - xi
            
            const yi = f(xi)
            const yip1 = f(xip1)
            
            const Mi = this.moments[i]
            const Mip1 = this.moments[i + 1]
            
            const ai = yi
            const bi = (yip1 - yi) / hi - (hi / 6) * (2 * Mi + Mip1)
            const ci = Mi / 2
            const di = (Mip1 - Mi) / (6 * hi)
            
            this.coefficient.push([ai, bi, ci, di])
        }
    }

    private call(x: number) {
        const index = this.findIndex(x)

        if (index === null) {
            return 0
        }

        const [ai, bi, ci, di] = this.coefficient[index]
        const xi = this.findX(index)
        const dx = x - xi

        return ai + bi * dx + ci * dx**2 + di * dx**3
    }

    public interpolate() {
        return (x: number) => this.call(x)
    }
}