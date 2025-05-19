import { Paper, Typography, TextField, Button, Box, Snackbar, Alert } from "@mui/material"
import Footer from "../MainComponents/Footer"
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "../UserSlice"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Store"
import { useNavigate } from "react-router-dom"

const SigninPage = () => {
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const message = useRef<string>('')


    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    
    const userState = useSelector((state: RootState) => state.user) as { currentUser: { name: string, email: string, nickname: string, birthday: string, gender: string } | null }


    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (!isSubmitting) return 

        if (userState.currentUser) {
            navigate('/')
        } else {
            message.current = 'Nickname or password is incorect'
            setOpen(true)
        }

    }, [isSubmitting, navigate, userState.currentUser])

    const handleClick = () => {
            if (!nickname || !password) {
                message.current = 'Not all data was entered'
                setOpen(true)
                return
            } 

            setIsSubmitting(true)
            dispatch(login({nickname, password}))
        }

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
            }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1
            }}>
                <Paper sx={{ p: 3, maxWidth: '400px'}} elevation={1}>
                    <Typography variant="h6">Sign in to this website</Typography>
                    <TextField label="Nickname" onChange={e => setNickname(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Password" onChange={e => setPassword(e.target.value)} type="password" fullWidth margin="normal" />
                    <Button variant="contained" onClick={handleClick} fullWidth sx={{mt: 3}}>Sign in</Button>
                </Paper>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                // message={message.current}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleClose} severity='error'>
                    {message.current}
                </Alert>
            </Snackbar>
            <Footer />
        </Box>
    )
}

export default SigninPage