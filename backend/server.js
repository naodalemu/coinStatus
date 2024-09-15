const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors'); // Enable CORS for React frontend
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3001; // Port will use environment variable in production or default to 3001

// Load API Key and Secret from environment variables
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

// Enable CORS so the React frontend can make requests to this server
app.use(cors());

// Backend route to fetch account balance securely from Binance API
app.get('/api/balance', async (req, res) => {
  const timestamp = Date.now();
  const query = `timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(query).digest('hex');

  try {
    const response = await axios.get(`https://api.binance.com/api/v3/account?${query}&signature=${signature}`, {
      headers: {
        'X-MBX-APIKEY': apiKey
      }
    });
    res.json(response.data.balances); // Send balances to frontend
  } catch (error) {
    console.error('Error fetching balance from Binance API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
