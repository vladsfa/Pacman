import {Point} from "../model/Point";
import {Direction} from "../model/Direction";
import {Pacman} from "../model/Pacman";
import {Ghost} from "../model/Ghost";
import {Algorithm} from "../model/algorithms/Algorithm";
import {Coin} from "../model/Coin";

export const PACMAN_CONFIGURATION: Pacman = {
    location: {
        x: 1,
        y: 1
    },
    direction: Direction.S
}

export const GHOSTS_CONFIGURATION: Ghost[] = [
    {
        id: 1,
        location: {
            x: 7,
            y: 3
        },
        next: {
            x: 7,
            y: 4
        },
        algorithm: Algorithm.Astar
    },
    {
        id: 0,
        location: {
            x: 8,
            y: 14
        },
        next: {
            x: 7,
            y: 10
        },
        algorithm: Algorithm.Astar
    },
    {
        id: 0,
        location: {
            x: 1,
            y: 20
        },
        next: {
            x: 1,
            y: 19
        },
        algorithm: Algorithm.Astar
    }
]

export const COINS_CONFIGURATION : Coin[] = [
    {
        id: 1,
        location: {
            x: 8,
            y: 5
        },
        isCollected: false
    },
    {
        id: 2,
        location: {
            x: 3,
            y: 11
        },
        isCollected: false
    },
    {
        id: 3,
        location: {
            x: 4,
            y: 19
        },
        isCollected: false
    }
]


export const MAZE_CONFIGURATION = `
###########
#........##
#.##.###.##
#........##
#.#..##.###
#.#..##..##
#.##.###.##
#.....##.##
###.#.##.##
#...#....##
#.#.#.##.##
#.#......##
#.###.##.##
#...#.##.##
#.#.#....##
#.#...##.##
#.###.##.##
#...#....##
#.###.##.##
#........##
#.##.###.##
#........##
###########
`;

