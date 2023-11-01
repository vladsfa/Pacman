import {store} from "../store/Store"
import {setLocation} from "../store/GhostReducer";
import {Point} from "../model/Point";
import {singleton} from "tsyringe";

@singleton()
export class GhostService{
    public setLocation(id: number, location: Point){
        store.dispatch(setLocation({id, location}));
    }
    public getLocation(id: number){
        const ghost = this.findGhost(id);

        return ghost.location;
    }

    public getAlgorithm(id: number){
        const ghost = this.findGhost(id);

        return ghost.algorithm;
    }

    public getAllGhosts(){
        return store.getState().ghosts;
    }

    public doStep(id: number, nextLocation: Point) {
        this.setLocation(id, nextLocation);
    }

    private findGhost(id: number){
        const ghost = store.getState().ghosts.find(ghost => ghost.id == id);
        if (!ghost){
            throw new Error("findGhost");
        }

        return ghost;
    }
}
