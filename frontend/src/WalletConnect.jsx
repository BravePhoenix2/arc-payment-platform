import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ArcPaymentToken = require('../contracts/ArcPaymentToken.json');
const ArcPaymentProcessor = require('../contracts/ArcPaymentProcessor.json');

function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask or compatible Web3 wallet');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
      setAccount(accounts[0]);
      setConnected(true);

      // Get balance
      const balance = await ethProvider.getBalance(accounts[0]);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccount(null);
    setBalance('0');
    setProvider(null);
  };

  return (
    <div className="wallet-connect">
      {!connected ? (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <p>Connected: {account?.substring(0, 6)}...{account?.substring(38)}</p>
          <p>Balance: {parseFloat(balance).toFixed(4)} ARC</p>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
