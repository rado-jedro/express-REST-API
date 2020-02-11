const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// get specific concerts
router.route('/concerts/:id').get((req, res) => {
  let idConcert = db.concerts.filter(({ id }) => id == req.params.id);
  res.json(idConcert);
});

//add concerts
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newConcert = {
    id: uuidv4(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image
  };
  db.concerts.push(newConcert);
  res.json(db.concerts);
});

//edit concerts
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  let editConcert = db.concerts.map(el =>
    el.id != req.params.id
      ? el
      : {
          id: el.id,
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image
        }
  );
  db.concerts = editConcert;
  res.json(db.concerts);
});

//delete concerts
router.route('/concerts/:id').delete((req, res) => {
  let deleteConcert = db.concerts.filter(el => el.id != req.params.id);
  db.concerts = deleteConcert;
  res.json(db.concerts);
});

module.exports = router;
