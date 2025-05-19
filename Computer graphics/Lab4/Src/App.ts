const col1 : Color = [0, 255, 0, 100]
const col2 : Color = [0, 0, 255, 100]
const col3 : Color = [255, 0, 255, 100]
const col4 : Color = [255, 0, 0, 100]
const col5 : Color = [255, 205, 0, 100]


const P0 : [number, number] = [10, 1]
const P1 : [number, number] = [1, 30]
const P2 : [number, number] = [30, 30]
const P3 : [number, number] = [34, 1]



const view1 = new View(1050, 2)
.addTitle("Фрактал сніжинка Коха")
.addText("Резулатат алгоритму зображений зліва")

// LineDrawer.drawLine(view1, 1, 2, 35, 10, col2)

const pos = new Point([200, 200])
const size = 150

KochSnowflake.draw(view1, 3, pos, size, col4)

// ShapeFiller.fill(view1, pos.x, pos.y, col1, col2)

// BezierCurve.draw(view1, P0, P1, P2, P3, col2)

// ShapeFiller.fill(view1, 18, 15, col4, col2)
// ShapeFiller.fill(view1, 1, 1, col5, col2)

view1.render()


const view2 = new View(1050, 1)
.addTitle("Множина Мальдеброта")
.addText("Резулатат алгоритму зображений зліва")

Mandelbrot.draw(view2, view2.pixelCount, view2.pixelCount)

view2.render()


const view3 = new View(1050, 1)
.addTitle("Трикутник Серпінського")
.addText("Резулатат алгоритму зображений зліва")

const n = 8
const pos2 = new Point([500, 600])
const size2 = 400

SerpinskiyTriangle.draw(view3, n, pos2, size2)


view3.render()