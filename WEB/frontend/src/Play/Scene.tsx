import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { FirstPersonControls } from '@react-three/drei'
import GameLogic from './GameLogic'
import Chunk from './Chunk'

const Scene : React.FC<{game : GameLogic, endHandler : (score : number) => void, updateScore: (score: number) => void}> = ({game, endHandler, updateScore}) => {
    const [_, update] = useState(0)
    const previousScore = useRef(game.score)
    const displacement = useRef(0)

    useFrame((state) => {
        game.updateGame(state, state.clock.getDelta())
        if (!game.isPlaying) {
            endHandler(game.score)
        }

        if (previousScore.current !== game.score) {
            previousScore.current = game.score
            updateScore(game.score)
        }

        // console.log(state.camera.position.z, displacement)
        if (state.camera.position.z > displacement.current) {
            displacement.current += 8
            game.getWorld().addChunk()
            update((prev) => prev + 1)
        }
    })

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === ' ') {
            game.jump()
        }
    }

    window.addEventListener('keydown', handleKeyDown)


    return (
    <>
        <ambientLight intensity={Math.PI / 2} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
        {/* <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} /> */}
        <directionalLight position={[4, 100, 4]} intensity={2*Math.PI} />
        {game.getChunks().map((chunk, index) => {
            return <Chunk key={index} displacement={chunk.displacement} chunk={chunk.chunk} />
        })}
        <FirstPersonControls lookSpeed={0.04} movementSpeed={2} />
    </>
  );
};

export default Scene