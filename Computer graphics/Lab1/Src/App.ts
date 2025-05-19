const view1 = new View(700, 20)

const col1 : Color = [0,  255, 0, 100]
const col2 : Color = [0,  0, 255, 100]
const col3 : Color = [255,  0, 255, 100]

view1
.addTitle("Алгоритми растрування графічних примітивів")
.addText("Лабораторну роботу №1 виконав Крутогуз Максим")
.addTitle("Алгоритм ЦДА")
.addText("Резулатат алгоритму зображений зліва")

DDA.drawLine(view1, 4, 3, 10, 12, col1)
DDA.drawLine(view1, 2, 10, 19, 20)
DDA.drawLine(view1, 25, 24, 20, 2, col2)

const view2 = new View(800, 20)

view2
.addTitle('Алгоритм Брезенхема для растрування відрізка')
.addText("Результат алгоритму зображений зліва")


BresenhamLine.drawline(view2, 30, 15, 0, 30)
setTimeout(() => {
    BresenhamLine.drawline(view2, 24, 15, 1, 2, col1)
}, 2000)

const view3 = new View(800, 20)

view3
.addTitle('Алгоритм Ву')
.addText("Результат алгоритму зображений зліва")

WuLine.draw(view3, 0, 0, 20, 30)
WuLine.draw(view3, 1, 21, 30, 5, col2)
WuLine.draw(view3, 30, 5, 32, 20, col2)
WuLine.draw(view3, 32, 20, 1, 21, col2)
WuLine.draw(view3, 15, 15, 28, 25, col3)
WuLine.draw(view3, 15, 15, 20, 5, col3)
WuLine.draw(view3, 15, 15, 5, 17, col3)
WuLine.draw(view3, 15, 15, 9, 8, col3)
WuLine.draw(view3, 0, 4, 30, 5, col1)

// WuLine.draw(view3, 10, 30, 35, 25)
// WuLine.draw(view3, 35, 20, 35, 40)
// WuLine.draw(view3, 10, 30, 35, 20)


const view4 = new View(900, 15)

view4
.addTitle("Алгоритм растирування кола")
.addText("Резулатат алгоритму зображений зліва")

BresenhamCircle.draw(view4, 30, 30, 15)
BresenhamCircle.draw(view4, 25, 32, 18, col3)
BresenhamCircle.draw(view4, 15, 21, 8, col1)

const view5 = new View(900, 15)

view5
.addTitle("Порівняння швидкості алгоритмів")
.addText(`1) ${Time.check(DDA.drawLine, view5, 0, 1, 50, 11).toFixed(5)}`)
.addText(`2) ${Time.check(BresenhamLine.drawline, view5, 0, 5, 50, 15).toFixed(5)}`)
.addText(`3) ${Time.check(WuLine.draw, view5, 0, 10, 50, 20).toFixed(5)}`)
.addText(`4) ${Time.check(BresenhamCircle.draw, view5, 25, 25, 20, col3).toFixed(5)}`)