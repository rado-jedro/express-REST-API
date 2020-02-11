const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: '404 - not found'
  });
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
