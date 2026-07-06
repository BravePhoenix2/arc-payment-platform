const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  balance: {
    type: String,
    default: '0'
  },
  totalSent: {
    type: String,
    default: '0'
  },
  totalReceived: {
    type: String,
    default: '0'
  },
  paymentCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
