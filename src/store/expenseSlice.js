// src/store/expenseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      return state.filter(expense => expense.id !== action.payload);
    }
  }
});

export const { addExpense, updateExpense, deleteExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
