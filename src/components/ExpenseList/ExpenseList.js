import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { deleteExpense } from '../../store/expenseSlice';
import './ExpenseList.css';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ExpenseList = ({ onEdit }) => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

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
    <div className="list">

      <div className='ExpensesList'>
        <h1> Expenses</h1>
        <ul className='expancecard'>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span className='cate'> {expense.date} - {expense.category} -  ${expense.amount} -  {expense.description}</span>
              <button className='btnedit' onClick={() => onEdit(expense)}>Edit</button>
              <button className='btndelete' onClick={() => dispatch(deleteExpense(expense.id))}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="graph-container">
      <h2>Expense Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
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
            <Legend verticalAlign="top" height={25} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ExpenseList;
