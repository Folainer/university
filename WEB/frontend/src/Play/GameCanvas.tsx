import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { useRef, useState } from 'react'
import GameLogic from './GameLogic'
import { Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addGameResults } from '../GameSlice'
import { AppDispatch, RootState } from '../Store'

const GameCanvas = () => {
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const scoreHtml = useRef<HTMLSpanElement>(null)
    const game = useRef<GameLogic>(new GameLogic())
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isEndMenu, setIsEndMenu] = useState<boolean>(false)
    // const score = useRef<number>(0)
    // const [score, setScore] = useState<number>(-1)

    const endHandler = (score : number) => {
      scoreHtml.current!.innerText = score.toString()
        if (currentUser) {
          dispatch(addGameResults({ nickname: currentUser.nickname, score: score.toString(), date: new Date().toLocaleString()}))
        }
        setIsPlaying(false)
        setIsEndMenu(true)
    }

    return (
      <>
        {isPlaying ? (
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Canvas className='canvas' camera={{ position: [4, 5, 4], rotation: [0, Math.PI, 0] }}>
              <Scene game={game.current} endHandler={endHandler} updateScore={(score) => { if (scoreHtml.current) scoreHtml.current.innerHTML = score.toString() }} />
            </Canvas>
            <div className='score'>Score: <span ref={scoreHtml}>{scoreHtml.current?.innerHTML}0</span></div>
          </div>
          
        ) : (
          isEndMenu ? (
            <div style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography sx={{mb: 3}} variant='h6'>Score: {scoreHtml.current?.innerHTML} </Typography>
              <Button 
                onClick={() => {
                  game.current = new GameLogic()
                  setIsPlaying(true)
                  setIsEndMenu(false)
                  scoreHtml.current!.innerText = '0'
                }}
                size='large' 
                variant="outlined">Play again</Button>
            </div>
          ) : (
            <div 
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => {
                setIsPlaying(true)
                setIsEndMenu(false)
                scoreHtml.current!.innerText = '0'
              }}>
              <Button size='large' variant="outlined">Start game</Button>
            </div>
          )
        )}
      </>
    )
}

export default GameCanvas