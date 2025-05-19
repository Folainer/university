import { Graph } from "./Canvas"
import { f, Spline } from "./Algorithm"


const height = 800;
const width = 800;
const a = 3;
const b = 10.5;
const scale = .7;

const n = 30

const graph = new Graph(height, width, a, b, scale);
graph.drawFunction(f, 'red', false);
const spline = new Spline(a, b, n)
graph.drawFunction(spline.interpolate(), 'green')
graph.export('./graph.png');