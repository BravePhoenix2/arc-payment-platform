import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

function PaymentHistory({ provider, account, paymentProcessorAddress }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (!provider || !account) {
          setLoading(false);
          return;
        }

        // Fetch from backend API
        const response = await axios.get(`/api/payments/${account}`);
        setPayments(response.data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [provider, account, paymentProcessorAddress]);

  if (loading) {
    return <div className="payment-history"><p>Loading...</p></div>;
  }

  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>From</th>
              <th>To</th>
              <th>Amount (ARC)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.payer.substring(0, 6)}...{payment.payer.substring(38)}</td>
                <td>{payment.payee.substring(0, 6)}...{payment.payee.substring(38)}</td>
                <td>{(payment.amount / 10**18).toFixed(4)}</td>
                <td>
                  <span className={`status ${payment.completed ? 'completed' : 'pending'}`}>
                    {payment.completed ? 'Completed' : payment.refunded ? 'Refunded' : 'Pending'}
                  </span>
                </td>
                <td>{new Date(payment.timestamp * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentHistory;
