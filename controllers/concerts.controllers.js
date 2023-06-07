const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');

// get all concerts
exports.getAllConcerts = async (req, res) => {
    try {
        const concerts = await Concert.find();
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get random concert
exports.getRandomConcert = async (req, res) => {

    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const concert = await Concert.findOne().skip(rand);
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

// get concert by id
exports.getConcertById = async (req, res) => {

    try {
        const dep = await Concert.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};
// get concert by performer
exports.getConcertsByPerformer = async (req, res) => {
    try {
        console.log(req);
        const performer = req.params.performer;
        const concerts = await Concert.find({ performer: performer });
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get concert by gennre
exports.getConcertsByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const concerts = await Concert.find({ genre: genre });
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get concerts by price range
exports.getConcertsByPrice = async (req, res) => {
    try {
        const priceMin = req.params.price_min;
        const priceMax = req.params.price_max;
        const concerts = await Concert.find({ price: { $gte: priceMin, $lte: priceMax } });
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get concerts by day
exports.getConcertsByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const concerts = await Concert.find({ day: day });
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// post concert
exports.postConcert = async (req, res) => {
    try {
        const { performer, genre, price, image, day, id } = req.body;
      const sanitizedPerformer = sanitize(performer);
      const sanitizedGenre = sanitize(genre);
      const sanitizedPrice = sanitize(price);
      const sanitizedImage = sanitize(image);
      const sanitizedDay = sanitize(day);
      const sanitizedId = sanitize(id);
      
        const newConcert = new Concert({
            id: sanitizedId,
            performer: sanitizedPerformer,
            genre: sanitizedGenre,
            price: sanitizedPrice,
            day: sanitizedDay,
            image: sanitizedImage
        });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// modify concert by its id
exports.modifyConcert = async (req, res) => {
    const { performer, genre, price, image, day, id } = req.body;

    try {
        const concertId = await Concert.findById(req.params.id);
        if (concertId) {
            await Concert.updateOne({ _id: req.params.id }, {
                $set: {
                    id: id,
                    performer: performer,
                    genre: genre,
                    price: price,
                    day: day,
                    image: image
                }
            });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

// delete concert by its id
exports.deleteConcert = async (req, res) => {
    try {
        const concertId = await Concert.findById(req.params.id);
        if (concertId) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
