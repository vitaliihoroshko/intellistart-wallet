import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isCurrencyDisplayed: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setIsModalLogoutOpen(state, action) {
      state.isModalLogoutOpen = action.payload;
    },

    setIsModalAddTransactionOpen(state, action) {
      state.isModalAddTransactionOpen = action.payload;
    },

    setIsCurrencyDisplayed(state, action) {
      state.isCurrencyDisplayed = action.payload;
    },
  },
});

const { reducer, actions } = globalSlice;

export const {
  setIsLoading,
  setIsModalLogoutOpen,
  setIsModalAddTransactionOpen,
  setIsCurrencyDisplayed,
} = actions;

export default reducer;
