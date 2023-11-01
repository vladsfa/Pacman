import {Point} from "../model/Point";
import {Algorithm} from "../model/algorithms/Algorithm";
import {Astar} from "../model/algorithms/Astar";
import {Greedy} from "../model/algorithms/Greedy";
import {singleton} from "tsyringe";

@singleton()
export class AlgorithmService {
    public getRoute(start: Point, end: Point, maze: boolean[][], algorithm: Algorithm) :Point[]{
        switch (algorithm) {
            case Algorithm.Astar:
                return Astar.getRoute(start, end, maze);
            case Algorithm.Greedy:
                return Greedy.getRoute(start, end, maze);
            default:
                throw new Error("algorithms/AlgorithmService");
        }
    }
}
