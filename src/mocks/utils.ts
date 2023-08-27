
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
