// Dailyexpense.js
import React, { useState, useEffect } from "react";
import "./../styles/dailyexpense.css";

function Dailyexpense() {
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetchDailyExpenses();
    fetchMonthlyExpenses();
  }, []);

  const fetchDailyExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getDailyExpenses');
      if (response.ok) {
        const data = await response.json();
        setDailyExpenses(data);
      } else {
        console.error('Failed to fetch daily expenses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const handleAddExpense = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newItem, newQuantity, newPrice }),
      });

      if (response.ok) {
        // Refresh the daily expenses after successful addition
        fetchDailyExpenses();
        // Update monthly expenses
        fetchMonthlyExpenses();
        // Clear the input fields
        setNewItem("");
        setNewQuantity("");
        setNewPrice("");
      } else {
        const errorData = await response.json(); // Assuming your backend sends error details in the response
        // Display a user-friendly error message on the UI
        alert(`Failed to add expense: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // Display a user-friendly error message on the UI if needed
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteExpense/${expenseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the daily expenses after successful deletion
        fetchDailyExpenses();
        // Update monthly expenses
        fetchMonthlyExpenses();
      } else {
        // Handle specific HTTP error codes (if needed)
        if (response.status === 401) {
          console.error('Unauthorized: You do not have permission to delete this expense.');
        } else {
          console.error(`Failed to delete expense: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Display a user-friendly error message on the UI if needed
    }
  };

  return (
    <div className="daily-expenses-outermost-box">
      <h1>Daily Expenses</h1>
      <div className="daily-expense-table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dailyExpenses.map((expense) => (
              <tr key={expense._id}>
                <th scope="row">{expense.item}</th>
                <td>{expense.quantity}</td>
                <td>{`Rs. ${expense.price}`}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDeleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-expense-form">
        <form onSubmit={handleAddExpense}>
          <div className="input-text-item-div">
            <input
              type="text"
              name="newItem"
              autoComplete="off"
              required
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Item"
            />
            <input
              type="text"
              name="newQuantity"
              autoComplete="off"
              required
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="Quantity"
            />
            <input
              type="text"
              name="newPrice"
              autoComplete="off"
              required
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Price"
            />
            <button className="btn btn-light" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dailyexpense;
