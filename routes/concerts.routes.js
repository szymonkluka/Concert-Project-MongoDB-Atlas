const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controllers')

// get all concerts
router.get('/concerts', ConcertController.getAllConcerts);

// get random concert
router.get('/concerts/random', ConcertController.getRandomConcert);

// get concert by id
router.get('/concerts/:id', ConcertController.getConcertById);

// get concerts by performer
router.get('/concerts/performer/:performer', ConcertController.getConcertsByPerformer);

// get concerts by genre
router.get('/concerts/genre/:genre', ConcertController.getConcertsByGenre);

// get concerts by day
router.get('/concerts/day/:day', ConcertController.getConcertsByDay);

// get concerts by price range 
router.get('/concerts/price/:price_min/:price_max', ConcertController.getConcertsByPrice);

// post concert
router.post('/concerts', ConcertController.postConcert);

// modify concert by id
router.put('/concerts/:id', ConcertController.modifyConcert);

// delete concert by id
router.delete('/concerts/:id', ConcertController.deleteConcert);

module.exports = router;
