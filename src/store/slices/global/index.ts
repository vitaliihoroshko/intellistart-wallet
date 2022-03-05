import { createSlice } from '@reduxjs/toolkit';

import { GlobalState, Action } from 'store/types';

const initialState: GlobalState = {
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
    setIsLoading(state: GlobalState, action: Action<boolean>): void {
      state.isLoading = action.payload;
    },

    setIsModalLogoutOpen(state: GlobalState, action: Action<boolean>): void {
      state.isModalLogoutOpen = action.payload;
    },

    setIsModalAddTransactionOpen(state: GlobalState, action: Action<boolean>): void {
      state.isModalAddTransactionOpen = action.payload;
    },

    setIsCurrencyDisplayed(state: GlobalState, action: Action<boolean>): void {
      state.isCurrencyDisplayed = action.payload;
    },

    setPathname(state: GlobalState, action: Action<string>): void {
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
