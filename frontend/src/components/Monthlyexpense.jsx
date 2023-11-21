// Monthlyexpense.js
import React, { useState, useEffect } from "react";

function Monthlyexpense() {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    fetchMonthlyExpenses();
  }, []);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getMonthlyExpenses');
      if (response.ok) {
        const data = await response.json();
        setMonthlyExpenses(data);
      } else {
        console.error('Failed to fetch monthly expenses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Monthly expenses</h1>
      </div>
      <div>
        <h1>Current month (till now)</h1>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {monthlyExpenses.map((expense) => (
                <tr key={expense._id}>
                  <th scope="row">{expense.item}</th>
                  <td>{expense.quantity}</td>
                  <td>{`Rs. ${expense.price}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Monthlyexpense;
