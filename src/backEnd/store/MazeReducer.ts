import {Maze} from "../model/maze/Maze";
import {createSlice} from "@reduxjs/toolkit";
import {MazeGenerator} from "../model/maze/MazeGenerator";
import {MAZE_CONFIGURATION} from "../constants/Initial";

const initialState: Maze = MazeGenerator.getMaze(MAZE_CONFIGURATION);

const mazeReducer = createSlice({
    name: "maze",
    initialState,
    reducers: {

    }
})

export default mazeReducer.reducer;

