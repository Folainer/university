"use strict";
class IterationAlgorithm {
    static findRoot(error, initialValue = 0.5) {
        this.iterationCount = 0;
        let x = initialValue;
        let i = 0;
        let x_prev;
        do {
            this.iterationCount++;
            if (i == 1000) {
                break;
            }
            x_prev = x;
            x = Math.sqrt(-Math.cos(x) + 2 + Math.sin(x));
            i++;
        } while (10 * Math.abs(x - x_prev) > error);
        return x;
    }
    static printRoot(error, initialValue = 0.5) {
        console.log(this.findRoot(error, initialValue));
    }
}
class ChordAlgorithm {
    static f(x) {
        return (x ** 2 - Math.sin(x)) / (Math.cos(x) - 2) + 1;
    }
    static findRoot(error, x0 = 0, x1 = 1) {
        this.iterationCount = 0;
        let xPrev = x0;
        let xCur = x1;
        let i = 0;
        while (true) {
            this.iterationCount++;
            if (i == 1000) {
                return null;
            }
            const fCur = this.f(xCur);
            const fPrev = this.f(xPrev);
            const xNext = xCur - (fCur * (xCur - xPrev)) / (fCur - fPrev);
            if (Math.abs(xNext - xCur) < error) {
                return xNext;
            }
            xPrev = xCur;
            xCur = xNext;
            i++;
        }
    }
    static printRoot(error, x0 = 0, x1 = 1) {
        console.log(this.findRoot(error, x0, x1));
    }
}
// IterationAlgorithm.printRoot(10**-6, -1)
// ChordAlgorithm.printRoot(10**-6, 0, 1)
const realRoot = 1.7862432638652274839;
const table1 = [0, 0, 0, 0].map((value, index) => {
    const epsilon = 10 ** (-3 * (index + 1));
    const root = IterationAlgorithm.findRoot(epsilon, -1);
    return { epsilon: epsilon, calculation: root, error: Math.abs(root - realRoot) };
});
const table2 = [0, 0, 0, 0].map((value, index) => {
    const epsilon = 10 ** (-3 * (index + 1));
    const root = ChordAlgorithm.findRoot(epsilon, 0, 1);
    if (!root) {
        return { epsilon: epsilon, calculaiton: root, error: null };
    }
    return { epsilon: epsilon, calculation: root, error: Math.abs(root - realRoot) };
});
const table3 = [0, 0, 0, 0, 0, 0, 0, 0, 0].map((value, index) => {
    const epsilon = 10 ** (-3 * (index + 1));
    const startTime1 = performance.now();
    for (let i = 0; i < 5000; i++) {
        const root = IterationAlgorithm.findRoot(epsilon, -1);
    }
    const endTime1 = performance.now();
    const elapsedTime1 = endTime1 - startTime1;
    const startTime2 = performance.now();
    for (let i = 0; i < 5000; i++) {
        const root = ChordAlgorithm.findRoot(epsilon, 0, 1);
    }
    const endTime2 = performance.now();
    const elapsedTime2 = endTime2 - startTime2;
    return { epsilon: epsilon, iterationSpeed1: elapsedTime1 + 'ms', iterationSpeed2: elapsedTime2 + 'ms', iterationCount1: IterationAlgorithm.iterationCount, iterationCount2: ChordAlgorithm.iterationCount };
});
console.table(table1, ['epsilon', 'calculation', 'error']);
console.table(table2, ['epsilon', 'calculation', 'error']);
console.table(table3, ['epsilon', 'iterationSpeed1', 'iterationSpeed2', 'iterationCount1', 'iterationCount2']);
