import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Direction} from "../model/Direction";
import {Point} from "../model/Point";
import {Pacman} from "../model/Pacman";
import {PACMAN_CONFIGURATION} from "../constants/Initial";

const initialState: Pacman = PACMAN_CONFIGURATION;

const pacmanReducer = createSlice({
    name: "pacman",
    initialState,
    reducers: {
        setLocation: (state, location: PayloadAction<Point>) => {
            state.location = location.payload;
        },
        setDirection: (state, direction: PayloadAction<Direction>) => {
            state.direction = direction.payload;
        }
    }
})

export const {setLocation, setDirection} = pacmanReducer.actions

export default pacmanReducer.reducer
