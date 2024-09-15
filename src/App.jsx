import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinList from '../src/components/CoinList';
import CoinDetail from '../src/components/CoinDetail';
import AccountBalance from './components/AccountBalance';
import Navbar from './components/Navbar';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/balance" element={<AccountBalance />} />
      </Routes>
    </Router>
  );
};

export default App;