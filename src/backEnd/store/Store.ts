import {configureStore} from "@reduxjs/toolkit";
import pacmanReducer from './PacmanReducer'
import ghostReducer from "./GhostReducer";
import mazeReducer from "./MazeReducer";
import coinReducer from "./CoinReducer";

export const store = configureStore({
   reducer: {
       pacman: pacmanReducer,
       ghosts: ghostReducer,
       maze: mazeReducer,
       coins: coinReducer
   },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
