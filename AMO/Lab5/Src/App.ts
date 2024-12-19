// Variant 12 % 8-> 100(binary)
// X = 1
// Y = 0
// Z = 0

import f from './Function'
import SimpsonIntegration from './SimpsonIntegration'
import findP, { findError, findRelativeError } from './Algorithm'

const a = 3
const b = 10.5
let degree = 0

let i = 0
let err
while ((err = findRelativeError(f, a, b, degree)) > 10**(-2)) {
    console.log(`Step: ${i}, Degree: ${degree} Error: ${err}`)
    degree++
    i++
}

const x = 4;
const approx = findP(x, degree, a, b, true);
console.log(`Approximation at x=${x}: ${approx}`);




