const express = require('express')
const router = express.Router()
const User = require('../models/User')
const verificarToken = require('../middleware/auth')

router.get('/', verificarToken, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId).populate('later')
        res.json(usuario.later)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

router.post('/:gameId', verificarToken, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId)

        const yaExiste = usuario.later.includes(req.params.gameId)
        if (yaExiste) {
            return res.status(400).json({ mensaje: 'El juego ya está en la lista' })
        }

        usuario.later.push(req.params.gameId)
        await usuario.save()

        res.json({ mensaje: 'Juego agregado a jugar después' })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

router.delete('/:gameId', verificarToken, async (req, res) => {
    try {
        const usuario = await User.findById(req.userId)

        usuario.later = usuario.later.filter(
            id => id.toString() !== req.params.gameId
        )

        await usuario.save()

        res.json({ mensaje: 'Juego eliminado de jugar después' })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

module.exports = router