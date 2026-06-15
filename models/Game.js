const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['accion', 'miedo', 'disparos']
    },
    description: {
        type: String,
        default: ''
    }
}, { timestamps: true })

module.exports = mongoose.model('Game', gameSchema)