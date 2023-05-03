const express = require('express');
const router = express.Router();
const db = require('./db');

const { seats, concerts } = require('./db');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// get random seat
router.route('/seats/random').get((req, res) => {
  const randomSeats = seats[Math.floor(Math.random() * seats.length)];
  res.json(randomSeats);
});

// get seat by its id
router.route('/seats/:id').get((req, res) => {
  const matchingSeat = seats.find(seat => seat.id === parseInt(req.params.id));
  if (matchingSeat) {
    return res.json(matchingSeat);
  }
  res.status(404).json({ message: 'Seat not found' });
});

// modify seat by its id

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const seat = db.seats.find(seat => seat.id == id);
  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }
  seat.day = req.body.day;
  seat.seat = req.body.seat;
  seat.client = req.body.client;
  seat.email = req.body.email;
  res.json({ message: 'OK' });
});

router.route('/seats').post((req, res) => {
  const newSeat = {
    id: Math.floor(Math.random() * 100000),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  db.seats.push(newSeat);
  res.status(201).json({ message: 'OK' });
});


// delete seat by its id
router.route('/seats/:id').delete((req, res) => {
  const index = seats.findIndex((element) => element.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }

  seats.splice(index, 1);
  res.json({ message: 'OK' });
});

router.use((req, res) => {
  res.status(404).json({ message: '404 Not Found' });
});

module.exports = router;
