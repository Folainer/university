class Matrix {
    matrix : number[][]
    row: number
    col: number

    constructor(row: number, col: number) {
        this.matrix = []
        this.row = row
        this.col = col

        for (let i = 0; i < row; i++) {
            this.matrix.push([])
            for (let j = 0; j < col; j++) {
                this.matrix[i].push(0)
            }
        }
    }

    fill(matrix: number[][]) : this {
        if (this.col == matrix.length && this.row == matrix[0].length) {
            this.matrix = matrix
        } else {
            console.error("The sizes are incompatible")
        }
        return this
    }

    output(isAgmentedMatrix : boolean = false, isResVector : boolean = false) : this {
        const Names = []
        for (let i = 0; i < this.col; i++) {
            if (i == this.col - 1 && isAgmentedMatrix) {
                Names.push('b')
            } else if (isResVector) {
                Names.push(`r${i+1}`)
            } else {
                Names.push(`a${i+1}`)
            }
        }
        this.printMatrix(this.matrix, Names)
        // console.table(this.matrix, Names)
        return this
    }

    private padEnd(str: string, targetLength: number, padChar = " "): string {
        if (str.length >= targetLength) return str;
        return str + padChar.repeat(targetLength - str.length);
      }

    private printMatrix(matrix: number[][], columnNames: string[]) {
    const colWidths = columnNames.map(
        (name, colIndex) =>
        Math.max(
            name.length,
            ...matrix.map(row => row[colIndex].toFixed(2).length)
        )
    );
    
    const formatRow = (row: number[] | string[]) =>
        row
        .map((val, i) => {
            if (typeof val == "string") {
                return this.padEnd(val, colWidths[i])
            } 
            return this.padEnd(val.toFixed(2), colWidths[i])
        })
        .join(" | ");
    
    console.log(formatRow(columnNames));
    console.log("-".repeat(colWidths.reduce((a, b) => a + b + 3, -3)));
    matrix.forEach(row => console.log(formatRow(row)));
    console.log()
    }

    getMatrix() : number[][] {
        return this.matrix
    }

    get(row: number, col: number) : number | null {
        try {
            return this.matrix[row][col]
        }
        catch(err) {
            return null
        }
    }

    set(row: number, col: number, value: number | null) : this {
        if (value == null) {
            console.error("The set matrix error")
            return this
        }
        try {
            this.matrix[row][col] = value
        }
        catch(err) {
            console.error("The set matrix error")
        }
        return this
    }
}

export default Matrix