import {
  setTransactions,
  setError,
  addTransaction,
  setTransactionCategories,
  setTransactionsSummary,
} from '.';
import { setError as setSessionError } from 'store/slices/session';
import { translateCategoryNames } from 'utils/translationFunctions';
import { transformTransactionsSummary } from 'utils/helperFunctions';

export const getTransactions = token => {
  return async (dispatch, getState, api) => {
    try {
      const transactions = await api.getTransactions(token);
      const { balance } = getState().session.user;
      dispatch(setTransactions({ transactions: [...transactions].reverse(), balance }));
    } catch (error) {
      if (error.response.status === 400) dispatch(setError('Validation error'));
      else if (error.response.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      }
    }
  };
};

export const createTransaction = (createTransactionDto, token) => {
  return async (dispatch, _, api) => {
    try {
      const transaction = await api.createTransaction(createTransactionDto, token);
      const { amount } = createTransactionDto;
      dispatch(addTransaction({ transaction, balanceDifference: amount }));
    } catch (error) {
      if (error.response.status === 400) dispatch(setError('Validation error'));
      else if (error.response.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      } else if (error.response.status === 404) {
        dispatch(setError('Transaction category not found'));
      } else if (error.response.status === 409) {
        dispatch(setError('Transaction category type does not match transaction type'));
      }
    }
  };
};

export const getTransactionCategories = token => {
  return async (dispatch, _, api) => {
    try {
      const categories = await api.getTransactionCategories(token);
      const translatedCategories = translateCategoryNames(categories);
      dispatch(setTransactionCategories(translatedCategories));
    } catch (error) {
      dispatch(setSessionError('Bearer authorization failed'));
    }
  };
};

export const getTransactionsSummary = (token, period) => {
  return async (dispatch, _, api) => {
    try {
      const transactionsSummary = await api.getTransactionsSummary(token, period);
      const transformedTransactionsSummary = transformTransactionsSummary(transactionsSummary);
      dispatch(setTransactionsSummary(transformedTransactionsSummary));
    } catch (error) {
      if (error.response.status === 400) dispatch(setError('Validation error'));
      else if (error.response.status === 401) dispatch('Bearer authorization failed');
    }
  };
};