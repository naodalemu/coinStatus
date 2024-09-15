const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors'); // Enable CORS for React frontend
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3001; // Port will use environment variable in production or default to 3001

// Enable CORS so the React frontend can make requests to this server
app.use(cors({
  origin: '*' // Allow all origins or specify your frontend URL
}));

// Backend health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Backend route to fetch account balance securely from Binance API
app.get('/api/balance', async (req, res) => {
  const timestamp = Date.now();
  const query = `timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', process.env.API_SECRET).update(query).digest('hex');

  try {
    const response = await axios.get(`https://api.binance.com/api/v3/account?${query}&signature=${signature}`, {
      headers: {
        'X-MBX-APIKEY': process.env.API_KEY
      }
    });
    res.json(response.data.balances); // Send balances to frontend
  } catch (error) {
    console.error('Error fetching balance from Binance API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
