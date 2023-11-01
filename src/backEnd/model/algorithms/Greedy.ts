import {Point} from "../Point";

export class Greedy{
    public static getRoute(start: Point, end: Point, maze: boolean[][]) :Point[]{
        const rows = maze.length;
        const cols = maze[0].length;
        const path: Point[] = [];

        const distances: number[][] = [];
        for (let i = 0; i < rows; i++) {
            distances[i] = new Array(cols).fill(Number.MAX_SAFE_INTEGER);
        }

        path.push({x: start.x, y: start.y});

        let current = start;
        while(current.x != end.x && current.y != end.y){

            const neighbors = this.getValidNeighbor(current, maze);

            for (const neighbor of neighbors){
                distances[neighbor.y][neighbor.x] = Math.sqrt(
                    Math.pow(current.x - neighbor.x, 2) +
                    Math.pow(current.y - neighbor.y, 2));
            }

            neighbors.sort((a, b) => distances[a.y][a.x] - distances[b.y][b.x])

            for (const neighbor of neighbors){
                distances[neighbor.y][neighbor.x] = Number.MAX_SAFE_INTEGER;
            }

            current = neighbors[0];
            path.push({x: current.x, y: current.y});
            console.log("here");
        }

        console.log(path);
        return path;
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
