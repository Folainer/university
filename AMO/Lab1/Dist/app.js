"use strict";
// my task is chx on the interval [0, 1]
class Calculation {
    static firstTableGeneration() {
        const data = [];
        const x = (this.b + this.a) / 2;
        console.log("x = " + x);
        for (let epsDegree = 2; epsDegree <= 14; epsDegree += 3) {
            const eps = 10 ** -epsDegree;
            let res = 1;
            let uk = x ** 2 / 2;
            let k = 2;
            while (eps < uk * 2 / 3 || ((k = k - 2) && false)) {
                res += uk;
                uk *= x ** 2 / ((k + 1) * (k + 2));
                k += 2;
            }
            const task1Data = {
                eps: '10^-' + epsDegree,
                n: k,
                absoluteError: Math.abs(Math.cosh(x) - res),
                reminder: uk,
                calculatedValue: res,
                realValue: Math.cosh(x)
            };
            data.push(task1Data);
        }
        console.table(data);
    }
    static secondTableGeneration(n) {
        const data = [];
        const h = (this.b - this.a) / 10;
        console.log('h = ' + h);
        for (let i = 0; i <= 10; i++) {
            const x = this.a + h * i;
            let res = 1;
            let uk = x ** 2 / 2;
            for (let k = 2; k <= n; k += 2) {
                res += uk;
                uk *= x ** 2 / ((k + 1) * (k + 2));
            }
            const task2Data = {
                x: x,
                absoluteError: Math.abs(Math.cosh(x) - res),
                reminder: uk,
                calculatedValue: res,
                realValue: Math.cosh(x)
            };
            data.push(task2Data);
        }
        console.table(data);
    }
}
Calculation.a = 0;
Calculation.b = 1;
Calculation.firstTableGeneration();
Calculation.secondTableGeneration(10);
