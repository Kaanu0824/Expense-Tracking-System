import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../redux/expenseSlice';
import './ExpenseList.css'; // Import the CSS if it's separated

const ExpenseList = ({ onEdit }) => {
    const expenses = useSelector((state) => state.expenses.expenses);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            dispatch(deleteExpense(id));
        }
    };

    return (
        <div>
            {expenses.length === 0 ? (
                <p>No expenses found</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            <p>{expense.category} - ${expense.amount} on {expense.date}</p>
                            <p>{expense.description}</p>
                            <button className="edit" onClick={() => onEdit(expense)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
