const ConcertTest = require('../models/concertTest.model')
// get concert by performer
exports.getTestConcertsByPerformer = async (req, res) => {
    try {
        const performer = req.params.performer;
        const concertsTest = await ConcertTest.find({ performer: performer });
        res.json(concertsTest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get concert by gennre
exports.getTestConcertsByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const concertsTest = await ConcertTest.find({ genre: genre });
        res.json(concertsTest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get concerts by price range
exports.getTestConcertsByPrice = async (req, res) => {
    try {
        const priceMin = req.params.price_min;
        const priceMax = req.params.price_max;
        const concertsTest = await ConcertTest.find({ price: { $gte: priceMin, $lte: priceMax } });
        res.json(concertsTest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get concerts by day
exports.getTestConcertsByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const concertsTest = await ConcertTest.find({ day: day });
        res.json(concertsTest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};