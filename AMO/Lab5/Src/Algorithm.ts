import f from "./Function";
import SimpsonIntegration from "./SimpsonIntegration";

function MapToX(t: number, a: number, b: number) {
    return (b + a) / 2 + t * (b - a) / 2;
}

function MapToT(x: number, a: number, b: number) {
    return (2 * x - (a + b)) / (b - a);
}

function chebyshevPolynomial(n: number, x: number): number {
    switch(n) {
        case 0: return 1;
        case 1: return x;
        case 2: return 2 * x * x - 1;
        case 3: return 4 * x * x * x - 3 * x;
        default: 
            let T0 = 1, T1 = x, Tn;
            for (let i = 2; i <= n; i++) {
                Tn = 2 * x * T1 - T0;
                T0 = T1;
                T1 = Tn;
            }
            return T1;
    }
}

function calculateCoef(k: number, a: number, b: number): number {
    const weightFactor = (b - a) / 2; 
    const integrationRange = [-1, 1]; 

    const integral = SimpsonIntegration((t: number) => {
        if (Math.abs(t) >= 1) return 0;
        
        const x = MapToX(t, a, b); 
        const f_t = f(x); 
        const T_k = chebyshevPolynomial(k, t); 
        
        return (f_t * T_k) / Math.sqrt(1 - t * t); 
    }, integrationRange[0], integrationRange[1], 2000); 

    return k === 0 ? 
        (1 / Math.PI) * weightFactor * integral : 
        (2 / Math.PI) * weightFactor * integral;
}

function findP(x: number, n: number, a: number, b: number, isOutput: boolean = false): number {
    const t = MapToT(x, a, b); 
    let res = 0;
    const coefficients: number[] = [];

    for (let k = 0; k <= n; k++) {
        const coef = calculateCoef(k, a, b); 
        coefficients.push(coef);
        const step = coef * chebyshevPolynomial(k, t); 
        res += step;
        
        if (isOutput) {
            console.log(`Coefficient c_${k}: ${coef}, Term: ${step}`);
        }
    }

    if (isOutput) {
        console.log('Coefficients:', coefficients);
    }

    return res;
}

function findError(f: Function, a: number, b: number, n: number = 5, integralPrecision: number = 10000): number {
    const P = (x: number) => findP(x, n, a, b); 
    return SimpsonIntegration(
        (x: number) => Math.abs(f(x) - P(x)), 
        a,
        b,
        integralPrecision
    );
}

function findRelativeError(f: Function, a: number, b: number, n: number = 5, integralPrecision: number = 1000): number {
    const P = (x: number) => findP(x, n, a, b);

    const relativeErrorSquared = SimpsonIntegration((x: number) => {
        const actual = f(x);
        const approx = P(x);
        
        if (actual === 0) {
            return Math.abs(approx) ** 2;
        }
        
        const relativeError = Math.abs((actual - approx) / actual);
        return relativeError ** 2;
    }, a, b, integralPrecision);

    return Math.sqrt(relativeErrorSquared);
}

export default findP;
export { findError, findRelativeError };