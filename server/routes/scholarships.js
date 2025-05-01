const express = require('express');
const router = express.Router();

// @route   GET api/scholarships
// @desc    Get all scholarships
// @access  Public
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ deadline: 1 });
    res.json(scholarships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/scholarships/:id
// @desc    Get scholarship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/scholarships
// @desc    Create a scholarship
// @access  Private
router.post('/', async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    const scholarship = await newScholarship.save();
    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/scholarships/:id
// @desc    Update a scholarship
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!scholarship) {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/scholarships/:id
// @desc    Delete a scholarship
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ msg: 'Scholarship not found' });
    }
    await scholarship.remove();
    res.json({ msg: 'Scholarship removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 