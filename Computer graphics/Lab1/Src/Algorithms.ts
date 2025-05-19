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

class Time {
    public static check(func : Function, ...args : any) : number {
        let res = 0
        const quantity = 500
        for (let i = 0; i < quantity; i++) {
            const startTime = performance.now()
            func(...args)
            const endTime = performance.now()
            res += endTime - startTime
        }
        return res / quantity
    }
}