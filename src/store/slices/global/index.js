import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isCurrencyDisplayed: false,
  pathname: '/',
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

    setPathname(state, action) {
      state.pathname = action.payload;
    },
  },
});

const { reducer, actions } = globalSlice;

export const {
  setIsLoading,
  setIsModalLogoutOpen,
  setIsModalAddTransactionOpen,
  setIsCurrencyDisplayed,
  setPathname,
} = actions;

export default reducer;
