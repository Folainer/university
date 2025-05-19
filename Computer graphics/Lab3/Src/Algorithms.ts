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
        console.log(Px, Py)

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
            view.setPixel(x1, y1, color);
    
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
        let x_min = points[0].x
        let x_max = points[0].x
        let y_min = points[0].y
        let y_max = points[0].y

        points.forEach(point => {
            if (point.x > x_max) {
                x_max = point.x
            }

            if (point.x < x_min) {
                x_min = point.x
            }

            if (point.y > y_max) {
                y_max = point.y
            }

            if (point.y < y_min) {
                y_min = point.y
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
            const [x1, y1] = [points[i].x, points[i].y]
            const [x2, y2] = [points[i + 1].x, points[i + 1].y]
            LineDrawer.drawLine(view, x1, y1, x2, y2, strokeColor)
        }

        LineDrawer.drawLine(view, points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y, strokeColor)
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

