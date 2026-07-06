const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  payer: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  payee: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  amount: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
    index: true
  },
  refunded: {
    type: Boolean,
    default: false
  },
  txHash: {
    type: String,
    unique: true,
    sparse: true
  },
  blockNumber: Number,
  fee: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

paymentSchema.index({ payer: 1, createdAt: -1 });
paymentSchema.index({ payee: 1, createdAt: -1 });

module.exports = mongoose.model('Payment', paymentSchema);
