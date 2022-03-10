import { Middleware, ThunkDispatch, Action as BasicAction, PayloadAction } from '@reduxjs/toolkit';

import {
  User,
  Transaction,
  TransactionCategory,
  TransactionsSummary,
  ApiMiddleware,
} from 'common/interfaces';

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

export interface Action<T> {
  type: string;
  payload: T;
}

export interface ThunkOptions<E = unknown> {
  extraArgument: E;
}

type IsImmutableFunc = (value: unknown) => boolean;

interface ImmutableStateInvariantMiddlewareOptions {
  isImmutable?: IsImmutableFunc;
  ignoredPaths?: string[];
  warnAfter?: number;
  ignore?: string[];
}

interface SerializableStateInvariantMiddlewareOptions {
  isSerializable?: (value: unknown) => boolean;
  getEntries?: (value: unknown) => [string, unknown][];
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

export type GetDefaultMiddleware = <S = unknown>(
  options: GetDefaultMiddlewareOptions,
) => Middleware<Record<string, unknown>, S>[];

export type Dispatch = ThunkDispatch<State, unknown, BasicAction>;

export type GetState = () => State;

export type Api = ThunkOptions<ApiMiddleware>['extraArgument'];

export type Thunk = (dispatch: Dispatch, _: GetState, api: Api) => Promise<void>;

export type FulfilledAction<T> = PayloadAction<T | undefined>;

export type RejectedAction = PayloadAction<unknown>;
