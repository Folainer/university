import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface GameResult {
    nickname: string
    score: string
    date: string
}

interface GameState {
    results: GameResult[]
    status: 'idle' | 'loading' | 'succeded' | 'failed'
    error: string | null
}

export const fetchGameResults = createAsyncThunk(
    'game/fetchGameResults',
    async () => {
        const response = await axios.get('http://localhost:5000/game_results')
        return response.data
    }
)

export const addGameResults = createAsyncThunk(
    'game/addGameResults',
    async (gameResult : GameResult) => {
        const response = await axios.post('http://localhost:5000/game_results', gameResult)
        return response.data
    }
)

// const loadResults = () => {
//     const data = localStorage.getItem('gameResults')
//     return data ? JSON.parse(data) : []
// }

const initialState : GameState = {
    results: [],
    status: 'idle',
    error: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        // recordGameResult: (state, action : PayloadAction<GameResult>) => {
        //     state.results.push(action.payload)
        //     localStorage.setItem('gameResults', JSON.stringify(state.results))
        // }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchGameResults.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchGameResults.fulfilled, (state, action) => {
            state.status = 'succeded'
            state.results = action.payload
        })
        .addCase(fetchGameResults.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Failded to fetch game results'
        })
        
        .addCase(addGameResults.fulfilled, (state, action) => {
            state.results.push(action.payload)
        })
    }
})

// export const { recordGameResult } = gameSlice.actions
export default gameSlice.reducer