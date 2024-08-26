import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';

function App() {
  const [currentExpense, setCurrentExpense] = useState(null);

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
  };
  return (
    <div className="App">
      <h1>Expense Management</h1>
      <ExpenseForm currentExpense={currentExpense} setCurrentExpense={setCurrentExpense} />
      <ExpenseList onEdit={handleEdit} />
    </div>
  );
}

export default App;
