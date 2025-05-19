function F(x: number) {
    return Math.exp(x) - x**3 / 6 - x**2 / 2
}

function f(x: number) {
    return Math.exp(x) - x**2 / 2 - x
}

function NewtonLeibniz(Fun: Function, a: number, b: number) {
    return Fun(b) - Fun(a)
}

function findIntegral(fun: Function, a: number, b: number, n: number) {
    let h = (b - a) / n
    let I = 0
    for (let j = a + h; j <= b; j += h) {
        let y0 = fun(j - h)
        let y1 = fun(j)
        I += h * (y0 + y1) / 2
    }
    return I
}

let a = 1
let b = 17


// first table
let i = 0

const res = []

while (i < 5) {
    let n = 10**i
    
    let y = findIntegral(f, a, b, n)

    res.push({
        "epsilon(split coef)": n,
        "integration step": (b - a) / n,
        "integralValue": Math.round(y),
        "delta error": Math.round(Math.abs(y - NewtonLeibniz(F, a, b,)))
    })

    // console.log(y)

    i++
}

console.table(res)


//seconde table
const res2 = []

let k = 0
let m = 1

let delta = 10**8

while (k < 5) {
    let n = 10**m
    
    let y = findIntegral(f, a, b, n)
    let y_prev = findIntegral(f, a, b, n / 10)

    while (Math.abs(y - y_prev) > delta) {
        m++
        n = 10**m
        y = findIntegral(f, a, b, n)
        y_prev = findIntegral(f, a, b, n / 10)
    }
    
    res2.push({
        "delta error": delta,
        "integration step": (b - a) / n,
        "real error": Math.round(Math.abs(y - NewtonLeibniz(F, a, b,)))
    })

    delta /=10

    k++
    m++
}

console.table(res2)