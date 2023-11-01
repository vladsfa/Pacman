import {Point} from "../Point";
import PriorityQueue from 'ts-priority-queue';

export class Astar{
    public static getRoute(start: Point, end: Point, maze: boolean[][]) :Point[]{
        const g_score: number[][] = [];
        const f_score: number[][] = [];

        for (let i = 0; i < maze.length; i++) {
            g_score[i] = [];
            f_score[i] = [];
            for (let j = 0; j < maze[i].length; j++){
                g_score[i][j] = Number.POSITIVE_INFINITY;
                f_score[i][j] = Number.POSITIVE_INFINITY;
            }
        }

        const aPath: Map<string, Point> = new Map<string, Point>();

        g_score[start.y][start.x] = 0;
        f_score[start.y][start.x] = this.h(start, end);

        const open = new PriorityQueue<[number, number, Point]>({
            comparator: (a, b) => a[0] - b[0],
        });

        open.queue([f_score[start.y][start.x], g_score[start.y][start.x], start]);

        while (open.length != 0) {
            const curr = open.dequeue()[2];
            if (curr.x === end.x && curr.y === end.y) {
                break;
            }

            const neighbors = this.getValidNeighbor(curr, maze);

            for (const neighbor of neighbors){
                const temp_g_score = g_score[neighbor.y][neighbor.x] + 1;
                const temp_f_score = temp_g_score + this.h(neighbor, end);

                if (temp_f_score < f_score[neighbor.y][neighbor.x]){
                    g_score[neighbor.y][neighbor.x] = temp_g_score;
                    f_score[neighbor.y][neighbor.x] = temp_f_score;
                    open.queue([temp_f_score, temp_g_score, neighbor]);
                    aPath.set(JSON.stringify(neighbor), curr);
                }
            }
        }

        const res: Point[] = [];
        let cellRes = start;
        while (cellRes.x != end.x && cellRes.y != end.y){
            const next = aPath.get(JSON.stringify(cellRes));
            if (!next){
                throw new Error("Astar");
            }

            res.push(next);
            cellRes = next;
        }

        return res;
    }

    private static h (p1: Point, p2: Point){
        return Math.sqrt(
            Math.pow(p1.x - p2.x, 2) +
            Math.pow(p1.y - p2.y, 2));
    }

    private static getValidNeighbor(current: Point, maze: boolean[][]){
        const neighbors: Point[] = [];

        if (maze[current.y][current.x - 1]) {
            neighbors.push({ x: current.x - 1, y: current.y });
        }
        if (maze[current.y][current.x + 1]) {
            neighbors.push({ x: current.x + 1, y: current.y });
        }
        if (maze[current.y - 1][current.x]) {
            neighbors.push({ x: current.x, y: current.y - 1 });
        }
        if (maze[current.y + 1][current.x]) {
            neighbors.push({ x: current.x, y: current.y + 1 });
        }

        return neighbors;
    }
}
