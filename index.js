const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const gamesRoutes = require('./routes/games')
const laterRoutes = require('./routes/later')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/games', gamesRoutes)
app.use('/api/later', laterRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))