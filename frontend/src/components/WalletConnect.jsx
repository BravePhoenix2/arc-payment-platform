import React from 'react';

export const WalletConnect = ({ onConnect }) => {
  const handleConnect = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      onConnect?.(provider, accounts[0]);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <button onClick={handleConnect} className="connect-btn">
      Connect Wallet
    </button>
  );
};

export default WalletConnect;
