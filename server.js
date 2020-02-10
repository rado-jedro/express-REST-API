const express = require('express');

const app = express();
const uuidv1 = require('uuid/v1');

let db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.'
  }
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  let randomUser = db[Math.floor(Math.random() * db.length)];
  res.json(randomUser);
});

app.get('/testimonials/:id', (req, res) => {
  let idUser = db.filter(({ id }) => id == req.params.id);
  res.json(idUser);
});

app.post('/testimonials', (req, res) => {
  let newUser = {
    id: uuidv1(),
    message: 'OK'
  };
  db.push(newUser);
  res.json(db);
});

app.put('/testimonials/:id', (req, res) => {
  let result = db.map(el =>
    el.id != req.params.id ? el : { id: el.id, message: 'OK' }
  );
  db = result;
  res.json(db);
});

app.delete('/testimonials/:id', (req, res) => {
  let deletedUser = db.filter(el => el.id != req.params.id);
  db = deletedUser;
  res.json(db);
});

app.use((req, res) => {
  res.status(404).json({
    message: '404 - not found'
  });
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
