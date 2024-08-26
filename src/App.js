import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css'; // Import CSS
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { store } from './redux/store';

const App = () => {
    const [currentExpense, setCurrentExpense] = useState(null);

    const handleEdit = (expense) => {
        setCurrentExpense(expense);
    };

    const handleCloseForm = () => {
        setCurrentExpense(null);
    };

    return (
        <Provider store={store}>
            <div className="container">
                <h1>Expense Management System</h1>
                <ExpenseForm currentExpense={currentExpense} onClose={handleCloseForm} />
                <ExpenseList onEdit={handleEdit} />
            </div>
        </Provider>
    );
};

export default App;
