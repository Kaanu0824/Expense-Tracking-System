
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { deleteExpense } from '../../store/expenseSlice';
import './ExpenseList.css';

// Colors for the chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ExpenseList = ({ onEdit }) => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  // Prepare data for the graph
  const data = [
    { category: 'Food', amount: 0 },
    { category: 'Study', amount: 0 },
    { category: 'Travel', amount: 0 },
    { category: 'Dress', amount: 0 },
    { category: 'Other', amount: 0 }
  ];

  expenses.forEach(expense => {
    const found = data.find(item => item.category === expense.category);
    if (found) {
      found.amount += Number(expense.amount);
    }
  });

  return (
    <div className="expense-list">
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

      <h2>Expense Distribution</h2>
      <div className="graph-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#82ca9d"
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseList;
