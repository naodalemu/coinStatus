# Coin Status - Crypto Dashboard

This project is a **cryptocurrency dashboard** that fetches and displays account balances from the **Binance API** using a **React frontend** and a **serverless backend** deployed on **Vercel**. The backend securely fetches account data using Binance API credentials and calculates the balance in USDT. Remember to put the API_KEY and API_SECRET in the .env file on the server like vercel.

## Live Demo

You can view the live demo of the project here:  
[Coin Status](https://coin-status-ten.vercel.app/)

## Key Features

- **React Frontend**: A clean and simple interface to display cryptocurrency balances and prices in USDT.
- **Binance API Integration**: Securely fetches account balances from Binance using API keys.
- **Serverless Backend**: The backend is deployed as serverless functions on Vercel to handle API requests and securely communicate with the Binance API.
- **Deployment**: Fully deployed on Vercel, with backend functions running in the **Frankfurt (arn1)** region to avoid geographical restrictions imposed by Binance.

## How to Run Locally

To run the project locally, follow these steps:

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- A **Binance API Key** and **Secret**.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/naodalemu/coinStatus.git
   cd coin-status

   ```

2. **Install dependencies:**:

   ```bash
   npm install
   ```

3. **Create a .env.local file in the root of the project and add your Binance API credentials:**:

   ```bash
   API_KEY=your-binance-api-key
   API_SECRET=your-binance-api-secret
   ```

4. **To simulate the serverless functions locally, you can use Vercel CLI. Install it globally:**:

   ```bash
   npm install -g vercel
   ```

4. **Run the project locally with Vercel’s development environment:**:

   ```bash
   vercel dev
   ```
   This will run both the frontend and the serverless functions locally.

6. **Open your browser and go to http://localhost:3000 to see the app running.**:

### Contributing

Feel free to fork the project and make pull requests with improvements, bug fixes, or new features.

### License

This project is licensed under the MIT License.


### Instructions for Usage:
- Copy the above content into a file named `README.md` in your project root directory.
- Modify the **`git clone`** URL and any other specific details according to your project needs.
- Make sure you customize the **Live Demo** link and **GitHub repository** link to reflect your project.

This `README.md` file provides clear instructions for setting up the project locally, deploying it to Vercel, and handling API integration with Binance. It’s written in proper markdown format that you can directly use on GitHub.
