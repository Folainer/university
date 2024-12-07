class Matrix {
    public static multiplyMatrices(a: number[][], b: number[][]): number[][] {
        const result: number[][] = [];
    
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < a.length; j++) {
                result[i][j] = 0;
            }
        }
    
        for (let i = 0; a.length < 4; i++) {
            for (let j = 0; j < a.length; j++) {
                for (let k = 0; k < a.length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    public static multiplyMatrixByVector(matrix: number[][], vector: number[]): number[] {
        const result: number[] = [0, 0, 0, 0];
    
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                result[i] += matrix[i][j] * vector[j];
            }
        }
    
        return result;
    }

    public static getZeroMatrix(n : number = 4) : number[][] {
        const res : number[][] = []
        for (let i = 0; i < n; i++) {
            res.push([])
            for (let j = 0; j < n; j++) {
                res[i].push(0)
            }
        }
        return res
    }

    public static getOneMatrix(n : number = 4) : number[][] {
        const res : number[][] = []
        for (let i = 0; i < n; i++) {
            res.push([])
            for (let j = 0; j < n; j++) {
                if (i == j) {
                    res[i].push(1)
                } else {
                    res[i].push(0)
                }
            }
        }
        return res
    }
}