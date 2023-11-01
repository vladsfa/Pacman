import {Point} from "../Point";
import {MazePointType} from "./MazePointType";

export class MazePoint{
    point: Point
    type: MazePointType

    constructor(point: Point, type: MazePointType) {
        this.point = point;
        this.type = type;
    }

    equals(other: MazePoint): boolean {
        return (
            this.point.x === other.point.x &&
            this.point.y === other.point.y &&
            this.type === other.type
        );
    }

    hashCode(): number {
        return this.point.x + this.point.y + this.type;
    }
}
