import { useEffect } from 'react'
import { fetchUsers } from './UserSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './Store'
import { fetchGameResults } from './GameSlice'


export const StoreFetch = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchGameResults())
    }, [dispatch])

    return null
}