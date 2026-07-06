require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ethers } = require('ethers');

const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/arc-payment';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Web3 Provider
const provider = new ethers.JsonRpcProvider(
  process.env.ARC_RPC_URL || 'https://testnet-rpc.arc.io'
);

// Make provider available to routes
app.locals.provider = provider;
app.locals.arcTokenAddress = process.env.ARC_TOKEN_ADDRESS;
app.locals.paymentProcessorAddress = process.env.PAYMENT_PROCESSOR_ADDRESS;

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Arc Payment Backend running on port ${PORT}`);
});

module.exports = app;
