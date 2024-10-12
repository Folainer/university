const col1 : Color = [0, 255, 0, 100]
const col2 : Color = [0, 0, 255, 100]
const col3 : Color = [255, 0, 255, 100]
const col4 : Color = [255, 0, 0, 100]
const col5 : Color = [255, 205, 0, 100]


const P0 : [number, number] = [20, 1]
const P1 : [number, number] = [1, 60]
const P2 : [number, number] = [60, 60]
const P3 : [number, number] = [75, 1]

const P0_1 : [number, number] = [25, 10]
const P1_1 : [number, number] = [10, 6]
const P2_1: [number, number] = [20, 40]
const P3_1 : [number, number] = [65, 60]

const view1 = new View(1050, 15)
.addTitle("Алгоритм кривих без'є")
.addText("Резулатат алгоритму зображений зліва")
// .setPixel(1, 0)

WuLine.draw(view1, 40, 10, 50, 30, col1)

BezierCurve.draw(view1, P0, P1, P2, P3, col2)
BezierCurve.draw(view1, P0_1, P1_1, P2_1, P3_1, col3)

view1.setPixel(P0[0], P0[1], col4)
.setPixel(P1[0], P1[1], col4)
.setPixel(P2[0], P2[1], col4)
.setPixel(P3[0], P3[1], col4)

.setPixel(P0_1[0], P0_1[1], col5)
.setPixel(P1_1[0], P1_1[1], col5)
.setPixel(P2_1[0], P2_1[1], col5)
.setPixel(P3_1[0], P3_1[1], col5)

// .rotate(0, 0, Math.PI / 2)

.render()

// .clear()

const view2 = new View(1050, 15)
.addTitle("Результат трансоформації обертання")

// Points1.forEach(point => {
//     point = point.rotateZ(Math.PI / 8)
//     view2.setPixel(point.x, point.y, col4)
// })

// console.log(Points1)

// BezierCurve.drawP(view2, Points1[0], Points1[1], Points1[2], Points1[3], col2)

// view2.render()

const Points1 = [new Point(P0), new Point(P1), new Point(P2), new Point(P3)]

function animation1(frame : number) {
    setTimeout(() => animation1(frame + 1), 50)
    
    view2.clear()

    const Points2 = Points1.map(point => {
        const resPoint = point.rotateZ(Math.PI * frame / 100)
        return resPoint
    })
  
    BezierCurve.drawP(view2, Points2[0], Points2[1], Points2[2], Points2[3], col2)
    
    Points2.forEach(point => {
        view2.setPixel(point.x, point.y, col4)
    })
    
    view2.render()
}

animation1(0)

// WuLine.draw(view2, Point.rotateZ([40, 10], Math.PI / 2), Point.rotateZ([50, 30], Math.PI / 2))
// BezierCurve.draw(view2, Point.rotateZ(P0, Math.PI / 2) , P1, P2, P3, col2)

const view3 = new View(1050, 15)
.addTitle("Результат трансоформації масштабування")

function animation2(frame : number = 0) {
    setTimeout(() => animation2(frame + 1), 50)
    
    view3.clear()

    const Points2 = Points1.map(point => {
        const resPoint = point.scale(Math.abs(Math.sin(frame / 20) + 0.2), 1 + 0.3 * Math.cos(frame / 40))
        return resPoint
    })
  
    BezierCurve.drawP(view3, Points2[0], Points2[1], Points2[2], Points2[3], col2)
    
    Points2.forEach(point => {
        view3.setPixel(point.x, point.y, col4)
    })
    
    view3.render()
}

animation2()



const view4 = new View(1050, 15)
.addTitle("Результат трансоформації зміщення")

function animation3(frame : number = 0) {
    setTimeout(() => animation3(frame + 1), 50)
    
    view4.clear()

    const Points2 = Points1.map(point => {
        const resPoint = point.translate(10 + 20 * Math.sin(frame / 20))
        return resPoint
    })
  
    BezierCurve.drawP(view4, Points2[0], Points2[1], Points2[2], Points2[3], col2)
    
    Points2.forEach(point => {
        view4.setPixel(point.x, point.y, col4)
    })
    
    view4.render()
}

animation3()



const CubePoints = [new Point([-15, -15]), new Point([-15, 15]), new Point([15, 15]), new Point([15, -15])]

const view5 = new View(1050, 15)
.addTitle("Комбінація всіх трансформацій")

function cubeAnimation(frame : number = 0) {
    setTimeout(() => cubeAnimation(frame + 1), 50)

    const view = view5
    
    view.clear()

    const Points = CubePoints.map(point => {
        let resPoint = point.scale(Math.abs(0.9 * Math.sin(frame / 20) + 0.4), 0.9 * Math.abs(Math.sin(frame / 20) + 0.4))
        resPoint = resPoint.rotateZ(Math.PI * frame / 100)
        resPoint = resPoint.translate(40, 40)
        // resPoint
        return resPoint
    })
  
    // BezierCurve.drawP(view, Points2[0], Points2[1], Points2[2], Points2[3], col2)

    WuLine.drawP(view, Points[0], Points[1], col1)
    WuLine.drawP(view, Points[1], Points[2], col1)
    WuLine.drawP(view, Points[2], Points[3], col1)
    WuLine.drawP(view, Points[3], Points[0], col1)
    
    Points.forEach(point => {
        view.setPixel(point.x, point.y, col4)
    })
    
    view.render()
}

cubeAnimation()
