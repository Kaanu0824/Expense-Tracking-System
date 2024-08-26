import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../redux/expenseSlice';
import './ExpenseForm.css'; // Import the CSS if it's separated

const ExpenseForm = ({ currentExpense, onClose }) => {
    const [expenseData, setExpenseData] = useState({
        amount: '',
        category: '',
        date: '',
        description: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentExpense) {
            setExpenseData(currentExpense);
        }
    }, [currentExpense]);

    const handleChange = (e) => {
        setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentExpense) {
            dispatch(updateExpense({ id: currentExpense.id, updatedExpense: expenseData }));
        } else {
            dispatch(addExpense({ ...expenseData, id: Date.now().toString() }));
        }

        setExpenseData({ amount: '', category: '', date: '', description: '' });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expenseData.amount}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={expenseData.category}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="date"
                value={expenseData.date}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={expenseData.description}
                onChange={handleChange}
                required
            ></textarea>
            <button type="submit">{currentExpense ? 'Update Expense' : 'Add Expense'}</button>
        </form>
    );
};

export default ExpenseForm;
