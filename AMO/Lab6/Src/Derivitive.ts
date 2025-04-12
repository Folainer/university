export default class Derivative {
    private static readonly h = 0.0001

    public static first(f : (x : number) => number, x : number) {
        return (f(x + this.h) - f(x - this.h)) / (2 * this.h)
    }

    public static second(f : (x : number) => number, x : number) {
        return (f(x + this.h) - 2 * f(x) + f(x - this.h)) / this.h**2
    }
}