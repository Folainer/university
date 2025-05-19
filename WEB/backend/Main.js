import express from 'express'
import sqlite3 from 'sqlite3'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '10mb'}))

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Database opening error')
    } else {
        console.log('Database connection has been successful')
    }
})

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            nickname TEXT NOT NULL,
            password TEXT NOT NULL,
            birthday TEXT NOT NULL,
            gender TEXT NOT NULL,
            avatar TEXT
        )`, (err) => {
            if (err) {
                console.error('User table creation error:', err.message)
            } else {
                console.log('User table exists or it was created successfully')
            }
    })

    db.run(`
        CREATE TABLE IF NOT EXISTS game_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname TEXT NOT NULL,
            score TEXT NOT NULL,
            FOREIGN KEY (nickname) REFERENCES users(nickname)
        )`, (err) => {
            if (err) {
                console.error('Game result table creation error:', err.message)
            } else {
                console.log('Game result table exists or it was created successfully')
            }
        })
})

app.get('/a', (req, res) => {
    res.status(200).json({name: 'maksym'})
})

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message})
            return
        }

        res.json(rows)
    }) 
})

app.post('/users', (req, res) => {
    // const {name, nickname, email, password, birthday, gender} = req.body
    const { name, nickname, email, password, birthday, gender } = req.body
    const stmt = db.prepare('INSERT INTO users (name, nickname, email, password, birthday, gender) VALUES (?, ?, ?, ?, ?, ?)')
    stmt.run(name, nickname, email, password, birthday, gender, function (err) {
        if (err) {
            console.error(err.message)
            res.status(500).json({error: err.message})
        } else {
            res.status(201).json({
                name, nickname, email, password, birthday, gender
            })
        }
    })
    console.log(req.body)
})

// app.post('/login', (req, res)) {
//     const {name, password} = req.body

// }

app.get('/game_results', (req, res) => {
    db.all('SELECT * FROM game_results', [], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message})
            return
        }

        res.json(rows)
    }) 
})

app.post('/game_results', (req, res) => {
    const {nickname, score} = req.body
    const stmt = db.prepare('INSERT INTO game_results (nickname, score) VALUES (?, ?)')
    stmt.run(nickname, score, function(err) {
        if (err) {
            console.error(err.message)
            res.status(500).json({error: err.message})
        } else {
            res.status(201).json({
                nickname, score
            })
        }
    })
})

app.post('/update_avatar', (req, res) => {
    const {nickname, avatarBase64} = req.body

    if (!nickname || !avatarBase64) {
        return res.status(400).json({error: 'Missing nickname or avatar'})
    }

    db.get(
        'SELECT COUNT(*) as count FROM users WHERE nickname = ?',
        [nickname],
        (err, row) => {
            if (err) {
                return res.status(500).json({error: err.message})
            }

            if (row.count === 1) {
                db.run(
                    'UPDATE users SET avatar = ? WHERE nickname = ?',
                    [avatarBase64, nickname],
                    function(err) {
                        if (err) {
                            return res.status(500).json({error: err.message})
                        }

                        return res.json({success: true, message: 'Avator updated'})
                    }
                )
            } else if (row.count === 0) {
                return res.status(404).json({error: 'Nickname not found'})
            } else {
                return res.status(400).json({error: 'nickname is not unique'})
            }
        }
    )
})

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Database closure error')
        } else {
            console.log('Database connection has been closed successfully')
        }
        process.exit(0)
    })
})

app.listen(PORT, () => {
    console.log(`Server has launched and can be accessed on https://localhost:${PORT}`)
})