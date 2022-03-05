import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import {
  setTransactions,
  addTransaction,
  setTransactionCategories,
  setTransactionsSummary,
  setError,
} from '.';
import { Thunk, Dispatch, GetState, Api } from 'store/types';
import { setError as setSessionError } from 'store/slices/session';
import { setIsLoading } from 'store/slices/global';
import { transformTransactionsSummary } from 'utils/helperFunctions';
import { CreateTransactionDto, Period } from 'common/interfaces';

export const getTransactions = (token: string): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    dispatch(setIsLoading(true));
    try {
      const transactions = await api.getTransactions(token);
      dispatch(setTransactions([...transactions].reverse()));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) dispatch(setError('Validation error'));
      else if (axiosError.response?.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const createTransaction = (
  createTransactionDto: CreateTransactionDto,
  token: string,
): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    dispatch(setIsLoading(true));
    try {
      const transaction = await api.createTransaction(createTransactionDto, token);
      const { amount } = createTransactionDto;
      dispatch(addTransaction({ transaction, balanceDifference: amount }));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) dispatch(setError('Validation error'));
      else if (axiosError.response?.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      } else if (axiosError.response?.status === 404) {
        dispatch(setError('Transaction category not found'));
      } else if (axiosError.response?.status === 409) {
        dispatch(setError('Transaction category type does not match transaction type'));
      }
      toast.error('Something went wrong...', { theme: 'colored' });
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const getTransactionCategories = (token: string): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    dispatch(setIsLoading(true));
    try {
      const categories = await api.getTransactionCategories(token);
      dispatch(setTransactionCategories(categories));
    } catch (error: unknown) {
      dispatch(setSessionError('Bearer authorization failed'));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const getTransactionsSummary = (token: string, period: Period): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    setIsLoading(true);
    try {
      const transactionsSummary = await api.getTransactionsSummary(token, period);
      const transformedTransactionsSummary = transformTransactionsSummary(transactionsSummary);
      dispatch(setTransactionsSummary(transformedTransactionsSummary));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) dispatch(setError('Validation error'));
      else if (axiosError.response?.status === 401) {
        dispatch(setSessionError('Bearer authorization failed'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
