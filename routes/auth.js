const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ mensaje: 'Username y password son requeridos' })
        }

        const existe = await User.findOne({ username })
        if (existe) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const nuevoUsuario = new User({
            username,
            password: hashedPassword
        })

        await nuevoUsuario.save()

        res.status(201).json({ mensaje: 'Usuario creado correctamente' })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const usuario = await User.findOne({ username })
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' })
        }

        const passwordValido = await bcrypt.compare(password, usuario.password)
        if (!passwordValido) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' })
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({
            token,
            usuario: {
                id: usuario._id,
                username: usuario.username
            }
        })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
    }
})

module.exports = router