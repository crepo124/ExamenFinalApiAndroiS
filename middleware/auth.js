const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ mensaje: 'Token inválido' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token no válido o expirado' })
        }
        req.userId = decoded.id
        next()
    })
}

module.exports = verificarToken