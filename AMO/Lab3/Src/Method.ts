import Matrix from "./Matrix"

class Method {
    matrix: Matrix
    vector: Matrix
    // resVector: Matrix | null

    constructor(matrix: Matrix, vector: Matrix) {
        this.matrix = matrix
        this.vector = vector
        // this.resVector = null
    }

    createAugmentedMatrix() : Matrix | null {
        if (this.matrix.col != this.matrix.row || this.matrix.row != this.vector.row || this.vector.col != 1) {
            console.error("The matrix and vector is incompatible")
            return null
        }

        for (let i = 0; i < this.matrix.col; i++) {
            if (this.matrix.get(i, i) == 0) {
                 console.error("The Gauss method is failed")
                 return null
            }
        }

        const augmentedMatrix = new Matrix(this.matrix.row, this.matrix.col + 1)

        for (let i = 0; i < augmentedMatrix.row; i++) {
            for (let j = 0; j < augmentedMatrix.col - 1; j++) {
                augmentedMatrix.set(i, j, this.matrix.get(i, j))
            }
            augmentedMatrix.set(i, augmentedMatrix.col - 1, this.vector.get(0, i))
        }

        return augmentedMatrix
    }

    solveGauss() : this {
        const augmentedMatrix = this.createAugmentedMatrix()

        if (augmentedMatrix == null) {
            return this
        }

        for (let i = 0; i < augmentedMatrix.row; i++) {
            const aii = augmentedMatrix.get(i, i)
            for (let j = 0; j < augmentedMatrix.col; j++) {
                const aij = augmentedMatrix.get(i, j)
                if (aii === null || aij === null) {
                    return this
                }
                augmentedMatrix.set(i, j, aij / aii)
            }
            for (let k = i + 1; k < augmentedMatrix.row; k++) {
                const aki = augmentedMatrix.get(k, i)
                for (let j = 0; j < augmentedMatrix.col; j++) {
                    const aij = augmentedMatrix.get(i, j)
                    const akj = augmentedMatrix.get(k, j)
                    if (aii == null || aij == null || aki == null || akj == null) {
                        return this
                    }
                    augmentedMatrix.set(k, j, akj - aki*aij)
                }
            }
        }

        augmentedMatrix.output(true)

        const resVector = new Matrix(augmentedMatrix.row, 1)

        for (let i = augmentedMatrix.row - 1; i >= 0; i--) {
            let resi = augmentedMatrix.get(i, augmentedMatrix.col - 1)
            if (resi === null) {
                return this
            }
            for (let j = augmentedMatrix.col - 2; j > i; j--) {
                const resj = resVector.get(j, 0)
                const matij = augmentedMatrix.get(i, j)
                if (resj === null || matij === null) {
                    return this
                }
                resi += - matij * resj
            }
            resVector.set(i, 0, resi)
        }
        
        resVector.output(false, true)

        return this
    }

    solveZedel() : this {
        const augmentedMatrix = this.createAugmentedMatrix()

        if (augmentedMatrix === null) {
            return this
        }

        let it = 0

        const resVector = new Matrix(augmentedMatrix.row, 1)

        for (let i = 0; i < augmentedMatrix.row; i++) {
            resVector.set(i, 0, 0);
        }

        let x0 : number | null = 0
        let x0_prev : number | null = 0

        while (it < 1000) {
            for (let i = 0; i < augmentedMatrix.row; i++) {
                const aii = augmentedMatrix.get(i, i)
                const ri = augmentedMatrix.get(i, augmentedMatrix.col - 1)
                // const xi = resVector.get(i, 0)
                if (aii === null || ri === null) {
                    return this
                }
                let res = ri 
                for (let j = 0; j < augmentedMatrix.col - 1; j++) {
                    if (j == i) {
                        continue
                    }
                    
                    const aij = augmentedMatrix.get(i, j)
                    const xj = resVector.get(j, 0)

                    if (j == 0) {
                        x0_prev = x0
                        x0 = xj
                    }
                    
                    if (aij === null || xj === null) {
                        return this
                    }
                    res -= aij * xj
                }
                console.log()

                resVector.set(i, 0, res / aii)
            }
            
            it++
        }
        resVector.output(false, true)

        if (x0 !== null && x0_prev !== null) {
            console.log("The error is ", Math.abs(x0-x0_prev))
        }
        return this
    }
}

export default Method