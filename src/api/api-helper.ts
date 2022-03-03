import axios, { AxiosResponse } from 'axios';

import { makeQueryParams } from 'utils/helperFunctions';
import { AuthResponse } from 'common/types';
import {
  SignUpDto,
  SignInDto,
  User,
  Transaction,
  CreateTransactionDto,
  Period,
  TransactionCategory,
  TransactionsSummary,
} from 'common/interfaces';

const API_URL = 'https://wallet.goit.ua/api';

export const signUserUp = async (signUpDto: SignUpDto): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    `${API_URL}/auth/sign-up`,
    signUpDto,
  );
  const userData = response.data;
  return userData;
};

export const signUserIn = async (signInDto: SignInDto): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    `${API_URL}/auth/sign-in`,
    signInDto,
  );
  const userData = response.data;
  return userData;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response: AxiosResponse<User> = await axios.get(`${API_URL}/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const currentUser = response.data;
  return currentUser;
};

export const signUserOut = async (token: string): Promise<void> => {
  await axios.delete(`${API_URL}/auth/sign-out`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTransactions = async (token: string): Promise<Transaction[]> => {
  const response: AxiosResponse<Transaction[]> = await axios.get(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const transactions = response.data;
  return transactions;
};

export const getTransactionCategories = async (token: string): Promise<TransactionCategory[]> => {
  const response: AxiosResponse<TransactionCategory[]> = await axios.get(
    `${API_URL}/transaction-categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const transactionCategories = response.data;
  return transactionCategories;
};

export const createTransaction = async (
  createTransactionDto: CreateTransactionDto,
  token: string,
): Promise<Transaction> => {
  const response: AxiosResponse<Transaction> = await axios.post(
    `${API_URL}/transactions`,
    createTransactionDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const createdTransaction = response.data;
  return createdTransaction;
};

export const getTransactionsSummary = async (
  token: string,
  period: Period,
): Promise<TransactionsSummary> => {
  const queryParams = makeQueryParams(period);
  const response: AxiosResponse<TransactionsSummary> = await axios.get(
    `${API_URL}/transactions-summary${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const transactionsSummary = response.data;
  return transactionsSummary;
};
