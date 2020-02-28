const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize'); 

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSingleRecord = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postRecord = async (req, res) => {
  const { id, day, seat, client, email } = sanitize(req.body);
  try {
    const newSeat = new Seat({
      id: id,
      day: day,
      seat: seat,
      client: client,
      email: email
    });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateRecord = async (req, res) => {
  const { id, day, seat, client, email } = sanitize(req.body);
  try {
    const singleSeat = await Seat.findById(req.params.id);
    if (singleSeat) {
      singleSeat.id = id;
      singleSeat.day = day;
      singleSeat.seat = seat;
      singleSeat.client = client;
      singleSeat.email = email;
      await singleSeat.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
