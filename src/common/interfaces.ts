import { TransactionType } from './types';

export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
}

export interface UserData {
  user: User;
}

export interface Token {
  token: string;
}

export interface CreateTransactionDto {
  transactionDate: string;
  type: TransactionType;
  categoryId: string;
  comment: string;
  amount: number;
}

export interface Transaction {
  id: string;
  transactionDate: string;
  type: TransactionType;
  categoryId: string;
  userId: string;
  comment: string;
  amount: number;
  balanceAfter: number;
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
}

interface CategorySummary {
  name: string;
  type: TransactionType;
  total: number;
}

export interface TransactionsSummary {
  categoriesSummary: CategorySummary[];
  incomeSummary: number;
  expenseSummary: number;
  periodTotal: number;
  year: number | null;
  month: number | null;
}

export interface Period {
  year: number | string;
  month: number | string;
}

export interface Currency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}
