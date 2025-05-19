class DDA {
    public static drawLine(view : View, x1 : number, y1: number, x2 : number, y2 : number, color?: Color,) : void {
        const px = Math.abs(x2 - x1)
        const py = Math.abs(y2 - y1)

        const py_px = py / px
        const px_py = px / py

        const time = 1

        // let [x_1, x_2] : [number, number] = (x1 < x2) ? [x1, x2] : [x2, x1]
        // let [y_1, y_2] : [number, number]= (y1 < y2) ? [y1, y2] : [y2, y1]
        let [x_1, x_2] : [number, number] = [x1, x2]
        let [y_1, y_2] : [number, number]= [y1, y2]

        if (y_1 > y_2) {
            [x_2, y_2] = [x_1, y_1];
            [x_1, y_1] = [x2, y2]
        }

        if (color) {
            view.setPixel(x_1, y_1, color)
        } else {
            view.setPixel(x_1, y_1)
        }

        let i = 0
        
        if (py_px < 1) {
            while (x_1 < x_2) {
                x_1++
                y_1 += py_px
    
                if (color) {
                    // setTimeout(() =>  {
                    //     view.setPixel(x_1, Math.round(y_1), color)
                    // }, i* time)
                    view.setPixel(x_1, Math.round(y_1), color)
                    
                } else {
                    // setTimeout(() =>  {
                    //     view.setPixel(x_1, Math.round(y_1))
                    // }, i*time)
                    view.setPixel(x_1, Math.round(y_1))
                }
                i++
            }
        } else {
            while (y_1 < y_2) {
                x_1 += px_py
                y_1++
    
                if (color) {
                    // setTimeout(() =>  {
                    //     view.setPixel(Math.round(x_1), y_1, color)
                    // }, i* time)
                    view.setPixel(Math.round(x_1), y_1, color)
                } else {
                    // setTimeout(() =>  {
                    //     view.setPixel(Math.round(x_1), y_1)
                    // }, i* time)
                    view.setPixel(Math.round(x_1), y_1)
                }
            }
            i++
        }
    }
}

class BresenhamLine {
    public static drawline(view : View, x1: number, y1 : number, x2 : number, y2 : number, color?: Color) : void {
        const dx = Math.abs(x1 - x2)
        const dy = Math.abs(y1 - y2)
        const sx = (x2 > x1) ? 1 : -1
        const sy = (y2 > y1) ? 1 : -1
        let error = dx - dy

        while (true) {
            view.setPixel(x1, y1, color)

            if (x1 == x2 && y1 == y2) {
                break
            }

            const err = error << 1

            if (err > -dy) {
                error -= dy
                x1 += sx
            }

            if (err < dx) {
                error += dx
                y1 += sy
            }
        }
    }
}

class WuLine {
    public static draw(view : View, x1 : number, y1 : number, x2 : number, y2: number, color?: Color) : void {
        if (y1 < y2 && x1 > x2) {
            [x1, x2] = [x2, x1];
            [y1, y2] = [y2, y1]
        }

        const dx = x2 - x1 
        const dy = y2 - y1


        let Py = (dy / dx != Infinity) ? Math.abs(dy / dx) : 1
        let Px = (dx / dy != Infinity) ? Math.abs(dx / dy) : 1


        view.setPixel(x1, y1, color)
        view.setPixel(x2, y2, color)
        
        if (!color) {
            color = [0,  0, 0, 100]
        }
        
        if (Py > 1) {
            Py = 1
        }
        
        if (Px > 1) {
            Px = 1
        }

        if (dx < 0) {
            Px = -Px
        }

        if (dy < 0) {
            Py = -Py
        }

        let i = 0;
        while (true) {
            const x = x1 + i*Px
            const y = y1 + i*Py

            if (Math.round(x) == x2 && Math.round(y) == y2) {
                break
            }

            if (i > 100) {
                break
            }

            if (Px == 1) {
                const f_y = Math.floor(y)
                color[3] = 100 - Math.abs(f_y - y)*100
                view.setPixel(x, f_y, color)
                color[3] = 100 - Math.abs(-y + f_y + 1)*100
                view.setPixel(x, f_y + 1, color)
            } else {
                const f_x = Math.floor(x)
                color[3] = 100 - Math.abs(f_x - x)*100
                view.setPixel(f_x, y, color)
                color[3] = 100 - Math.abs(-x + f_x + 1)*100
                view.setPixel(f_x + 1, y, color)
            }
            i++
        }

    }

    public static drawP(view : View, P1 : Point, P2 : Point, color? : Color) : void {
        WuLine.draw(view, P1.x, P1.y, P2.x, P2.y, color)
    }
}

class BresenhamCircle {
    public static draw(view : View, xc : number, yc : number, r : number, color? : Color) : void  {
        let [x, y] = [r, 0]
        let p = 1 - r

        while (x >= y) {
            view.setPixel(xc + x, yc + y, color)
            view.setPixel(xc + x, yc - y, color)
            view.setPixel(xc - x, yc - y, color)
            view.setPixel(xc + -x, yc + y, color)
            view.setPixel(xc + y, yc + x, color)
            view.setPixel(xc + -y, yc + x, color)
            view.setPixel(xc + y, yc - x, color)
            view.setPixel(xc + -y, yc - x, color)

            y++
            if (p < 0) {
                p += 2*y + 1
            } else {
                x--
                p += 2*(y - x) + 1
            }
        }
    }
}

class BezierCurve {
    public static draw(view : View, P0 : [number, number], P1 : [number, number], P2 : [number, number], P3 : [number, number], color? : Color) : void {
        const lengthes = [
            Math.sqrt((P0[0] - P1[0])**2 + (P0[1] - P1[1])**2),
            Math.sqrt((P0[0] - P2[0])**2 + (P0[1] - P2[1])**2),
            Math.sqrt((P0[0] - P3[0])**2 + (P0[1] - P3[1])**2),
            Math.sqrt((P1[0] - P2[0])**2 + (P1[1] - P2[1])**2),
            Math.sqrt((P1[0] - P3[0])**2 + (P1[1] - P3[1])**2),
            Math.sqrt((P2[0] - P3[0])**2 + (P2[1] - P3[1])**2)
        ]
        const dt = 1 / (2 * lengthes.sort().reverse()[0])
        for (let t = 0; t <= 1; t += dt) {
            const Ptx = Math.round(P0[0]* (1 - t)**3 + 3 * P1[0] * (1 - t)**2 * t + 3 * P2[0] * (1 - t) * t**2 + P3[0] * t**3)
            const Pty = Math.round(P0[1]* (1 - t)**3 + 3 * P1[1] * (1 - t)**2 * t + 3 * P2[1] * (1 - t) * t**2 + P3[1] * t**3)

            view.setPixel(Ptx, Pty, color)
        }
    }

    public static drawP(view : View, P0 : Point, P1 : Point, P2 : Point, P3 : Point, color? : Color) : void {
        this.draw(view, [P0.x, P0.y],  [P1.x, P1.y], [P2.x, P2.y],  [P3.x, P3.y],color)
        // console.log('+')
    }
}

class LineDrawer {
    /**
     * Draws a line between two points using Bresenham's Line Algorithm.
     * @param view The view object where the line will be drawn.
     * @param x1 The x-coordinate of the starting point.
     * @param y1 The y-coordinate of the starting point.
     * @param x2 The x-coordinate of the ending point.
     * @param y2 The y-coordinate of the ending point.
     * @param color (Optional) The color of the line.
     */
    public static drawLine(
      view: View,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color?: Color
    ): void {
        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;
    
        while (true) {
            view.setPixel(Math.round(x1), Math.round(y1), color);
    
            if (x1 === x2 && y1 === y2) break;
    
            const e2 = 2 * err;
    
            if (e2 > -dy) {
            err -= dy;
            x1 += sx;
            }
    
            if (e2 < dx) {
            err += dx;
            y1 += sy;
            }
        }
    }
}


class ShapeFiller {
    public static fill(view : View, x: number, y: number, fillColor: Color, strokeColor: Color) {
        const fillingPixels = [
            [x, y + 1],
            [x, y - 1],
            [x - 1, y],
            [x + 1, y]
        ]
        view.setPixel(x, y, fillColor)

        fillingPixels.forEach(pixel => {
            const color = view.getPixel(pixel[0], pixel[1])
            if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
                ShapeFiller.fill(view, pixel[0], pixel[1], fillColor, strokeColor)
            }
        })
    }

    public static fastFill(view : View, x: number, y: number, fillColor: Color, strokeColor: Color) {
        let x_move_l = x - 1
        let x_move_r = x

        let color = view.getPixel(x_move_r, y)
        while (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            view.setPixel(x_move_r, y, fillColor)
            x_move_r++
            color = view.getPixel(x_move_r, y)
        }
        color = view.getPixel(x_move_r - 1, y + 1)
        if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            this.fastFill(view, x_move_r - 1, y + 1, fillColor, strokeColor)
        }
        color = view.getPixel(x_move_r - 1, y - 1)
        if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            this.fastFill(view, x_move_r - 1, y - 1, fillColor, strokeColor)
        }
        color = view.getPixel(x_move_l, y)
        while (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            view.setPixel(x_move_l, y, fillColor)
            x_move_l--
            color = view.getPixel(x_move_l, y)
        }
        color = view.getPixel(x_move_l + 1, y + 1)
        if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            this.fastFill(view, x_move_l + 1, y + 1, fillColor, strokeColor)
        }
        color = view.getPixel(x_move_l + 1, y - 1)
        if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            this.fastFill(view, x_move_l + 1, y - 1, fillColor, strokeColor)
        }
        const middleX = Math.floor((x_move_l + x_move_r) / 2)
        color = view.getPixel(middleX, y + 1)
        if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            this.fastFill(view, middleX, y + 1, fillColor, strokeColor)
        }
        color = view.getPixel(middleX, y - 1)
        if (color && !this.compareColors(color, fillColor) && !this.compareColors(color, strokeColor)) {
            this.fastFill(view, middleX, y - 1, fillColor, strokeColor)
        }
    }

    public static compareColors(col1 : Color, col2 : Color) : boolean {
        let res = true
        col1.forEach((col1Part, i ) => {
            if (col1Part !== col2[i]) {
                res = false
            }
        })
        return res
    }

    public static drawRect(view: View, x : number, y: number, height : number, width : number, fillColor : Color, strokeColor : Color) {
        const points = [
            [x, y, x + width, y],
            [x, y + height, x + width, y + height],
            [x, y + 1, x, y + height - 1],
            [x + width, y + 1, x + width, y + height - 1]
        ]

        points.forEach(point => {
            LineDrawer.drawLine(view, point[0], point[1], point[2], point[3], strokeColor)
        })

        for (let i = y + 1; i < y + height; i++) {
            for (let j = x + 1; j < x + width; j++) {
                view.setPixel(j, i, fillColor)
            }
        }
    }

    public static drawPolygon(view : View, fillColor : Color, strokeColor : Color, ...points : Point[]) {
        let x_min = points[0].rx
        let x_max = points[0].rx
        let y_min = points[0].ry
        let y_max = points[0].ry

        points.forEach(point => {
            if (point.rx > x_max) {
                x_max = point.rx
            }

            if (point.rx < x_min) {
                x_min = point.rx
            }

            if (point.ry > y_max) {
                y_max = point.ry
            }

            if (point.ry < y_min) {
                y_min = point.ry
            }
        })


        for (let i = y_min; i <= y_max; i++) {
            for (let j = x_min; j <= x_max; j++) {
                const color = view.getPixel(j, i)
                if (color && this.isInside(new Point([j, i]), ...points)) {
                    view.setPixel(j, i, fillColor)
                }
            }
        }

        for (let i = 0; i < points.length - 1; i++) {
            const [x1, y1] = [points[i].rx, points[i].ry]
            const [x2, y2] = [points[i + 1].rx, points[i + 1].ry]
            LineDrawer.drawLine(view, x1, y1, x2, y2, strokeColor)
        }

        LineDrawer.drawLine(view, points[0].rx, points[0].ry, points[points.length - 1].rx, points[points.length - 1].ry, strokeColor)
    }

    private static isInside(checkingPoint: Point, ...points: Point[]): boolean {
        let count = 0;
        const n = points.length;
    
        for (let i = 0; i < n; i++) {
            const pointA = points[i];
            const pointB = points[(i + 1) % n];
    
            if (
                (checkingPoint.y > Math.min(pointA.y, pointB.y)) &&
                (checkingPoint.y <= Math.max(pointA.y, pointB.y)) &&
                (checkingPoint.x <= Math.max(pointA.x, pointB.x)) &&
                pointA.y !== pointB.y
            ) {
                const xinters =
                    (checkingPoint.y - pointA.y) * (pointB.x - pointA.x) / (pointB.y - pointA.y) + pointA.x;
                if (checkingPoint.x < xinters) {
                    count++;
                }
            }
        }
    
        return count % 2 !== 0;
    }    
}

class ColorConverter {
    public static hslToRgb(h: number, s: number, l: number): [number, number, number] {
        h = h % 360;
        if (h < 0) h += 360;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else if (h >= 300 && h < 360) {
            r = c; g = 0; b = x;
        }

        return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        ];
    }
}


class KochSnowflake {
    public static draw(view : View, n: number, pos : Point, size : number, color?: Color) {
        const p1 = pos.plus(new Point([0, -size]))
        const p2 = pos.plus(new Point([size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6)]))
        const p3 = pos.plus(new Point([-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6)]))

        const edges = this.getEdges(p1, p2, p3)
        edges.forEach(edge => {
            this.step(view, n, edge, color)
        })
    }

    private static step(view: View, n: number, edge: Point[], color? : Color) {
        // const splitA = [Math.min(edge[0].x, edge[1].x) + Math.abs(edge[0].x - edge[1].x) * 2 / 3 , Math.min(edge[0].y, edge[1].y) + Math.abs(edge[0].y - edge[1].y) * 2 / 3]

        // const splitB = [Math.min(edge[0].x, edge[1].x) + Math.abs(edge[0].x - edge[1].x) * 1 / 3 , Math.min(edge[0].y, edge[1].y) + Math.abs(edge[0].y - edge[1].y) * 1 / 3]

        const [p1, p2] = [...edge]

        const splitA = p1.distribution(1/3, p2)
        const splitB = p1.distribution(2/3, p2)

        const length = splitA.getLength(splitB)
        const normal = Point.findNormal(splitA, splitB)
        const displacement = normal.multiplyK(length)
        const displacementPoint = p1.distribution(1/2, p2).plus(displacement)

        if (n == 0) {
            LineDrawer.drawLine(view, p1.rx, p1.ry, splitA.rx, splitA.ry, color)
            LineDrawer.drawLine(view, p2.rx, p2.ry, splitB.rx, splitB.ry, color)
            LineDrawer.drawLine(view, splitB.rx, splitB.ry, displacementPoint.rx, displacementPoint.ry, color)
            LineDrawer.drawLine(view, splitA.rx, splitA.ry, displacementPoint.rx, displacementPoint.ry, color)
            return
        } else {
            this.step(view, n - 1, [p1, splitA], color)
            this.step(view, n - 1, [splitA, displacementPoint], color)
            this.step(view, n - 1, [displacementPoint, splitA], color)
            this.step(view, n - 1, [displacementPoint, splitB], color)
            this.step(view, n - 1, [splitB, p2], color)
        }
    }

    private static getEdges(p1: Point, p2: Point, p3 : Point) {
        return [
            [p1, p2],
            [p2, p3],
            [p3, p1],
        ]
    }
}

class Mandelbrot {
    public static draw(view : View, pixelHeight : number, pixelWidth : number) {
        const N = 200
        for (let i = 0; i < pixelHeight; i++) {
            for (let j = 0; j < pixelWidth; j++) {
                const p = Point.MandelbrotMap(i, j, pixelWidth, pixelHeight)
                let res = new Point([0, 0])

                let it = N;
                let isConvergent = true

                while (it > 0) {
                    if (res.length > 2) {
                        isConvergent = false
                        break
                    }

                    res = res.comlexPow2.plus(p)
                    it--
                }

                if (isConvergent) {
                    view.setPixel(i, j, [0, 0, 0, 100])
                } else {
                    const hue = it / N * 220 // 360 deg
                    // console.log(hue)
                    view.setPixel(i, j, [...ColorConverter.hslToRgb(hue, .8, .4), 100])
                }
            }
        }
    }
}

class SerpinskiyTriangle {
    public static draw(view: View, n: number, pos : Point, size: number) {
        const p1 = pos.plus(new Point([0, -size]))
        const p2 = pos.plus(new Point([size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6)]))
        const p3 = pos.plus(new Point([-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6)]))

        this.step(view, n, p1, p2, p3)
    }

    private static step(view: View, n: number, p1 : Point, p2 : Point, p3 : Point) {
        if (n !== 0) {
            const mid12 = p1.distribution(.5, p2)
            const mid23 = p2.distribution(.5, p3)
            const mid31 = p3.distribution(.5, p1)

            this.step(view, n - 1, p1, mid12, mid31)
            this.step(view, n - 1, mid12, p2, mid23)
            this.step(view, n - 1, mid31, mid23, p3)
        } else {
            // const color = ColorConverter.hslToRgb( .8, .4)
            ShapeFiller.drawPolygon(view, [0, 150, 0, 100], [0, 150, 0, 100], p1, p2, p3)
        }
    }
}