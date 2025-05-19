import Header from "../MainComponents/Header"
import GameCanvas from "./GameCanvas"
import { Box } from "@mui/material"
import './Play.scss'

const PlayPage = () => {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
        }}>
            <Header name="Play" />
            <GameCanvas />
        </Box>
    )
}

export default PlayPage