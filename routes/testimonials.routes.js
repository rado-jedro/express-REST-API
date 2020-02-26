const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getSingleRecord);
router.post('/testimonials', TestimonialController.postRecord);
router.put('/testimonials/:id', TestimonialController.updateRecord);
router.delete('/testimonials/:id', TestimonialController.deleteRecord);

module.exports = router; 
