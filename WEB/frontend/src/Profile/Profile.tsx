import Header from "../MainComponents/Header"
import { Container, Typography, Card, Box, Button, Avatar, ButtonGroup, Snackbar, Alert } from "@mui/material"
// Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField
import { useState, useRef, useEffect } from "react"
import Footer from "../MainComponents/Footer"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../Store"
import { logout, updateAvatar, uploadAvatar } from "../UserSlice"
import { deepOrange } from "@mui/material/colors"

const imageToBase64 = async (imageUrl : string) : Promise<string> => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = () => {
            resolve(reader.result as string)
        }

        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

const defaultAvatarPaths = [
    'img/blue_monster.jpg',
    'img/cute_cat.jpg',
    'img/cute_rabbit.jpg',
    'img/cyan_monster.jpg',
    'img/green_monster.jpg',
    'img/mask_pitbull.jpg',
    'img/orange_monster.jpg',
    'img/purple_monster.jpg',
    'img/rabbit.jpg',
    'img/red_monster.jpg',
    'img/yellow_monster.jpg'
]

const closureIncrement = (initialIndex : number, length : number) => {
    let index = initialIndex

    return () => {
        const res = index
        index = (index + 1) % length
        return res
    }
}


const resizeImage = (file: File, maxWidth : number, maxHeight : number) : Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = (event) => {
            const image = new Image()
            image.src = event.target?.result as string

            image.onload = () => {
                let width = image.width
                let height = image.height

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * maxWidth / width)
                        width = maxWidth
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * maxHeight / height)
                        height = maxHeight
                    }
                }
                
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Couldn\'t get canvas cocntext'))
                    return
                }
                
                ctx.drawImage(image, 0, 0, width, height)

                const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7)
                resolve(resizedBase64)
            }

            if (image.onerror !== null) {
                image.onerror = () => {
                    reject(new Error('Error loading image'))
                }
            }
        }

        if (reader.onerror !== null) {
            reader.onerror = () => {
                reject(new Error('Error reading file'))
            }
        }
    })
}


const ProfilePage = () => {
    const defaultIcons = useRef<string[]>([])
    const userState = useSelector((state: RootState) => state.user) as { currentUser: { name: string, email: string, nickname: string, birthday: string, gender: string } | null }
    const nickname = useSelector((state: RootState) => state.user.currentUser?.nickname) 
    const avatar = useSelector((state: RootState) => state.user.currentUser?.avatar) 
    // const status = useSelector((state: RootState) => state.user.status)

    const currentUser = userState.currentUser

    const defaultAvatorChanger =  useRef(closureIncrement(0, defaultAvatarPaths.length))

    const userData = []

    if (currentUser) {
        const tempUserData = [
            {
                field: 'Name',
                value: currentUser.name
            },
            {
                field: 'Email',
                value: currentUser.email
            },
            {
                field: 'nickname',
                value: currentUser.nickname
            },
            {
                field: 'birthday',
                value: currentUser.birthday
            },
            {
                field: 'Gender',
                value: currentUser.gender
            }
        ]
        tempUserData.map(row => {
            userData.push(row)
        })
    } else {
        userData.push({
            field: 'Status',
            value: 'Unregistered'
        })
    }

    const [__, setOpen] = useState<boolean>(false)
    // const [isUploading, setIsUploading] = useState<boolean>(false)
    const [_, update] = useState(0)

    const dispatch = useDispatch<AppDispatch>()

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    // const [imageBase64, setImageBase64] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleClose = () => {
        setError(null)
        setSuccessMessage(null)
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) {
            return
        }

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file.')
            // setImageBase64(null)
            return
        }

        if (!nickname) {
            setError('Please register before uploading image.')
            // setImageBase64(null)
            return
        }

        const fileSizeMb = file.size / (1024 * 1024)
        if (fileSizeMb > 10) {
            setError(`File size (${fileSizeMb.toFixed(2)}Mb) exceeds the 10MB limit`)
        } 

        // setIsUploading(true)

        try {
            const resizedBase64 = await resizeImage(file, 400, 400)

            console.log('Base64 image size:', Math.round(resizedBase64.length / 1024), 'KB')

            dispatch(uploadAvatar(nickname, resizedBase64))

            setSuccessMessage('Avatar uploaded successfully!')
            // setIsUploading(false)

            update(prev => prev + 1)

        } catch (err) {
            console.error('File processing error', err)
            setError('An error occured while processing the image')
            // setIsUploading(false)
        }
        // const reader = new FileReader()

        // reader.onloadend = () => {
        //     const base64 = reader.result as string
        //     // setImageBase64(base64)
        //     dispatch(uploadAvatar(nickname, base64))
        //     setError(null)
        //     // console.log(base64)
        // }

        // reader.readAsDataURL(file)
    }

    const nextDefaultAvatar = () => {
        dispatch(updateAvatar(defaultIcons.current[defaultAvatorChanger.current()]))
    }

    useEffect(() => {
        console.log('Current avatar value:', avatar ? avatar.substring(0, 50) + '...' : null)
    }, [avatar])

    useEffect(() => {
        const loadImages = async () => {
            defaultAvatarPaths.forEach(path => {
                const result = imageToBase64(path)
                result.then(value => {
                    defaultIcons.current.push(value)
                })
            })
        }

        loadImages()
    }, [])

    return (
        <>
            <Header name="Profile" />
            <Container maxWidth="md">
                <Typography variant='h5' align='center' sx={{mt: 3}} gutterBottom>Personal info</Typography>
                <Typography align='center'>
                Info about you and your preferences across this game
                </Typography>
                {/* <Paper sx={{mt: 3}} elevation={2}>a</Paper> */}
                <Card sx={{ mx: "auto", mt: 5 }}>
                    <Typography sx={{p:2, mt:1}} variant="h5" gutterBottom>
                    Personal profile information
                    </Typography>
                    {currentUser && (
                        <Box
                            sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    // alignItems: 'center'
                                }}
                        >
                            <Avatar
                                src={avatar ?? undefined}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: avatar ? 'white' : deepOrange[500]
                                }}
                            >
                                {!avatar && userData[2].value[0]}
                            </Avatar>
                            <ButtonGroup
                                orientation="vertical"
                                variant="contained"
                                sx={{
                                    height: 50
                                }}
                            >
                                <Button 
                                onClick={() => fileInputRef.current?.click()}
                                >
                                Upload avatar
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <Button
                                onClick={nextDefaultAvatar}
                            >
                                Next default avatar
                            </Button>
                            </ButtonGroup>
                        </Box>
                    )}
                    
                    {(userData.map(row => (
                        <Box 
                            sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.03)'
                            },
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 2,
                            cursor: 'pointer'
                            }}
                            onClick={() => setOpen(true)}>
                            <Typography 
                                variant="body1" 
                                sx={{ flexGrow: 1, cursor: "pointer" }} 
                            >
                                {row.field}
                            </Typography>
                            <Typography 
                                align='right'
                                variant="body1" 
                                sx={{ flexGrow: 1, cursor: "pointer" }} 
                            >
                                {row.value}
                            </Typography>
                        </Box>
                    )))}
                </Card>
                <Button onClick={() => {
                    dispatch(logout())
                    update(prev => prev + 1)
                    }   
                } variant="contained" fullWidth sx={{mt: 3}}>Exit</Button>
                {/* <Typography variant='h5' align='center' sx={{mt: 4}}>Personal game history</Typography>
                <TableContainer sx={{mt: 2}} component={Paper}>
                    <Table sx={{ minWidth: 450}} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Rating</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {[1,2,3,4].map((row) => (
                            <TableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row}</TableCell>
                                <TableCell align="left">{row}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                
            </Container>
            {/* <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Change field</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change specific field
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        }}
                    >
                        <TextField label="Name" fullWidth margin="normal" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog> */}
            <Footer />
            <Snackbar
                open={typeof error === "string"}
                autoHideDuration={5000}
                onClose={handleClose}
                // message={message.current}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleClose} severity='error'>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={5000}
                onClose={handleClose}
                // message={message.current}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleClose} severity='success'>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ProfilePage