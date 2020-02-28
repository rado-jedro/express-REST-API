const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.json(err);
  }
};

exports.getSingleRecord = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postRecord = async (req, res) => {
  const { id, author, text } = sanitize(req.body);
  try {
    const newTestimonial = new Testimonial({
      id: id,
      author: author,
      text: text
    });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateRecord = async (req, res) => {
  const { id, author, text } = sanitize(req.body);
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      tes.id = id;
      tes.author = author;
      tes.text = text;
      await tes.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
