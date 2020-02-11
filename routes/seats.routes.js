const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv1 = require('uuid/v1');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// get specific seats
router.route('/seats/:id').get((req, res) => {
  let idSeat = db.seats.filter(({ id }) => id == req.params.id);
  res.json(idSeat);
});

//add seats
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const isFree = true;

  for (let booked of db.seats) {
    if (booked.day === day && booked.seat === seat) {
      res.json({ message: 'The slot is already taken...' });
      isFree = false;
    }
  }
  if (isFree === true) {
    const newSeat = {
      id: uuidv1(),
      day: day,
      seat: seat,
      client: client,
      email: email
    };
    db.seats.push(newSeat);
    res.json(db.seats);
  }
});

//edit seats
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  let editSeat = db.seats.map(el =>
    el.id != req.params.id
      ? el
      : { id: el.id, day: day, seat: seat, client: client, email: email }
  );
  db.seats = editSeat;
  res.json(db.seats);
});

//delete seats
router.route('/seats/:id').delete((req, res) => {
  let deleteSeat = db.seats.filter(el => el.id != req.params.id);
  db.seats = deleteSeat;
  res.json(db.seats);
});

module.exports = router;
