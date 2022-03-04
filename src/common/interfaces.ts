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
  amount: number | string;
  balanceAfter: number | string;
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
}

export interface CategorySummary {
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

export interface ProgressData {
  progress: number;
  tooltip: string;
}

export interface ButtonsStyles {
  buttonBackClasses: string[];
  buttonNextClasses: string[];
  disabledBack: boolean;
  disabledNext: boolean;
}

export interface SelectOption {
  title: string | number;
  value: number;
}

export interface CategoryColors {
  income: string;
  education: string;
  'household products': string;
  products: string;
  entertainment: string;
  car: string;
  'other expenses': string;
  'child care': string;
  'self care': string;
  leisure: string;
  'main expenses': string;
}
