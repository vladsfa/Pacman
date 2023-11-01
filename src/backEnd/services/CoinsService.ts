import {singleton} from "tsyringe";
import {Point} from "../model/Point";
import {MazePointType} from "../model/maze/MazePointType";
import {store} from "../store/Store";
import {setCoinState} from "../store/CoinReducer";

@singleton()
export class CoinsService{
    public setState(id: number, newState: boolean){
        store.dispatch(setCoinState({id, newState}));
    }

    public isCoinCollected(id: number){
        const coin = this.findCoin(id);

        return coin.isCollected;
    }

    public isCoinCell(point: Point){
        for(const coin of this.getAllCoins()){
            if (coin.location.x == point.x && coin.location.y == point.y){
                return true;
            }
        }

        return false;
    }

    public getIdCoin(point: Point){
        for(const coin of this.getAllCoins()){
            if (coin.location.x == point.x && coin.location.y == point.y){
                return coin.id;
            }
        }

        throw new Error();
    }

    public isAllCoinsCollected(){
        for (const coin of this.getAllCoins()) {
            if (!coin.isCollected)
                return false;
        }
        return true;
    }

    public collectCoin(id: number){
        this.setState(id, true);
    }

    private getAllCoins(){
        return store.getState().coins;
    }

    private findCoin(id: number){
        const coin = store.getState().coins.find(coin => coin.id == id);
        if (!coin){
            throw new Error("findCoin");
        }

        return coin;
    }
}
