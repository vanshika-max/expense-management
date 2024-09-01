
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const NavBar = () => {
  

  const { auth } = useAuth(); 

  return (
    <nav className="flex justify-between items-center p-6 bg-blue-700 text-white">
      <div className="text-lg font-bold">
        <Link to="/">Pennywise</Link>
      </div>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        
        {auth.token ? (
          <>
            <Link to="/expenses" className="hover:text-gray-400">Expenses</Link>
            <Link to="/add-expense" className="hover:text-gray-400">Add Expense</Link>
            <Link to="/logout" className="hover:text-gray-400">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
            <Link to="/register" className="hover:text-gray-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
