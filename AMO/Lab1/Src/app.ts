// my task is chx on the interval [0, 1]

interface Task1Data {
    eps: string,
    n: number,
    absoluteError: number,
    reminder: number,
    calculatedValue: number,
    realValue: number
}

interface Task2Data {
    x: number,
    absoluteError: number,
    reminder: number,
    calculatedValue: number,
    realValue: number
}

class Calculation {
    public static readonly a: number = 0
    public static readonly b: number = 1

    public static firstTableGeneration() : void {
        const data : Task1Data[] = []
        const x = (this.b + this.a) / 2
        console.log("x = " + x)
        for (let epsDegree: number = 2; epsDegree <= 14; epsDegree += 3) {
            const eps: number = 10**-epsDegree
            let res: number = 1
            let uk: number = x**2 / 2
            let k = 2
            while (eps < uk*2/3 || ((k = k - 2) && false)) {
                res += uk
                uk *= x**2 / ((k + 1) * (k + 2))
                k += 2
            }
            const task1Data: Task1Data = {
                eps: '10^-' + epsDegree,
                n: k,
                absoluteError: Math.abs(Math.cosh(x) - res),
                reminder: uk,
                calculatedValue: res,
                realValue: Math.cosh(x)
            }
            data.push(task1Data)
        }
        console.table(data)
    }

    public static secondTableGeneration(n: number) : void {
        const data: Task2Data[] = []
        const h: number = (this.b - this.a) / 10
        console.log('h = ' + h)
        for (let i = 0; i <= 10; i++) {
            const x : number = this.a + h * i
            let res: number = 1
            let uk: number = x**2 / 2
            for (let k = 2; k <= n; k += 2) {
                res += uk
                uk *= x**2 / ((k + 1) * (k + 2))
            }
            const task2Data : Task2Data = {
                x: x,
                absoluteError: Math.abs(Math.cosh(x) - res),
                reminder: uk,
                calculatedValue: res,
                realValue: Math.cosh(x)
            }

            data.push(task2Data)
        }
        console.table(data)
    }
}

Calculation.firstTableGeneration()
Calculation.secondTableGeneration(10)