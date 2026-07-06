const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

// Get platform statistics
router.get('/', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const completedPayments = await Payment.countDocuments({ completed: true });
    
    const totalAmountAggregate = await Payment.aggregate([
      { $match: { completed: true } },
      { $group: { _id: null, total: { $sum: { $convert: { input: '$amount', to: 'long' } } } } }
    ]);

    const totalAmount = totalAmountAggregate.length > 0 ? totalAmountAggregate[0].total : 0;

    // Get recent payments
    const recentPayments = await Payment.find({ completed: true })
      .sort({ timestamp: -1 })
      .limit(10);

    // Get top users
    const topUsers = await User.find()
      .sort({ totalSent: -1 })
      .limit(10);

    res.json({
      totalUsers,
      totalPayments,
      completedPayments,
      totalAmount,
      recentPayments,
      topUsers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get daily statistics
router.get('/daily/:days', async (req, res) => {
  try {
    const { days = 30 } = req.params;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const stats = await Payment.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          completed: true
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          paymentCount: { $sum: 1 },
          totalAmount: { $sum: { $convert: { input: '$amount', to: 'long' } } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
