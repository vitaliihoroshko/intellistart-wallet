import { createSlice } from '@reduxjs/toolkit';

import { FinanceState, Action } from 'store/types';
import { Transaction, TransactionCategory, TransactionsSummary } from 'common/interfaces';

const initialState: FinanceState = {
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
    setTotalBalance(state: FinanceState, action: Action<number>): void {
      state.totalBalance = action.payload;
    },

    setTransactions(state: FinanceState, action: Action<Transaction[]>): void {
      state.transactions = action.payload;
    },

    setTransactionCategories(state: FinanceState, action: Action<TransactionCategory[]>): void {
      state.transactionCategories = action.payload;
    },

    setTransactionsSummary(state: FinanceState, action: Action<TransactionsSummary>): void {
      state.transactionsSummary = action.payload;
    },

    addTransaction(
      state: FinanceState,
      action: Action<{ transaction: Transaction; balanceDifference: number }>,
    ): void {
      state.transactions.unshift(action.payload.transaction);
      state.totalBalance += action.payload.balanceDifference;
    },

    setError(state: FinanceState, action: Action<string>): void {
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = financeSlice;

export const {
  setTotalBalance,
  setTransactions,
  setTransactionCategories,
  setTransactionsSummary,
  addTransaction,
  setError,
} = actions;

export default reducer;
