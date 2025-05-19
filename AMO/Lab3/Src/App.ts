import Method from "./Method";
import Matrix from "./Matrix";


const m = new Matrix(4, 4)
.fill([
    [10, 2, 0, 19],
    [2, 24, 7, 14],
    [10, 14, 29, 4],
    [20, 13, 3, 8]
])
// .fill([
//     [30, 2, 0, 19],
//     [2, 24, 7, 14],
//     [10, 14, 49, 4],
//     [20, 13, 3, 58]
// ])

.output()

const r = new Matrix(4, 1)

r.fill([
    [44, 114, 108, 61]
])

r.output()

const met = new Method(m, r)

met.solveGauss()
met.solveZedel()

// met.solveGauss()