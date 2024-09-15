import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // Import Chart component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import LoadingSpinner from './LoadingSpinner';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinDetail = () => {
  const { id } = useParams(); // Get coin ID from the URL parameters
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]); // State for historical data

  // Fetch coin details from the CoinGecko API
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch coin details');
        setLoading(false);
      }
    };

    // Fetch 7-day historical price data
    const fetchHistory = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
        const data = await response.json();
        setHistory(data.prices); // Store historical price data
      } catch (error) {
        console.error('Failed to fetch historical data', error);
      }
    };

    fetchCoin();
    fetchHistory();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center mt-10 text-lg text-red-500">{error}</div>;

  // Prepare data for the chart
  const chartData = {
    labels: history.map(price => new Date(price[0]).toLocaleDateString()), // Dates as labels
    datasets: [
      {
        label: `${coin?.name} Price (USD)`,
        data: history.map(price => price[1]), // Prices as data points
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.2, // Smooth curve for the line
      },
    ],
  };

  return (
    <div className="max-w-7xl m-auto px-4 py-8">
      {coin && (
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center">
            <img src={coin.image.large} alt={coin.name} className="w-16 h-16 mr-4" />
            <h1 className="text-3xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
          </div>

          {/* Description Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: coin.description.en }}></p>
          </div>

          {/* Market Data Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Market Data</h2>

            {/* Fancy Boxes for Market Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold">Current Price (USD)</h3>
                <p className="mt-2 text-2xl font-bold text-blue-900">${coin.market_data.current_price.usd.toLocaleString()}</p>
              </div>

              <div className="bg-green-100 p-4 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold">Market Cap</h3>
                <p className="mt-2 text-2xl font-bold text-green-900">${coin.market_data.market_cap.usd.toLocaleString()}</p>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold">24h Trading Volume</h3>
                <p className="mt-2 text-2xl font-bold text-yellow-900">${coin.market_data.total_volume.usd.toLocaleString()}</p>
              </div>

              <div className="bg-red-100 p-4 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold">Price Change (24h)</h3>
                <p className={`mt-2 text-2xl font-bold ${coin.market_data.price_change_percentage_24h >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>

              <div className="bg-indigo-100 p-4 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold">All-Time High (USD)</h3>
                <p className="mt-2 text-2xl font-bold text-indigo-900">${coin.market_data.ath.usd.toLocaleString()}</p>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold">All-Time Low (USD)</h3>
                <p className="mt-2 text-2xl font-bold text-purple-900">${coin.market_data.atl.usd.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* 7-Day Price History Chart */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Price History (Last 7 Days)</h2>
            <Line data={chartData} />
          </div>

          {/* Back to List Button */}
          <Link
            to="/"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Back to List
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
