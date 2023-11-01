import {MazePoint} from "./MazePoint";
import {Point} from "../Point";
import {MazePointType} from "./MazePointType";
import {Maze} from "./Maze";

export class MazeGenerator{
    public static getMaze(maze: string){
        const rows = maze.trim().split('\n');
        const points: MazePoint[][] = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            points[i] = [];

            for (let j = 0; j < row.length; j++) {
                const point: Point = {x: i, y: j};
                switch (row[j]){
                    case '.':
                        points[i][j] = new MazePoint(point, MazePointType.CELL);
                        break;
                    case '#':
                        points[i][j] = new MazePoint(point, MazePointType.WALL);
                        break;
                    default:
                        throw new Error("MazeGenerator");
                }
            }
        }

        return {points: points} as Maze;
    }

}
