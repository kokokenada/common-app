import { IActionError } from 'redux-package';
import {webPackSticky} from '../connect/connect-service-interface';

export interface IException {
  code: string;
  message: string;
}

export interface IExceptionState {
  lastException: IActionError;
  count: number;
}

export const INITIAL_STATE_EXCEPTION_STATE: IExceptionState = {
  lastException: {
    error: 0
  },
  count: 0
};

export interface IExceptionLogger {
  callback(exception: IException);
}

export let webPackSticky7 = '';