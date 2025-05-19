import { Box, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Box sx={{mt: 2}}>
            <Typography sx={{p:2}} align='center'>{new Date().getFullYear()}&#169; Parkour Game</Typography>
        </Box>
    )
}

export default Footer