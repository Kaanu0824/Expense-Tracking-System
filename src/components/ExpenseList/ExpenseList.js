import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../../store/expenseSlice';
import './ExpenseList.css';

const ExpenseList = ({ onEdit }) => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.date}</span> - <span>{expense.category}</span> - <span>${expense.amount}</span> - <span>{expense.description}</span>
            <button onClick={() => onEdit(expense)}>Edit</button>
            <button onClick={() => dispatch(deleteExpense(expense.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
