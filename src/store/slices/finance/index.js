import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalBalance: 0,
  transactions: [],
  transactionCategories: [],
  transactionsSummary: null,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload.transactions;
      state.totalBalance = action.payload.balance;
    },

    setTransactionCategories(state, action) {
      state.transactionCategories = action.payload;
    },

    setTransactionsSummary(state, action) {
      state.transactionsSummary = action.payload;
    },

    addTransaction(state, action) {
      state.transactions.unshift(action.payload.transaction);
      state.totalBalance += action.payload.balanceDifference;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = financeSlice;

export const {
  setTransactions,
  setTransactionCategories,
  setTransactionsSummary,
  addTransaction,
  setError,
} = actions;

export default reducer;
