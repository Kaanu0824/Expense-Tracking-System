import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../../store/expenseSlice';
import './ExpenseForm.css';

const ExpenseForm = ({ currentExpense, setCurrentExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
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
    const newExpense = {
      id: currentExpense ? currentExpense.id : Date.now(),
      amount,
      category,
      date,
      description,
    };
    if (currentExpense) {
      dispatch(updateExpense(newExpense));
    } else {
      dispatch(addExpense(newExpense));
    }
    setCurrentExpense(null);
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">{currentExpense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
};

export default ExpenseForm;
