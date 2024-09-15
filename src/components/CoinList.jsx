import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        setError('Failed to fetch coins');
      }
    };

    fetchCoins();
  }, []);

  if (error) return <div className="text-center mt-10 text-lg text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Cryptocurrency List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {coins.map((coin) => (
          <Link
            to={`/coin/${coin.id}`}
            key={coin.id}
            className="bg-white rounded-lg p-4 flex items-center transition-transform transform hover:scale-105 hover:shadow-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
          >
            <img src={coin.image} alt={coin.name} className="w-12 h-12 mr-4" />
            <div className="text-lg font-medium">
              {coin.name} ({coin.symbol.toUpperCase()})
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinList;
