const express = require('express');

const app = express();
const uuidv1 = require('uuid/v1');

const db = require('./db');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  let randomUser = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomUser);
});

app.get('/testimonials/:id', (req, res) => {
  let idUser = db.testimonials.filter(({ id }) => id == req.params.id);
  res.json(idUser);
});

app.post('/testimonials', (req, res) => {
  let newUser = {
    id: uuidv1(),
    message: 'OK'
  };
  db.testimonials.push(newUser);
  res.json(db.testimonials);
});

app.put('/testimonials/:id', (req, res) => {
  let result = db.testimonials.map(el =>
    el.id != req.params.id ? el : { id: el.id, message: 'OK' }
  );
  db.testimonials = result;
  res.json(db.testimonials);
});

app.delete('/testimonials/:id', (req, res) => {
  let deletedUser = db.testimonials.filter(el => el.id != req.params.id);
  db.testimonials = deletedUser;
  res.json(db.testimonials);
});

//concerts
app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  let idConcert = db.concerts.filter(({ id }) => id == req.params.id);
  res.json(idConcert);
});

app.post('/concerts', (req, res) => {
  let newConcert = {
    id: uuidv1(),
    message: 'OK'
  };
  db.concerts.push(newConcert);
  res.json(db.concerts);
});

app.put('/concerts/:id', (req, res) => {
  let updateConcert = db.concerts.map(el =>
    el.id != req.params.id ? el : { id: el.id, message: 'OK' }
  );
  db.concerts = updateConcert;
  res.json(db.concerts);
});

app.delete('/concerts/:id', (req, res) => {
  let deletedConcert = db.concerts.filter(el => el.id != req.params.id);
  db.concerts = deletedConcert;
  res.json(db.concerts);
});


//seats
app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  let idSeat = db.seats.filter(({ id }) => id == req.params.id);
  res.json(idSeat);
});

app.post('/seats', (req, res) => {
  let newSeat = {
    id: uuidv1(),
    message: 'OK'
  };
  db.seats.push(newSeat);
  res.json(db.seats);
});

app.put('/seats/:id', (req, res) => {
  let updateSeat = db.seats.map(el =>
    el.id != req.params.id ? el : { id: el.id, message: 'OK' }
  );
  db.seats = updateSeat;
  res.json(db.seats);
});

app.delete('/seats/:id', (req, res) => {
  let deletedSeat = db.seats.filter(el => el.id != req.params.id);
  db.concerts = deletedSeat;
  res.json(db.seats);
});

app.use((req, res) => {
  res.status(404).json({
    message: '404 - not found'
  });
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
