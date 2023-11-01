import {Point} from "../model/Point";
import {Maze} from "../model/maze/Maze";
import {store} from "../store/Store"
import {MazePointType} from "../model/maze/MazePointType";
import {singleton} from "tsyringe";
import {MazePoint} from "../model/maze/MazePoint";

@singleton()
export class MazeService{
    private maze: Maze;
    constructor() {
        this.maze = store.getState().maze;
    }

    public isValidCell(point: Point){
        const maizePoint = this.findMaizePoint(point);

        return maizePoint.type != MazePointType.WALL;
    }

    public getMazeMatrix(){
        const matrix: boolean[][] = [];

        for (let i = 0; i < this.maze.points.length; i++) {
            matrix[i] = [];

            for (let j = 0; j < this.maze.points[i].length; j++) {
                matrix[i][j] = this.maze.points[i][j].type !== MazePointType.WALL;
            }
        }

        return matrix;
    }

    private findMaizePoint(point: Point){
        let maizePoint;
        for (let i of this.maze.points){
            for (let j of i){
                if (j.point.x === point.x && j.point.y === point.y){
                    maizePoint = j;
                }
            }
        }

        if (!maizePoint)
            throw new Error("findMazePoint");

        return maizePoint;
    }
}
