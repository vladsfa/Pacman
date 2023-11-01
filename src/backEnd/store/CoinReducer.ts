import {COINS_CONFIGURATION} from "../constants/Initial";
import {Coin} from "../model/Coin";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Coin[] = COINS_CONFIGURATION

const ghostReducer = createSlice({
    name: "coin",
    initialState,
    reducers: {
        setCoinState: (state, action: PayloadAction<{id: number, newState: boolean}>) => {
            const coin = state.find(
                e => e.id === action.payload.id);
            if (!coin){
                throw new Error("setLocation");
            }

            coin.isCollected = action.payload.newState;
        }
    }
})

export const {setCoinState} = ghostReducer.actions

export default ghostReducer.reducer
