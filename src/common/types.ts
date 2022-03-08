import { Dispatch, SetStateAction } from 'react';

import { UserData, Token, ProgressData } from './interfaces';

export type AuthResponse = UserData & Token;

export type TransactionType = 'INCOME' | 'EXPENSE' | '+' | '-';

export type EvaluationFunction = (
  value: string,
  dataCallback: Dispatch<SetStateAction<ProgressData>>,
  visibilityCallback: Dispatch<SetStateAction<boolean>>,
) => void;
