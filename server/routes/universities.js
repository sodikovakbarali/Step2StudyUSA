const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const University = require('../models/University');

// @route   GET api/universities
// @desc    Get all universities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const universities = await University.find().sort({ name: 1 });
    res.json(universities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/universities/:id
// @desc    Get university by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ msg: 'University not found' });
    }
    res.json(university);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'University not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/universities
// @desc    Create a university
// @access  Private
router.post('/', async (req, res) => {
  try {
    const newUniversity = new University(req.body);
    const university = await newUniversity.save();
    res.json(university);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/universities/:id
// @desc    Update a university
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!university) {
      return res.status(404).json({ msg: 'University not found' });
    }
    res.json(university);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/universities/:id
// @desc    Delete a university
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ msg: 'University not found' });
    }
    await university.remove();
    res.json({ msg: 'University removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/universities/save
// @desc    Save a university to the user's favorites
// @access  Private
router.post('/save', auth, async (req, res) => {
  try {
    const { id, name, state, city, website } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    // Prevent duplicates
    if (user.savedUniversities.some(u => u.id === id)) {
      return res.status(400).json({ msg: 'University already saved' });
    }
    user.savedUniversities.push({ id, name, state, city, website });
    await user.save();
    res.json(user.savedUniversities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
