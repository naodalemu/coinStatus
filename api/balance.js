const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const timestamp = Date.now();
  const query = `timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', process.env.API_SECRET).update(query).digest('hex');

  try {
    const response = await axios.get(`https://api.binance.com/api/v3/account?${query}&signature=${signature}`, {
      headers: {
        'X-MBX-APIKEY': process.env.API_KEY,
      },
    });

    res.status(200).json(response.data.balances); // Send balances to the frontend
  } catch (error) {
    console.error('Error fetching balance from Binance API:', error.response?.data || error.message);
    
    // Return the error details to the frontend for easier debugging
    res.status(500).json({
      error: 'Failed to fetch balances',
      details: error.response?.data || error.message,
    });
  }
};
