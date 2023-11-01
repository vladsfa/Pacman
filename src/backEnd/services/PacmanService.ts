import {store} from "../store/Store"
import {setDirection, setLocation} from "../store/PacmanReducer";
import {Point} from "../model/Point";
import {Direction} from "../model/Direction";
import {Pacman} from "../model/Pacman";
import {singleton} from "tsyringe";

@singleton()
export class PacmanService {
    private pacman: Pacman;

    constructor() {
        this.pacman = store.getState().pacman;
    }

    public getLocation(){
        return this.pacman.location;
    }

    public setLocation(point: Point){
        store.dispatch(setLocation(point));
    }

    public getDirection(){
        return this.pacman.direction;
    }
    public setDirection(direction: Direction){
        store.dispatch(setDirection(direction));
    }

    public getNextLocation(){
        const next: Point = Object.assign(this.getLocation());
        switch (this.getDirection()) {
            case Direction.N:
                next.y -= 1;
                break;
            case Direction.E:
                next.x += 1;
                break;
            case Direction.S:
                next.y += 1;
                break;
            case Direction.W:
                next.x -= 1;
                break;
            default:
                throw new Error("getNextLocation");
        }

        return next;
    }
}
