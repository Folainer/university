import { useMediaQuery, Box, Typography} from "@mui/material"
import SignupForm from "./SignupForm"
import './Authorization.scss'
import Footer from "../MainComponents/Footer"

const SignupPage = () => {
    const isBigScreen = useMediaQuery('(min-width:1200px)')

    return (
        isBigScreen ? (
            <Box sx={{display: "grid", gridTemplateColumns: "repeat(2, 50%)"}}>
                <Box sx={{
                    background: 'center / cover no-repeat url("img/galaxy.jpg")',
                    height: "100vh",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography sx={{
                        color: 'white'
                    }}
                    variant="h3">Create a free account</Typography>
                </Box>
                <Box sx={{p:2}}>
                    <SignupForm elevation={0} />
                    <Footer />
                </Box>
            </Box>
        ) : (
            <Box
                sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: 'center / cover no-repeat url("img/galaxy.jpg")',
                width: '100%',
                p: 3,
                boxSizing: 'border-box'
                }}>

                <SignupForm elevation={2} />
            </Box>
        )
    )
}

export default SignupPage