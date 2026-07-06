import React, { useState } from 'react';
import { ethers } from 'ethers';

function SendPayment({ provider, arcTokenAddress, paymentProcessorAddress }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!provider) {
        throw new Error('Wallet not connected');
      }

      if (!ethers.isAddress(recipient)) {
        throw new Error('Invalid recipient address');
      }

      if (isNaN(amount) || parseFloat(amount) <= 0) {
        throw new Error('Invalid amount');
      }

      const signer = await provider.getSigner();
      const amountWei = ethers.parseEther(amount);

      // Approve token spending
      const tokenABI = ['function approve(address spender, uint256 amount) returns (bool)'];
      const tokenContract = new ethers.Contract(arcTokenAddress, tokenABI, signer);
      
      const approveTx = await tokenContract.approve(paymentProcessorAddress, amountWei);
      await approveTx.wait();

      // Send payment
      const processorABI = [
        'function initiatePayment(address payee, uint256 amount, string memory description) returns (uint256)'
      ];
      const processorContract = new ethers.Contract(paymentProcessorAddress, processorABI, signer);
      
      const tx = await processorContract.initiatePayment(recipient, amountWei, description);
      await tx.wait();

      setMessage('Payment sent successfully!');
      setRecipient('');
      setAmount('');
      setDescription('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-payment">
      <h2>Send Payment</h2>
      <form onSubmit={handleSendPayment}>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="number"
          placeholder="Amount (ARC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          step="0.01"
          required
        />
        <textarea
          placeholder="Payment Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Send Payment'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default SendPayment;
