import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
    name: string
    email: string
    nickname: string
    password: string
    birthday: string
    gender: string
    avatar: string | null
}

interface UserState {
    users: User[]
    currentUser: User | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

// const loadUsers = () => {
//     const data = localStorage.getItem('users')
//     return data ? JSON.parse(data) : []
// }

const loadCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser')
    return currentUser ? JSON.parse(currentUser) : null
}

const initialState: UserState = {
    users: [],
    currentUser: loadCurrentUser(),
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const response = await axios.get('http://localhost:5000/users')
        return response.data
    }
)

export const registerUserAsync = createAsyncThunk(
    'user/registerUser',
    async (userData : User) => {
        const response = await axios.post('http://localhost:5000/users', userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
        // console.log(userData)
        return response.data
    }
)

export const uploadAvatar = (nickname : string, avatarBase64: string) => async (dispatch : any) => {
    try {
        const res = await axios.post('http://localhost:5000/update_avatar', {
            nickname, 
            avatarBase64
        })

        if (res.data.success) {
            dispatch(updateAvatar(avatarBase64))
        } else {
            console.error('Sever error', res.data.error)
        }
    }
    catch(err) {
        console.error('Axios error', err)
    }
}

// export const loginUserAsync = createAsyncThunk(
//     'user/loginUser',
//     async (credentials: {nickname : string, password : string}) => {
//         const response = await axios.get('http://localhost:5000/users')
//         // const response = await axios.post('http://localhost:5000/login', credentials)
//         return response.data
//     }
// )


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // registerUser: (state, action : PayloadAction<User>) => {
        //     const newUser = {...action.payload}
        //     state.users.push(newUser)
        //     localStorage.setItem('users', JSON.stringify(state.users))
        //     state.currentUser = newUser
        //     localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        // },
        logout: (state) => {
            state.currentUser = null
            localStorage.removeItem('currentUser')
        },
        // loginUser: (state, action: PayloadAction<{nickname: string, password: string}>) => {
        //     const foundUser = state.users.find(user => {
        //         return user.nickname === action.payload.nickname && user.password === action.payload.password
        //     })
        //     if (foundUser) {
        //         state.currentUser = foundUser
        //         localStorage.setItem('currentUser', JSON.stringify(foundUser))
        //     }
        // }
        login: (state, action : PayloadAction<{nickname: string, password: string}>) => {
            const foundUser = state.users.find(user => (
                user.nickname === action.payload.nickname &&
                user.password === action.payload.password
            ))

            if (foundUser) {
                state.currentUser = foundUser
                localStorage.setItem('currentUser', JSON.stringify(foundUser))
                state.error = null
            } else {
                state.error = 'Invalid nickname or password'
            }
        },
        updateAvatar: (state, action) => {
            if (state.currentUser) {
                state.currentUser.avatar = action.payload
                localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ||  'Failed to fetch users'
        })

        .addCase(registerUserAsync.pending, (state) => {
            state.status = 'loading'
        })

        .addCase(registerUserAsync.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.users.push(action.payload)
            state.currentUser = action.payload
            state.error = null
        })
        .addCase(registerUserAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'Registration error'
        })

        // .addCase(loginUserAsync.fulfilled, (state, action) => {
        //     state.currentUser = action.payload
        // })
        // .addCase(loginUserAsync.rejected, (state, action) => {
        //     state.error = action.error.message || 'Login failed'
        // })
    }  
})

export const { logout, login, updateAvatar } = userSlice.actions
export default userSlice.reducer