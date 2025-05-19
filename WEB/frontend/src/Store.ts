import { configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice'
import gameReducer from './GameSlice'

export const Store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer
    }   
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch 