const express = require('express')
const app = express()
const port = 3001
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')

const users = []

app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
    let { email, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = users.find(user => user.email === email)

    if(user) {
        res.status(400).json({ message: 'User already exists' })
    }

    users.push({ email, password: hashedPassword })

    res.status(200).json({ message: 'User created' })
})

app.post('/login', (req, res) => {

    
    const { email, password } = req.body
    
    console.log('req.body', req.body)
    const user = users.find(user => user.email === email)

    if(!user) {
        res.status(400).json({ message: 'invalid' })
    }

    const hash = user.password

    const isValidPassword = bcrypt.compareSync(password, hash)

    if(!isValidPassword) {
        res.status(400).json({ message: 'Invalid' })
    }

    const jwtPayload = { email: email }


    const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1h' })

    res.status(200).json({ token: token })
})

app.get('/users', authMiddleware, getUsers)

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        res.status(401).json({ message: 'Token is required' })
    }

    const [ , token ] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, 'secret')
        req.user = decoded
        next()
    } catch(err) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

function getUsers(req, res) {
    console.log('the user is', req.user)
    res.status(200).json(users)
}


app.listen(port, () => console.log(`Example app listening on port ${port}!, check http://localhost:${port}`))