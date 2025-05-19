import GameWorld from './GameWorld'
import { RootState } from '@react-three/fiber'

export default class GameLogic {
    private world: GameWorld
    private atitude: number
    private initialAtitude: number
    private flyTime: number
    private isGrounded: boolean
    private G : number = 9.81
    
    public score: number
    public isPlaying: boolean = false
    
    constructor() {
        this.score = 0
        this.world = new GameWorld()
        this.atitude = 2
        this.initialAtitude = this.atitude
        this.flyTime = 0
        this.isGrounded = false
        this.startGame()
    }

    startGame() {
        this.world = new GameWorld()
        this.world.generateWorld()
        this.isPlaying = true
    }

    updateGame(state : RootState, delta: number) {
        if (!this.isGrounded) {
            this.flyTime = 100*delta + this.flyTime
        }

        this.score = state.camera.position.z >= 7 ? state.camera.position.z - 7 | 0 : 0

        const gotAtitude = this.initialAtitude - this.G * (this.flyTime ** 2) / 2
        // const gotAtitude = this.initialAtitude - 100*this.flyTime
        if (!this.world.isBottomColision(state.camera.position.x, state.camera.position.z, gotAtitude)) {
            this.atitude = gotAtitude
            this.isGrounded = false
        }  else {
            this.initialAtitude = this.atitude | 0
            this.isGrounded = true
            this.flyTime = 0
        }
        state.camera.position.y = this.atitude

        if (this.atitude < -2) {
            this.endGame()
        }
    }

    endGame() {
        this.isPlaying = false
    }

    jump() {
        if (this.isGrounded) {
            this.atitude += 2
            this.initialAtitude = this.atitude
            this.flyTime = 0
            this.isGrounded = false
        }
    }

    getChunks() {
        return this.world.getChunks()
    }

    getWorld() {
        return this.world
    }

}