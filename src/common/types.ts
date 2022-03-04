import { UserData, Token } from './interfaces';

export type AuthResponse = UserData & Token;

export type TransactionType = 'INCOME' | 'EXPENSE' | '+' | '-';
