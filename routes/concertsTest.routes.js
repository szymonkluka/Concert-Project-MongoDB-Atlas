const express = require('express');
const router = express.Router();
const ConcertTest = require('../controllers/concertsTest.controllers')

// get concerts by performer
router.get('/concerts/performer1/:performer', ConcertTest.getTestConcertsByPerformer);

// get concerts by genre
router.get('/concerts/genre1/:genre', ConcertTest.getTestConcertsByGenre);

// get concerts by day
router.get('/concerts/day1/:day', ConcertTest.getTestConcertsByDay);

// get concerts by price range 
router.get('/concerts/price1/:price_min/:price_max', ConcertTest.getTestConcertsByPrice);

module.exports = router;