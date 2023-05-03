const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    performer: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Concert', concertSchema);