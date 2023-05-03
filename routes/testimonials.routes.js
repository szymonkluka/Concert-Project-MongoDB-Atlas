const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controllers')
// get all testimonials
router.get('/testimonials', TestimonialController.getAllTestimonials);

// get random testimonial
router.get('/testimonials/random', TestimonialController.getRandomTestimonial);

// get testimonial by its id
router.get('/testimonials/:id', TestimonialController.getTestimonialById);

// post new testimonial
router.post('/testimonials', TestimonialController.postTestimonial);

// modify testimonial by its id
router.put('/testimonials/:id', TestimonialController.modifyTestimonial)

// delete testimonial by its id
router.delete('/testimonials/:id', TestimonialController.deleteTestimonial)


module.exports = router;
