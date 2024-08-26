import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addExpense, updateExpense } from '../store/expenseSlice';
import { addExpense, updateExpense } from '../../store/expenseSlice';
import './ExpenseForm.css';

const ExpenseForm = ({ currentExpense, setCurrentExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentExpense) {
      setAmount(currentExpense.amount);
      setCategory(currentExpense.category);
      setDate(currentExpense.date);
      setDescription(currentExpense.description);
    }
  }, [currentExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      id: currentExpense ? currentExpense.id : Date.now(),
      amount,
      category,
      date,
      description,
    };
    if (currentExpense) {
      dispatch(updateExpense(expenseData));
    } else {
      dispatch(addExpense(expenseData));
    }
    setCurrentExpense(null);
    setAmount('');
    setCategory('Food');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Study">Study</option>
          <option value="Travel">Travel</option>
          <option value="Dress">Dress</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Save Expense</button>
    </form>
  );
};

export default ExpenseForm;
