import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
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
  },
});

const { reducer, actions } = globalSlice;

export const { setIsLoading, setIsModalLogoutOpen, setIsModalAddTransactionOpen } = actions;

export default reducer;
