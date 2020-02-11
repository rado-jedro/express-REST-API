const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv1 = require('uuid/v1');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// get random testimonials
router.route('/testimonials/random').get((req, res) => {
  let randomTestimonial =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomTestimonial);
});

// get specific testimonials
router.route('/testimonials/:id').get((req, res) => {
  let idTestimonial = db.testimonials.filter(({ id }) => id == req.params.id);
  res.json(idTestimonial);
});

//add testimonials
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: uuidv1(),
    author: author,
    text: text
  };
  db.testimonials.push(newTestimonial);
  res.json(db.testimonials);
});

//edit testimonials
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  let editTestimonial = db.testimonials.map(el =>
    el.id != req.params.id ? el : { id: el.id, author: author, text: text }
  );
  db.testimonials = editTestimonial;
  res.json(db.testimonials);
});

//delete testimonials
router.route('/testimonials/:id').delete((req, res) => {
    let deleteTestimonial = db.testimonials.filter(
    el => el.id != req.params.id
  );
  db.testimonials = deleteTestimonial;
  res.json(db.testimonials);
});

module.exports = router; 
