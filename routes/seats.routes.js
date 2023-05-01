const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controllers')

// get all seats
router.get('/seats', SeatController.getAllSeats);

// get random seat
router.get('/seats/random', SeatController.getRandomSeat);

// get seat by its id
router.get('/seats/:id', SeatController.getSeatById);

// post new seat
router.post('/seats', SeatController.postSeat);

// modify seat by its id
router.put('/seats/:id', SeatController.modifySeat);

// delete seat by its id
router.delete('/seats/:id', SeatController.deleteSeat);

module.exports = router;
