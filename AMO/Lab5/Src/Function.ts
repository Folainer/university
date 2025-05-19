export default function f(x: number) {
    if (x === 0) {
        return 0
    }
    return 0.1 * x ** 2 * Math.log10(Math.abs(Math.sin(x / 1.7)) / 2)
}