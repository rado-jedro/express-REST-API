const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getSingleRecord);
router.post('/concerts', ConcertController.postRecord);
router.put('/concerts/:id', ConcertController.updateRecord);
router.delete('/concerts/:id', ConcertController.deleteRecord);

module.exports = router;
