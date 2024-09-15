import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-gray-100 font-bold text-2xl tracking-wide">
          <Link to="/">Crypto Dashboard</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300 font-bold">Home</Link>
          <Link to="/balance" className="text-gray-300 hover:text-white transition duration-300 font-bold">Balance</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
