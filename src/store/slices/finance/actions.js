import { toast } from 'react-toastify';

import {
  setTransactions,
  addTransaction,
  setTransactionCategories,
  setTransactionsSummary,
  setError,
} from '.';
import { setError as setSessionError } from 'store/slices/session';
import { setIsLoading } from 'store/slices/global';
import { transformTransactionsSummary } from 'utils/helperFunctions';

export const getTransactions = token => {
  return async (dispatch, _, api) => {
    dispatch(setIsLoading(true));
    try {
      const transactions = await api.getTransactions(token);
      dispatch(setTransactions([...transactions].reverse()));
    } catch (error) {
      if (error.response.status === 400) dispatch(setError('Validation error'));
      else if (error.response.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const createTransaction = (createTransactionDto, token) => {
  return async (dispatch, _, api) => {
    dispatch(setIsLoading(true));
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
      toast.error('Something went wrong...', { theme: 'colored' });
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const getTransactionCategories = token => {
  return async (dispatch, _, api) => {
    dispatch(setIsLoading(true));
    try {
      const categories = await api.getTransactionCategories(token);
      dispatch(setTransactionCategories(categories));
    } catch (error) {
      dispatch(setSessionError('Bearer authorization failed'));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const getTransactionsSummary = (token, period) => {
  return async (dispatch, _, api) => {
    setIsLoading(true);
    try {
      const transactionsSummary = await api.getTransactionsSummary(token, period);
      const transformedTransactionsSummary = transformTransactionsSummary(transactionsSummary);
      dispatch(setTransactionsSummary(transformedTransactionsSummary));
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) dispatch(setError('Validation error'));
      else if (error.response.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
