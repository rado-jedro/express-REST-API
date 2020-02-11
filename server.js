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

app.use((req, res) => {
  res.status(404).json({
    message: '404 - not found'
  });
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
