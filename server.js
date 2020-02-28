const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({
    message: '404 - not found'
  });
});

app.use(helmet()); 

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// connects our backend code with the database
mongoose.connect('mongodb+srv://rado-jedro:Pa55w0rd@cluster0-z3fpm.mongodb.net/NewWaveDB', {
  useNewUrlParser: true
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const io = socket(server);

io.on('connection', socket => {
  console.log('New socket! Its id – ' + socket.id);
});
