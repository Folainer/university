const col1 : Color = [0, 255, 0, 100]
const col2 : Color = [0, 0, 255, 100]
const col3 : Color = [255, 0, 255, 100]
const col4 : Color = [255, 0, 0, 100]
const col5 : Color = [255, 205, 0, 100]


const P0 : [number, number] = [10, 1]
const P1 : [number, number] = [1, 30]
const P2 : [number, number] = [30, 30]
const P3 : [number, number] = [34, 1]

const view1 = new View(1050, 30)
.addTitle("Рекурсивний алгоритм заливки контуру")
.addText("Резулатат алгоритму зображений зліва")

LineDrawer.drawLine(view1, 1, 2, 35, 10, col2)

BezierCurve.draw(view1, P0, P1, P2, P3, col2)

ShapeFiller.fill(view1, 18, 15, col4, col2)
ShapeFiller.fill(view1, 1, 1, col5, col2)

view1.render()


const view2 = new View(1050, 30)
.addTitle("Покращений рекурсивний алгоритм заливки контуру")
.addText("Резулатат алгоритму зображений зліва")

LineDrawer.drawLine(view2, 1, 2, 35, 10, col2)

BezierCurve.draw(view2, P0, P1, P2, P3, col2)

ShapeFiller.fastFill(view2, 15, 16, col4, col2)

ShapeFiller.fastFill(view2, 1, 1, col5, col2)

view2.render()



const view3 = new View(1050, 30)
.addTitle("Простий алгоритм для фарбування прямокутників")
.addText("Резулатат алгоритму зображений зліва")

ShapeFiller.drawRect(view3, 10, 10, 15, 20, col4, col2)

view3.render()


const view4 = new View(1050, 30)
.addTitle("Алгоритм для фарбування многокутників")
.addText("Резулатат алгоритму зображений зліва")

const points = [
    new Point([3, 3]),
    new Point([25, 5]),
    new Point([22, 20]),
    new Point([5, 12]),
]

ShapeFiller.drawPolygon(view4, col4, col2, ...points)


view4.render()


const view5 = new View(1050, 10)
.addTitle("Порівняння алгоритмів")

const coords_prev = [
    [4, 4],
    [12, 26],
    [23, 16],
    [25, 7],
    [7, 2]
]

const coords = coords_prev.map(coord => {
    return [(coord[0] - 2)*2, coord[1]*2]
})

const points2 = coords.map(coord => {
    return new Point([coord[0], coord[1]])
})

const coords2 = coords.map(coord => {
    return [coord[0] + 50, coord[1]]
})

const al1T : number[][] = []
const al2T = []
const al4T = []

const countLoop = 100
for (let i = 0; i < countLoop; i++) {
    view5.clear()
    const al1S = performance.now()

    const coord2N = coords2.length
    for (let i = 0; i < coord2N; i++) {
        LineDrawer.drawLine(view5, coords2[i][0], coords2[i][1], coords2[(i + 1) % coord2N][0], coords2[(i + 1) % coord2N][1], col1)
    }

    ShapeFiller.fill(view5, 60, 20, col5, col1)

    const al1E = performance.now()


    al1T.push([al1S, al1E])

    const coords3 = coords.map(coord => {
        return [coord[0], coord[1] + 50]
    })


    const al2S = performance.now()

    const coord3N = coords3.length
    for (let i = 0; i < coord3N; i++) {
        LineDrawer.drawLine(view5, coords3[i][0], coords3[i][1], coords3[(i + 1) % coord3N][0], coords3[(i + 1) % coord3N][1], col1)
    }

    ShapeFiller.fastFill(view5, 20, 65, col5, col1)

    const al2E = performance.now()

    al2T.push([al2S, al2E])

    const al4S = performance.now()

    ShapeFiller.drawPolygon(view5, col5, col1, ...points2)

    const al4E = performance.now()

    al4T.push([al4S, al4E])
    
    view5.render()
}

const reduce1 = al1T.reduce((acc, record) => {
    return [acc[0] = record[0] + acc[0], record[1] + acc[1]]
}, [0, 0])
const reduce2 = al2T.reduce((acc, record) => {
    return [acc[0] = record[0] + acc[0], record[1] + acc[1]]
}, [0, 0])
const reduce4 = al4T.reduce((acc, record) => {
    return [acc[0] = record[0] + acc[0], record[1] + acc[1]]
}, [0, 0])
view5.addText(`Рекурсивний алгоритм заливки контуру:  ${(reduce1[1] - reduce1[0]) / countLoop}`)
view5.addText(`Покращений рекурсивний алгоритм заливки контуру: ${(reduce2[1] - reduce2[0]) / countLoop}`)
view5.addText(`Алгоритм для фарбування многокутників: ${(reduce4[1] - reduce4[0]) / countLoop}`)
