const mongoose = require('mongoose');
const db = mongoose.connection;

const concertTestSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    performer: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { collection: 'concertsTest' }); // set collection name to 'concertsTest'

db.once('open', () => {
    console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

const ConcertTest = mongoose.model('ConcertTest', concertTestSchema);

module.exports = ConcertTest;