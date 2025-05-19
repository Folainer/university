function uniformNodes(a: number, b: number, n: number): number[] {
    const step = (b - a) / n;
    return Array.from({ length: n + 1 }, (_, i) => a + i * step);
}

function SimpsonIntegration(f: (x: number) => number, a: number, b: number, n: number): number {
    if (n % 2 === 1) {
        n++;
    }
    let A = a + 0.000001
    let B = b - 0.000001
    const h = (B - A) / n;
    const x = uniformNodes(A, B, n);
    let integral = f(x[0]) + f(x[n]);
    for (let i = 1; i < n; i += 2) integral += 4 * f(x[i]);
    for (let i = 2; i < n - 1; i += 2) integral += 2 * f(x[i]);
    return (h / 3) * integral;
}

export default SimpsonIntegration