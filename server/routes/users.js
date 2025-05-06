const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT secret is available
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

router.post('/register', async (req, res) => {
  const { name, email, password, academicLevel, interests } = req.body;
  console.log('Received registration request:', { name, email, academicLevel, interests });

  // Basic validation
  if (!name || !email || !password || !academicLevel || !interests || !Array.isArray(interests) || interests.length === 0) {
    console.log('Validation failed:', { name, email, academicLevel, interests });
    return res.status(400).json({ msg: 'Please enter all required fields and select at least one interest.' });
  }

  if (password.length < 6) {
    console.log('Password too short');
    return res.status(400).json({ msg: 'Password must be at least 6 characters' });
  }

  if (!email.includes('@')) {
    console.log('Invalid email');
    return res.status(400).json({ msg: 'Please enter a valid email' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      academicLevel,
      interests
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    try {
      await user.save();
      console.log('User saved successfully:', { id: user.id, email: user.email });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      return res.status(500).json({ 
        msg: 'Error saving user to database',
        error: saveError.message 
      });
    }

    // Generate JWT token
    try {
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' }
      );

      console.log('JWT token generated successfully');
      res.json({ 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          academicLevel: user.academicLevel
        }
      });
    } catch (tokenError) {
      console.error('Error generating JWT token:', tokenError);
      return res.status(500).json({ 
        msg: 'Error generating authentication token',
        error: tokenError.message 
      });
    }
  } catch (err) {
    console.error('Server error during registration:', err);
    res.status(500).json({ 
      msg: 'Server error during registration',
      error: err.message 
    });
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
