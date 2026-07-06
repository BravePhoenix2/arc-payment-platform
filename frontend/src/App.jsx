import React, { useState, useEffect } from 'react';
import WalletConnect from './WalletConnect';
import SendPayment from './SendPayment';
import PaymentHistory from './PaymentHistory';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);

  // Contract addresses - Replace with your deployed addresses
  const ARC_TOKEN_ADDRESS = process.env.REACT_APP_ARC_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000';
  const PAYMENT_PROCESSOR_ADDRESS = process.env.REACT_APP_PAYMENT_PROCESSOR_ADDRESS || '0x0000000000000000000000000000000000000000';

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
        setConnected(accounts.length > 0);
      });
    }
  }, []);

  const handleWalletConnect = (provider, account) => {
    setProvider(provider);
    setAccount(account);
    setConnected(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Arc Payment Platform</h1>
        <p>Web3 Payment Solution for Arc Layer 1</p>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="sidebar">
            <WalletConnect onConnect={handleWalletConnect} />
          </div>

          <div className="content">
            {connected ? (
              <>
                <SendPayment 
                  provider={provider} 
                  arcTokenAddress={ARC_TOKEN_ADDRESS}
                  paymentProcessorAddress={PAYMENT_PROCESSOR_ADDRESS}
                />
                <PaymentHistory 
                  provider={provider} 
                  account={account}
                  paymentProcessorAddress={PAYMENT_PROCESSOR_ADDRESS}
                />
              </>
            ) : (
              <div className="welcome">
                <h2>Welcome to Arc Payment Platform</h2>
                <p>Connect your wallet to get started with secure Web3 payments</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Arc Payment Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
