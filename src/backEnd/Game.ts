import "reflect-metadata";
import {GhostService} from "./services/GhostService";
import {container, singleton} from "tsyringe";
import {MazeService} from "./services/MazeService";
import {PacmanService} from "./services/PacmanService";
import {AlgorithmService} from "./services/AlgorithmService";
import {Point} from "./model/Point";
import {CoinsService} from "./services/CoinsService";

@singleton()
export class Game{
    ghostService: GhostService;
    mazeService: MazeService;
    pacmanService: PacmanService;
    coinService: CoinsService;
    algorithmService: AlgorithmService;

    constructor() {
        this.ghostService = container.resolve(GhostService);
        this.mazeService = container.resolve(MazeService);
        this.pacmanService = container.resolve(PacmanService);
        this.coinService = container.resolve(CoinsService);
        this.algorithmService = container.resolve(AlgorithmService);
    }
    doStep() {
        const nextPacmanLocation = this.pacmanService.getNextLocation();

        if (!this.mazeService.isValidCell(nextPacmanLocation)){
            return false;
        }

        this.pacmanService.setLocation(nextPacmanLocation);

        if (this.coinService.isCoinCell(nextPacmanLocation)){
            const id = this.coinService.getIdCoin(nextPacmanLocation);
            this.coinService.collectCoin(id);
        }

        this.DoStepAllGhosts(nextPacmanLocation);

        return true;
    }

    public isDeath(){
        const pacmanLocation = this.pacmanService.getLocation();
        for (const ghost of this.ghostService.getAllGhosts()){
            if (ghost.location.x === pacmanLocation.x && ghost.location.y == pacmanLocation.y){
                return true;
            }
        }
        return false;
    }

    public isWin(){
        return this.coinService.isAllCoinsCollected();
    }

    private DoStepAllGhosts(pacmanLocation: Point){
        for (const ghost of this.ghostService.getAllGhosts()){
            const routeToTarget = this.algorithmService.getRoute(
                this.ghostService.getLocation(ghost.id),
                pacmanLocation,
                this.mazeService.getMazeMatrix(),
                this.ghostService.getAlgorithm(ghost.id));
            this.ghostService.doStep(ghost.id, routeToTarget[0]);
        }
    }
}
