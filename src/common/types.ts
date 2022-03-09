import { Dispatch, SetStateAction } from 'react';

import { UserData, Token, Transaction, ProgressData } from './interfaces';

export type AuthResponse = UserData & Token;

export type TransactionType = 'INCOME' | 'EXPENSE' | '+' | '-';

export type TransformedTransaction = Transaction & { categoryName: string };

export type EvaluationFunction = (
  value: string,
  dataCallback: Dispatch<SetStateAction<ProgressData>>,
  visibilityCallback: Dispatch<SetStateAction<boolean>>,
) => void;
