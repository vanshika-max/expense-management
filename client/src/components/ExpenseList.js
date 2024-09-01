import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);
     
     // Calculate the total amount spent overall
  const totalSpentOverall = expenses.reduce((acc, expense) => acc + expense.amount, 0);

   // Filter expenses based on selected month
   const filteredExpenses = expenses.filter(expense => {
    const expenseMonth = new Date(expense.date).getMonth() + 1; // getMonth() returns 0 for January
    return selectedMonth === '' || expenseMonth === parseInt(selectedMonth);
  });

    // Calculate the total amount spent for the filtered (monthly) expenses
    const totalSpentMonthly = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);

  
  // Calculate the total amount spent
  // const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold my-4">Expenses</h2>
      {/* <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.category}: ${expense.amount} - {expense.description} on {new Date(expense.date).toLocaleDateString()}
          </li>
        ))}
      </ul> */}

      {/* added table with styling */}
      
      {/* Month selection dropdown */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="month-select">Select Month:</label>
        <select
          id="month-select"
          className="border rounded px-4 py-2 w-full max-w-xs font-bold"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
         
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-blue-500 text-white">Category</th>
              <th className="py-2 px-4 border-b bg-blue-500 text-white">Amount</th>
              <th className="py-2 px-4 border-b bg-blue-500 text-white">Description</th>
              <th className="py-2 px-4 border-b bg-blue-500 text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <tr key={expense._id}>
                <td className="py-2 px-4 border-b text-center">{expense.category}</td>
                <td className="py-2 px-4 border-b text-center">${expense.amount}</td>
                <td className="py-2 px-4 border-b text-center">{expense.description}</td>
                <td className="py-2 px-4 border-b text-center">{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
             {/* <tr>
              <td className="py-2 px-4 border-b text-center font-bold" colSpan="3">Total Spent</td>
              <td className="py-2 px-4 border-b text-center font-bold">${totalSpent.toFixed(2)}</td>
            </tr> */}

             {/* Row for displaying total spent for the selected month */}
             <tr>
              <td className="py-2 px-4 border-b text-center font-bold" colSpan="3">Total Spent (Selected Month)</td>
              <td className="py-2 px-4 border-b text-center font-bold">${totalSpentMonthly.toFixed(2)}</td>
            </tr>
            {/* Row for displaying total spent overall */}
            <tr>
              <td className="py-2 px-4 border-b text-center font-bold" colSpan="3">Total Spent (Overall)</td>
              <td className="py-2 px-4 border-b text-center font-bold">${totalSpentOverall.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ExpenseList;
