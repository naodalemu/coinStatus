import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinList from '../src/components/CoinList';
import CoinDetail from '../src/components/CoinDetail';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
