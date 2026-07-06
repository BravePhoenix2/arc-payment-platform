const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    let user = await User.findOne({ address: address.toLowerCase() });

    if (!user) {
      user = new User({
        address: address.toLowerCase()
      });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin)
router.get('/', async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;

    const users = await User.find()
      .sort({ lastActive: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await User.countDocuments();

    res.json({
      users,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const updates = req.body;

    // Only allow certain fields to be updated
    const allowedUpdates = ['balance'];
    const filteredUpdates = {};
    
    allowedUpdates.forEach(field => {
      if (field in updates) {
        filteredUpdates[field] = updates[field];
      }
    });

    const user = await User.findOneAndUpdate(
      { address: address.toLowerCase() },
      filteredUpdates,
      { new: true, upsert: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
