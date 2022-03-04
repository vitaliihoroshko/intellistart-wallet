import { Middleware, ThunkDispatch, Action } from '@reduxjs/toolkit';

import { User, Transaction, TransactionCategory, TransactionsSummary } from 'common/interfaces';

export interface SessionState {
  token: string | null;
  user: User | null;
  isAuth: boolean;
  error: string | null;
}

export interface GlobalState {
  isLoading: boolean;
  isModalLogoutOpen: boolean;
  isModalAddTransactionOpen: boolean;
  isCurrencyDisplayed: boolean;
  pathname: string;
}

export interface FinanceState {
  totalBalance: number;
  transactions: Transaction[];
  transactionCategories: TransactionCategory[];
  transactionsSummary: TransactionsSummary | null;
  error: string | null;
}

export interface State {
  session: SessionState;
  global: GlobalState;
  finance: FinanceState;
}

export interface ThunkOptions<E = any> {
  extraArgument: E;
}

type IsImmutableFunc = (value: any) => boolean;

interface ImmutableStateInvariantMiddlewareOptions {
  isImmutable?: IsImmutableFunc;
  ignoredPaths?: string[];
  warnAfter?: number;
  ignore?: string[];
}

interface SerializableStateInvariantMiddlewareOptions {
  isSerializable?: (value: any) => boolean;
  getEntries?: (value: any) => [string, any][];
  ignoredActions?: string[];
  ignoredActionPaths?: string[];
  ignoredPaths?: string[];
  warnAfter?: number;
  ignoreState?: boolean;
  ignoreActions?: boolean;
}

interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions;
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
}

export type GetDefaultMiddleware = <S = any>(
  options: GetDefaultMiddlewareOptions,
) => Middleware<{}, S>[];

export type Thunk = (
  dispatch: ThunkDispatch<State, unknown, Action>,
  _: () => State,
  api: ThunkOptions['extraArgument'],
) => Promise<void>;
