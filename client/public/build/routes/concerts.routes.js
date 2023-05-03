const express = require('express');
const router = express.Router();
const db = require('./db');
const { concerts } = require('./db');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get random concert
router.route('/concerts/random').get((req, res) => {
  const randomConcert = concerts[Math.floor(Math.random() * concerts.length)];
  res.json(randomConcert);
});

// get concert by its id
router.route('/concerts/:id').get((req, res) => {
  const matchingConcert = concerts.find(concert => concert.id === parseInt(req.params.id));
  if (matchingConcert) {
    return res.json(matchingConcert);
  }
  res.status(404).json({ message: 'Concert not found' });
})

// modify concert by its id
router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id;
  const concert = db.concerts.find(concert => concert.id == id);
  if (!concert) {
    return res.status(404).json({ message: 'Concert not found' });
  }
  concert.performer = req.body.performer;
  concert.genre = req.body.genre;
  concert.price = req.body.price;
  concert.day = req.body.day;
  concert.image = req.body.image;
  res.json({ message: 'OK' });
});

// add concerts
router.route('/concerts').post((req, res) => {
  const newConcert = {
    id: Math.floor(Math.random() * 100000),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(newConcert);
  res.status(201).json({ message: 'OK' });
});

// delete concert by its id
router.route('/concerts/:id').delete((req, res) => {
  const index = concerts.findIndex((element) => element.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found...' });
  }
  concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
