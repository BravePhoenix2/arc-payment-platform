const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

// Get all payments for a user
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const { limit = 50, offset = 0, type = 'all' } = req.query;

    let query = {
      $or: [
        { payer: address.toLowerCase() },
        { payee: address.toLowerCase() }
      ]
    };

    if (type === 'sent') {
      query = { payer: address.toLowerCase() };
    } else if (type === 'received') {
      query = { payee: address.toLowerCase() };
    }

    const payments = await Payment.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Payment.countDocuments(query);

    res.json({
      payments,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment details
router.get('/details/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findOne({ paymentId: parseInt(paymentId) });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create payment record (webhook from blockchain)
router.post('/webhook', async (req, res) => {
  try {
    const { paymentId, payer, payee, amount, txHash, blockNumber } = req.body;

    // Verify webhook signature if needed
    if (req.headers['x-webhook-token'] !== process.env.WEBHOOK_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let payment = await Payment.findOne({ paymentId });
    if (!payment) {
      payment = new Payment({
        paymentId,
        payer: payer.toLowerCase(),
        payee: payee.toLowerCase(),
        amount,
        txHash,
        blockNumber,
        timestamp: new Date()
      });
      await payment.save();
    }

    // Update user stats
    await User.findOneAndUpdate(
      { address: payer.toLowerCase() },
      { $inc: { totalSent: amount }, lastActive: new Date() },
      { upsert: true }
    );

    await User.findOneAndUpdate(
      { address: payee.toLowerCase() },
      { $inc: { totalReceived: amount }, lastActive: new Date() },
      { upsert: true }
    );

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pending payments
router.get('/status/pending', async (req, res) => {
  try {
    const pending = await Payment.find({ 
      completed: false, 
      refunded: false 
    }).sort({ timestamp: -1 });

    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
