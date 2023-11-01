import {Point} from "./Point";
import {Algorithm} from "./algorithms/Algorithm";

export interface Ghost{
    id: number,
    location: Point,
    next: Point,
    algorithm: Algorithm
}
