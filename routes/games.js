const express = require('express')
const router = express.Router()
const Game = require('../models/Game')

router.get('/', async (req, res) => {
    try {
        const { genre } = req.query
        const filtro = {}

        if (genre) {
            filtro.genre = genre
        }

        const juegos = await Game.find(filtro)
        res.json(juegos)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const juego = await Game.findById(req.params.id)
        if (!juego) {
            return res.status(404).json({ mensaje: 'Juego no encontrado' })
        }
        res.json(juego)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, image, price, genre, description } = req.body

        const nuevoJuego = new Game({ name, image, price, genre, description })
        await nuevoJuego.save()

        res.status(201).json(nuevoJuego)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

module.exports = router