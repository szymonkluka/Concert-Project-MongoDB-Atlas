const Seat = require('../models/seat.model')
// get all seats
exports.getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get random seat
exports.getRandomSeat = async (req, res) => {

    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const randSeat = await Seat.findOne().skip(rand);
        if (!randSeat) res.status(404).json({ message: 'Not found' });
        else res.json(randSeat);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

// get seat by its id
exports.getSeatById = async (req, res) => {

    try {
        const seatId = await Seat.findById(req.params.id);
        if (!seatId) res.status(404).json({ message: 'Not found' });
        else res.json(seatId);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};

//post new seat
exports.postSeat = async (req, res) => {
    try {
        const { day, seat, client, email, id } = req.body;
        const newSeat = new Seat({
            id: id,
            day: day,
            seat: seat,
            client: client,
            email: email
        });
        const savedSeat = await newSeat.save(); // save the new seat to the database and get the updated data

        // Emit the 'addSeat' and 'updateSeat' events to connected clients after saving the new seat to the database
        req.io.emit('updateSeat', savedSeat);
        req.io.emit('addSeat', savedSeat);
        req.io.emit('updateSeats', await Seat.find());

        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// modify seat by its id
exports.modifySeat = async (req, res) => {
    const { id, day, seat, client, email } = req.body;

    try {
        const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, {
            id: id,
            day: day,
            seat: seat,
            client: client,
            email: email
        }, { new: true });

        if (updatedSeat) {
            // Emit the 'updateSeat' event to connected clients after updating the db object
            req.io.emit('updateSeats', await Seat.find());

            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'Not found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// delete seat by its id
exports.deleteSeat = async (req, res) => {
    try {
        const seatId = await Seat.findById(req.params.id);
        if (seatId) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

};


