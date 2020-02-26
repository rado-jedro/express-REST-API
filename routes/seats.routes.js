const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getSingleRecord);
router.post('/seats', SeatController.postRecord);
router.put('/seats/:id', SeatController.updateRecord);
router.delete('/seats/:id', SeatController.deleteRecord);

module.exports = router;
