interface worldDataType {
    displacement: number
    chunk : number[][]
}

function createChunk(initialValue: number = BlockType.Air) : number[][] {
    return Array.from({ length: 8 }, () => Array(8).fill(initialValue));
}

enum BlockType {
    Air = 0,
    Solid = 1,
    Wall = 2
}

export default class GameWorld {
    private worldData: worldDataType[]
    private generatedChunks: number = 0

    constructor() {
        this.worldData = []
        this.generatedChunks = 0
    }

    generateWorld() {
        this.generateFirstChunk()
        for (let i = 0; i < 5; i++) {
            this.addChunk()
        }
    }

    getChunks() {
        return this.worldData
    }

    isBottomColision(x : number, y : number, z : number) {
        const xf = x | 0
        const yf = y | 0
        const xc = ~(~x - 1)
        const yc = ~(~y - 1)
        const zf = z | 0
        const block1 = this.getBlock(xf, yf)
        const block2 = this.getBlock(xf, yc)
        const block3 = this.getBlock(xc, yf)
        const block4 = this.getBlock(xc, yc)

        if (zf >= 0) {
            if (block1 === BlockType.Solid && zf <= 1) {
              return true;
            }
            if (block1 === BlockType.Wall && zf <= 3) {
              return true;
            }
            if (block2 === BlockType.Solid && zf <= 1) {
              return true;
            }
            if (block2 === BlockType.Wall && zf <= 3) {
              return true;
            }
            if (block3 === BlockType.Solid && zf <= 1) {
              return true;
            }
            if (block3 === BlockType.Wall && zf <= 3) {
              return true;
            }
            if (block4 === BlockType.Solid && zf <= 1) {    
                return true;
            }
            if (block4 === BlockType.Wall && zf <= 3) {
                return true;
            }
          }
        return false
    }

    getBlock(x: number, y: number) {
        const chunkIndex = Math.floor(y / 8)
        const chunk = this.worldData.find((chunk) => chunk.displacement === chunkIndex)
        if (!chunk) return BlockType.Air

        if (x >= 0 && x < 8) {
            return chunk.chunk[x][y % 8]
        }

        return BlockType.Air
    }

    private generateFirstChunk() {
        const chunk = createChunk(BlockType.Wall)

        for (let i = 1; i < 7; i++) {
            for (let j = 1; j < 8; j++) {
                chunk[i][j] = BlockType.Solid
            }
        }
        this.worldData.push({
            displacement: this.generatedChunks++,
            chunk: chunk
        })
    }

    addChunk() {
        if (this.worldData.length > 10) {
            this.worldData.shift()
        }
        const chunk = createChunk(BlockType.Air)
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                chunk[i][j] = Math.random() > 0.8 - 0.5 * Math.exp(-1/5 * this.generatedChunks) ? BlockType.Solid : BlockType.Air
            }
        }
        this.worldData.push({
            displacement: this.generatedChunks++,
            chunk: chunk
        })
    }
}