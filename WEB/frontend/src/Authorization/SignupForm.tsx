import { Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from "@mui/material"
import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUserAsync } from "../UserSlice"
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../Store"

interface FieldError {
    name: string
    nickname: string
    email: string
    password: string
    birthday: string
    gender: string
}

const SignupForm : React.FC<{elevation : number}> = ({elevation}) => {
    const [name, setName] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [birthday, setBirthday] = useState<string>('')
    const [gender, setGender] = useState("");
    const [isBirthdayFocused, setIsBirthdayFocused] = useState<boolean>(false)
    const [open, setOpen] = useState(false)
    const [_, setIsRegistering] = useState<boolean>(true)

    const [fieldErrors, setFieldErrors] = useState<FieldError>({
        name: '',
        nickname: '',
        email: '',
        password: '',
        birthday: '',
        gender: ''
    })

    const [firstError, setFirstError] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false)
    }

    const validateForm = () : boolean => {
        const newFieldErrors: FieldError = {
            name: '',
            nickname: '',
            email: '',
            password: '',
            birthday: '',
            gender: ''
        }

        if (!name) {
            newFieldErrors.name = 'Name is required'
        } else if (!/^[A-Za-z'-]{2,50}$/.test(name) && !/^[А-Яа-яІіЇїЄєҐґ-]{2,50}$/.test(name)) {
            newFieldErrors.name = 'Name should be in Ukrainian or in English alphabets and be from 2 to 50 characters long'
        }

        if (!nickname) {
            newFieldErrors.nickname = 'Nickname is required'
        } else if (!/^[A-Za-z0-9-_]{5,50}$/.test(nickname)) {
            newFieldErrors.nickname = 'Nicname should be 5-50 character long and contain only English letters, digits and underscore'
        }

        if (!email) {
            newFieldErrors.email = 'Email is required'
        } else if (!/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}$/.test(email)) {
            newFieldErrors.email = 'Email is not valid'
        }

        if (!password) {
            newFieldErrors.password = 'Password is required'
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{8,}$/.test(password)) {
            newFieldErrors.password = 'Password must be at least 8 symbols with at least one letter and digit'
        }

        if (!birthday) {
            newFieldErrors.birthday = 'Birthday is required'
        }

        if (!gender) {
            newFieldErrors.gender = 'Gender is required'
        }

        setFieldErrors(newFieldErrors)
        console.log(newFieldErrors)

        const errorFields = Object.entries(newFieldErrors).filter(([_, errorMsg]) => errorMsg !== '')
        if (errorFields.length > 0) {
            setFirstError(errorFields[0][1])
            return false
        }


        return true
    }
    
    const handleClick = () => {
        if (!validateForm()) {
            setOpen(true)
        } else {
            dispatch(registerUserAsync({ name, nickname, email, password, birthday, gender, avatar: null }))
            navigate('/')
            setIsRegistering(false)
        }
    }

    return (

        <Paper className='signup__paper' sx={{ p: 3}} elevation={elevation}>
            <Typography variant="h6">Sign up to this website</Typography>
            <TextField label="Name" onChange={(e) => setName(e.target.value)} fullWidth margin="normal" error={!!fieldErrors.name} />
            <TextField label="Nickname" onChange={(e) => setNickname(e.target.value)} fullWidth margin="normal" error={!!fieldErrors.nickname} />
            <TextField sx={{mt: 3}} onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth margin="normal" error={!!fieldErrors.email} />
            <TextField label="Password" onChange={(e) => setPassword(e.target.value)} type="password" fullWidth margin="normal" error={!!fieldErrors.password} />
            <TextField
                sx={{
                    boxSizing: 'border-box'
                }}
                label="Birthday"
                type={isBirthdayFocused ? 'date' : 'text'}
                fullWidth
                margin="normal"
                onChange={(e) => setBirthday(e.target.value)}
                onFocus={() => setIsBirthdayFocused(true)}
                onBlur={() => setIsBirthdayFocused(false)}
                error={!!fieldErrors.birthday}
            />
            <FormControl 
                error={!!fieldErrors.gender}
                fullWidth
                sx={{mt:2}}>
                <InputLabel sx={{
                    padding: '0 5px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                }}>Gender</InputLabel>
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleClick} fullWidth sx={{mt: 3}}>Sign up</Button>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                // message="Not all data was entered"
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleClose} severity='error'>
                    {firstError}
                </Alert>
            </Snackbar>
        </Paper>
    )
}

export default SignupForm