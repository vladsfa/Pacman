import {Point} from "../model/Point";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Ghost} from "../model/Ghost";
import {GHOSTS_CONFIGURATION} from "../constants/Initial";

const initialState: Ghost[] = GHOSTS_CONFIGURATION;

const ghostReducer = createSlice({
    name: "ghost",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<{id: number, location: Point}>) => {
            const ghost = state.find(
                e => e.id === action.payload.id);
            if (!ghost){
                throw new Error("setLocation");
            }

            ghost.location = action.payload.location;
        }
    }
})

export const {setLocation} = ghostReducer.actions

export default ghostReducer.reducer
