import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
    <div className='box'>
    <form onSubmit={handleSubmit} className='contactForm' > 

        <input
          type="number"
          className='amount'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
     
        <select className='cat' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Study">Study</option>
          <option value="Travel">Travel</option>
          <option value="Dress">Dress</option>
          <option value="Other">Other</option>
        </select>
      
       
        <input
          type="date"
          className='date'
          placeholder='Select Date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
     
        <input
          type="text"
          className='des'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      
      <button className='submit' type="submit">Save Expense</button>
      
    </form>
    </div>
  );
};

export default ExpenseForm;
