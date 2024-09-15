import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const AccountBalance = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prices, setPrices] = useState({}); // Store USDT prices for each asset

  // Fetch USDT prices for each asset
  const fetchPrice = async (symbol) => {
    if (symbol === 'USDT') return 1; // USDT is always 1 USDT
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
      return parseFloat(response.data.price);
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error);
      return 0;
    }
  };

  // Fetch balances and prices from the backend and price API
  useEffect(() => {
    const fetchBalancesAndPrices = async () => {
      try {
        // Fetch balances from your backend
        const response = await axios.get('http://localhost:3001/api/balance');

        // Filter out assets with 0 balance
        const nonZeroBalances = response.data.filter(balance => parseFloat(balance.free) > 0);

        // Fetch prices for each asset and store them in the state
        const prices = {};
        for (const balance of nonZeroBalances) {
          const priceInUSDT = await fetchPrice(balance.asset);
          prices[balance.asset] = priceInUSDT;
        }
        setPrices(prices);

        setBalances(nonZeroBalances);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch account balance');
        setLoading(false);
      }
    };

    fetchBalancesAndPrices();
  }, []);

  // Function to calculate balance in USDT
  const calculateBalanceInUSDT = (balance) => {
    const priceInUSDT = prices[balance.asset] || 0;
    const totalAmount = parseFloat(balance.free) + parseFloat(balance.locked);
    return totalAmount * priceInUSDT;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Account Balances</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">Asset</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Balance</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Locked</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Balance (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance) => (
            <tr key={balance.asset} className="border-b">
              <td className="py-2 px-4">{balance.asset}</td>
              <td className="py-2 px-4">{balance.free}</td>
              <td className="py-2 px-4">{balance.locked}</td>
              <td className="py-2 px-4">
                {calculateBalanceInUSDT(balance).toFixed(8)} USDT
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountBalance;
