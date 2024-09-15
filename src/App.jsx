import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinList from '../src/components/CoinList';
import CoinDetail from '../src/components/CoinDetail';
import AccountBalance from './components/AccountBalance';
import Navbar from './components/Navbar';
import axios from 'axios';
import "./App.css"

const App = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Call the health check endpoint when the app launches
    const checkBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/health');
        setStatus(response.data.message); // Set the status if API is up
      } catch (error) {
        setStatus('Backend is not reachable');
      }
    };

    checkBackend();
  }, []);

  return (
    <Router>
      <Navbar />
      <h1>Backend Staus: {status}</h1>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/balance" element={<AccountBalance />} />
      </Routes>
    </Router>
  );
};

export default App;